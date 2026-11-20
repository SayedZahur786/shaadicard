import Link from 'next/link';
import { user } from '../../lib/auth';
import { configured } from '../../lib/db';
import { Editor } from '../../components/editor';
export const metadata={title:'Create an invitation',robots:{index:false,follow:false}};
export default async function Create(){const account=configured()?await user():null;return <div className="page"><p className="eyebrow">A celebration, beautifully together</p><h1>Make it yours.</h1><p className="muted">One invitation for every moment. Add the details your family needs.</p>{account?<Editor/>:<section className="panel"><h2>Your studio starts here.</h2><p>Sign in to save your invitation and privately manage ceremony replies.</p><Link className="btn" href="/login">Create an account or sign in</Link><Link className="link inline-link ml-5" href="/i/aanya-and-aarav">Explore the demo</Link></section>}</div>;}
