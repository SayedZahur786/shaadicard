import 'server-only';
import { randomBytes,createHash,scrypt,timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { cookies } from 'next/headers';
import { query } from './db';
const derive=promisify(scrypt);
export const hash=(s:string)=>createHash('sha256').update(s).digest('hex');
export const token=()=>randomBytes(32).toString('hex');
export async function passwordHash(password:string){const salt=randomBytes(16).toString('hex');const key=await derive(password,salt,64) as Buffer;return salt+':'+key.toString('hex');}
export async function matches(password:string,stored:string){const [salt,key]=stored.split(':');const result=await derive(password,salt,64) as Buffer;const expected=Buffer.from(key,'hex');return expected.length===result.length && timingSafeEqual(result,expected);}
export const cookieOptions={httpOnly:true,secure:process.env.NODE_ENV==='production' && process.env.LOCAL_DATABASE!=='1',sameSite:'lax' as const,path:'/'};
export async function user(){const value=(await cookies()).get('sc_session')?.value;if(!value)return null;const [row]=await query<{id:string;email:string}>('SELECT a.id,a.email FROM accounts a JOIN sessions s ON s.account_id=a.id WHERE s.hash=$1 AND s.expires_at>now()',[hash(value)]);return row??null;}
export async function startSession(id:string){const value=token();await query('INSERT INTO sessions(hash,account_id,expires_at) VALUES($1,$2,now()+interval \'14 days\')',[hash(value),id]);(await cookies()).set('sc_session',value,{...cookieOptions,maxAge:14*86400});}
