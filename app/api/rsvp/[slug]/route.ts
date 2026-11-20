import { cookies } from 'next/headers';
import { randomUUID } from 'node:crypto';
import { query } from '../../../../lib/db';
import { hash,token,cookieOptions } from '../../../../lib/auth';
import { rsvpSchema,validAnswers,type Invite } from '../../../../lib/model';
import { originCheck,body,limit,ApiError,fail } from '../../../../lib/api';
export async function POST(req:Request,{params}:{params:Promise<{slug:string}>}){try{originCheck(req);await limit(req,'rsvp',80);const {slug}=await params;const input=rsvpSchema.safeParse(await body(req));if(!input.success)throw new ApiError(400,'Check your family name and ceremony choices.');const [invite]=await query<Invite>('SELECT * FROM invites WHERE slug=$1',[slug]);if(!invite)throw new ApiError(404,'Invitation not found.');if(!validAnswers(invite.data,input.data.answers))throw new ApiError(400,'Reply once to each ceremony.');const jar=await cookies();const visitor=jar.get('sc_guest')?.value||token();await query('INSERT INTO replies(id,invite_id,visitor_hash,name,answers) VALUES($1,$2,$3,$4,$5) ON CONFLICT(invite_id,visitor_hash) DO UPDATE SET name=EXCLUDED.name,answers=EXCLUDED.answers,updated_at=now()',[randomUUID(),invite.id,hash(visitor),input.data.name,JSON.stringify(input.data.answers)]);jar.set('sc_guest',visitor,{...cookieOptions,maxAge:180*86400});return Response.json({ok:true});}catch(error){return fail(error);}}
