import nextEnv from '@next/env';
import { neon } from '@neondatabase/serverless';
nextEnv.loadEnvConfig(process.cwd());
if(!process.env.DATABASE_URL)throw new Error('Database configuration required');
const sql=neon(process.env.DATABASE_URL_UNPOOLED||process.env.DATABASE_URL);
await sql.transaction([sql`DELETE FROM sessions WHERE expires_at < now()`,sql`DELETE FROM rate_limits WHERE expires_at < now()`,sql`DELETE FROM support_requests WHERE created_at < now()-interval '90 days'`]);
console.log('Expired sessions and rate limits removed');
