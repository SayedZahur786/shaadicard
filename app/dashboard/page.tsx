import Link from 'next/link';
import { redirect } from 'next/navigation';
import { user } from '../../lib/auth';
import { query,configured } from '../../lib/db';
import type { Invite } from '../../lib/model';
import { Logout,DeleteAccount } from '../../components/dashboard-actions';
export const metadata={title:'My invitations',robots:{index:false,follow:false}};
export default async function Dashboard(){if(!configured())redirect('/login');const account=await user();if(!account)redirect('/login');const invites=await query<Invite>('SELECT * FROM invites WHERE owner_id=$1 ORDER BY created_at DESC',[account.id]);return <div className="page"><div className="section-heading"><div><p className="eyebrow">Your private studio</p><h1>Lovely things ahead.</h1><p className="muted">Your invitations, all in one place.</p></div><Logout/></div><div className="actions"><Link className="btn" href="/create">Create an invitation</Link><span className="badge">{invites.length} invitations created</span></div>{invites.length?invites.map(invite=><article className="panel invite-list" key={invite.id}><div><h3>{invite.data.couple.hi}</h3><p className="muted">{invite.data.ceremonies.length} ceremonies · {invite.data.brand||'Family invitation'}</p></div><Link className="btn secondary" href={'/dashboard/'+invite.id}>Manage & view replies</Link></article>):<div className="panel"><h2>Your first celebration awaits.</h2><p>Create an invitation to get your shareable link. Family replies will appear here.</p></div>}<DeleteAccount/></div>;}
