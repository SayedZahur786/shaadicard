import { readFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';
import { PGlite } from '@electric-sql/pglite';
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());
const sql=await readFile('scripts/schema.sql','utf8');
if(process.env.DATABASE_URL){const db=neon(process.env.DATABASE_URL_UNPOOLED||process.env.DATABASE_URL);await db.transaction(sql.split(';').filter(s=>s.trim()).map(s=>db.query(s)));console.log('Neon migration complete');}
else if(process.env.LOCAL_DATABASE==='1' && !process.env.VERCEL){const db=new PGlite('.local/postgres');await db.exec(sql);await db.close();console.log('Local Postgres migration complete');}
else throw new Error('Configure DATABASE_URL before migrating');
