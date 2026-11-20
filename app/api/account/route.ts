import { cookies } from 'next/headers';
import { query } from '../../../lib/db';
import { user,cookieOptions } from '../../../lib/auth';
import { originCheck,ApiError,fail } from '../../../lib/api';
export async function DELETE(req:Request){try{originCheck(req);const account=await user();if(!account)throw new ApiError(401,'Sign in first.');await query('DELETE FROM accounts WHERE id=$1',[account.id]);(await cookies()).set('sc_session','',{...cookieOptions,maxAge:0});return Response.json({ok:true});}catch(error){return fail(error);}}
