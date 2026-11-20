import { z } from 'zod';
import { cookies } from 'next/headers';
import { randomUUID } from 'node:crypto';
import { query } from '../../../lib/db';
import { hash,passwordHash,matches,startSession,cookieOptions } from '../../../lib/auth';
import { originCheck,body,limit,ApiError,fail } from '../../../lib/api';
const schema=z.object({mode:z.enum(['login','register']),email:z.email().max(200).transform(s=>s.toLowerCase()),password:z.string().min(12).max(128)}).strict();
export async function POST(req:Request){try{originCheck(req);await limit(req,'auth',20,900);const input=schema.safeParse(await body(req));if(!input.success)throw new ApiError(400,'Use a valid email and a password of 12–128 characters.');const {email,password,mode}=input.data;const [account]=await query<{id:string;password:string}>('SELECT id,password FROM accounts WHERE email=$1',[email]);if(mode==='register'){if(account)throw new ApiError(400,'Unable to create this account. Try signing in.');const id=randomUUID();await query('INSERT INTO accounts(id,email,password) VALUES($1,$2,$3)',[id,email,await passwordHash(password)]);await startSession(id);}else {if(!account){await passwordHash(password);throw new ApiError(401,'Email or password is incorrect.');}if(!await matches(password,account.password))throw new ApiError(401,'Email or password is incorrect.');await startSession(account.id);}return Response.json({ok:true});}catch(error){return fail(error);}}
export async function DELETE(req:Request){try{originCheck(req);const jar=await cookies();const value=jar.get('sc_session')?.value;if(value)await query('DELETE FROM sessions WHERE hash=$1',[hash(value)]);jar.set('sc_session','',{...cookieOptions,maxAge:0});return Response.json({ok:true});}catch(error){return fail(error);}}
