import { randomUUID,randomBytes } from 'node:crypto';
import { inviteSchema } from '../../../lib/model';
import { query } from '../../../lib/db';
import { user } from '../../../lib/auth';
import { originCheck,body,limit,ApiError,fail } from '../../../lib/api';
export async function POST(req:Request){try{originCheck(req);const account=await user();if(!account)throw new ApiError(401,'Sign in to create your invitation.');await limit(req,'create:'+account.id,30);const input=inviteSchema.safeParse(await body(req));if(!input.success)throw new ApiError(400,'Complete the names, hosts, dates and venues in all three languages.');const id=randomUUID(),slug=randomBytes(12).toString('hex');await query('INSERT INTO invites(id,slug,owner_id,data) VALUES($1,$2,$3,$4)',[id,slug,account.id,JSON.stringify(input.data)]);return Response.json({id,slug},{status:201});}catch(error){return fail(error);}}
