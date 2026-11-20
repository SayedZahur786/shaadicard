import 'server-only';
import { neon } from '@neondatabase/serverless';
import type { PGlite } from '@electric-sql/pglite';
const g=globalThis as unknown as {localDb?:PGlite};
export function configured(){return Boolean(process.env.DATABASE_URL || (process.env.LOCAL_DATABASE==='1' && !process.env.VERCEL));}
export async function query<T>(sql:string,params:unknown[]=[]):Promise<T[]> {
 if(process.env.DATABASE_URL) {const client=neon(process.env.DATABASE_URL);return await client.query(sql,params) as T[];}
 if(process.env.LOCAL_DATABASE==='1' && !process.env.VERCEL){const {PGlite}=await import('@electric-sql/pglite');g.localDb??=new PGlite('.local/postgres');return (await g.localDb.query<T>(sql,params)).rows;}
 throw new Error('Database unavailable');
}
