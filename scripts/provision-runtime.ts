import nextEnv from '@next/env';
import { neon } from '@neondatabase/serverless';
import { randomBytes } from 'node:crypto';
import { readFile,writeFile } from 'node:fs/promises';
nextEnv.loadEnvConfig(process.cwd());
const admin=process.env.DATABASE_URL_UNPOOLED;
if(!admin)throw new Error('Direct administrator connection required');
const sql=neon(admin);
const role='shaadicard_runtime';
const existing=await sql`SELECT 1 FROM pg_roles WHERE rolname=${role}`;
if(existing.length){console.log('Runtime role already exists; credentials unchanged.');process.exit(0);}
const password=randomBytes(32).toString('hex');
// Both role and hex-only generated password are controlled by this script, never by users.
await sql.query(`CREATE ROLE ${role} LOGIN PASSWORD '${password}'`);
await sql.query(`GRANT USAGE ON SCHEMA public TO ${role}`);
await sql.query(`GRANT SELECT,INSERT,UPDATE,DELETE ON accounts,sessions,replies,rate_limits TO ${role}`);
await sql.query(`GRANT SELECT,DELETE ON invites TO ${role}`);
await sql.query(`GRANT INSERT(id,slug,owner_id,data) ON invites TO ${role}`);
await sql.query(`GRANT INSERT ON support_requests TO ${role}`);
const runtime=new URL(process.env.DATABASE_URL!);runtime.username=role;runtime.password=password;
const path='.env.local';const text=await readFile(path,'utf8');
await writeFile(path,text.replace(/^DATABASE_URL=.*$/m,'DATABASE_URL='+JSON.stringify(runtime.href)),{mode:0o600});
console.log('Least-privilege runtime role created; local connection replaced without printing credentials.');
