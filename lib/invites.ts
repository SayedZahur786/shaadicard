import { query } from './db';
import { demo,type Invite } from './model';
export async function getInvite(slug:string){if(slug===demo.slug)return demo;if(!/^[a-f0-9]{24}$/.test(slug))return null;const [invite]=await query<Invite>('SELECT * FROM invites WHERE slug=$1',[slug]);return invite??null;}
