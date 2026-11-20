import { AuthForm } from '../../components/auth-form';
import Link from 'next/link';
import { configured } from '../../lib/db';
export const metadata={title:'Your invitation studio',robots:{index:false,follow:false}};
export default function Login(){return <div className="page narrow"><p className="eyebrow">Your invitation studio</p><h1>A warm welcome.</h1><p className="muted">Keep your invitations and family replies together, privately.</p>{configured()?<div className="panel"><AuthForm/></div>:<p className="notice">Account creation is temporarily unavailable. <Link className="link" href="/i/aanya-and-aarav">Explore the complete demo</Link> while we prepare the studio.</p>}<p className="small-note">By creating an account, you agree to our <Link href="/terms" className="link">terms</Link> and <Link href="/privacy" className="link">privacy policy</Link>.</p></div>;}
