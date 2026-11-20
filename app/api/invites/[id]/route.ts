import { query } from '../../../../lib/db';
import { user } from '../../../../lib/auth';
import { originCheck,ApiError,fail } from '../../../../lib/api';
export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){try{originCheck(req);const account=await user();if(!account)throw new ApiError(401,'Sign in first.');const {id}=await params;const rows=await query('DELETE FROM invites WHERE id=$1 AND owner_id=$2 RETURNING id',[id,account.id]);if(!rows.length)throw new ApiError(404,'Invitation not found.');return Response.json({ok:true});}catch(error){return fail(error);}}
