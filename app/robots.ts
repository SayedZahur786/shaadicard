import type { MetadataRoute } from 'next';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:['/','/privacy','/terms'],disallow:['/api/','/dashboard','/create','/login','/i/']},sitemap:(process.env.APP_URL||'http://localhost:3024')+'/sitemap.xml'};}
