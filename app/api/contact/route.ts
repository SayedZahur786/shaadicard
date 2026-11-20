import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { query } from '../../../lib/db';
import { body,originCheck,limit,ApiError,fail } from '../../../lib/api';
const schema=z.object({email:z.email().max(200),message:z.string().trim().min(10).max(2000)}).strict();
export async function POST(req:Request){try{originCheck(req);await limit(req,'support',5);const input=schema.safeParse(await body(req));if(!input.success)throw new ApiError(400,'Enter a valid email and a message of 10–2,000 characters.');await query('INSERT INTO support_requests(id,email,message) VALUES($1,$2,$3)',[randomUUID(),input.data.email,input.data.message]);return Response.json({ok:true});}catch(error){return fail(error);}}
