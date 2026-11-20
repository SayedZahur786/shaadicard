import type { MetadataRoute } from 'next';
export default function sitemap():MetadataRoute.Sitemap {return ['','/privacy','/terms'].map(path=>({url:(process.env.APP_URL||'http://localhost:3024')+path,changeFrequency:'monthly' as const}));}
