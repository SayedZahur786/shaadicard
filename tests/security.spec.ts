import nextEnv from '@next/env';
import { neon } from '@neondatabase/serverless';
import { createHash } from 'node:crypto';
import { test,expect } from '@playwright/test';
test.beforeAll(async()=>{if(!process.env.TEST_BASE_URL){nextEnv.loadEnvConfig(process.cwd());if(process.env.DATABASE_URL_UNPOOLED){const sql=neon(process.env.DATABASE_URL_UNPOOLED);await sql`DELETE FROM rate_limits WHERE key=${createHash('sha256').update('support:local').digest('hex')}`;}}});
test('public mutation validation and shared-store rate limiting',async({request,baseURL})=>{
 const denied=await request.post('/api/invites',{headers:{origin:baseURL!},data:{}});expect(denied.status()).toBe(401);
 const noOrigin=await request.post('/api/auth',{data:{}});expect(noOrigin.status()).toBe(403);
 const oversized=await request.post('/api/contact',{headers:{origin:baseURL!},data:{message:'x'.repeat(25000)}});expect(oversized.status()).toBe(413);
 for(let i=0;i<4;i++){const r=await request.post('/api/contact',{headers:{origin:baseURL!,'x-forwarded-for':`192.0.2.${i}`},data:{}});expect(r.status()).toBe(400);}
 const limited=await request.post('/api/contact',{headers:{origin:baseURL!,'x-forwarded-for':'192.0.2.99'},data:{}});expect(limited.status()).toBe(429);
});
test('nonce rotates and invite metadata is server rendered',async({request})=>{const a=await request.get('/i/aanya-and-aarav');const b=await request.get('/i/aanya-and-aarav');expect(a.headers()['content-security-policy']).not.toBe(b.headers()['content-security-policy']);expect(a.headers()['content-security-policy']).not.toContain('unsafe-eval');const text=await a.text();expect(text).toContain('property="og:title"');expect(text).toContain('आन्या और आरव');expect((await request.get('/i/aanya-and-aarav/opengraph-image')).headers()['content-type']).toContain('image/png');});
