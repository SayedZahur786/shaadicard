import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Analytics } from '../components/analytics';
import { ErrorBoundary } from '../components/error-boundary';
export const metadata:Metadata={metadataBase:new URL(process.env.APP_URL||'http://localhost:3024'),title:{default:'ShaadiCard · Many moments. One invitation.',template:'%s · ShaadiCard'},description:'A wedding invitation that speaks your family’s language. Hindi, Urdu and Gujarati, every ceremony, and family RSVPs in one WhatsApp link.',openGraph:{title:'ShaadiCard · Many moments. One invitation.',description:'Your celebrations, your language, one beautiful link.',images:['/og.png']},robots:{index:true,follow:true}};
export default async function Layout({children}:{children:React.ReactNode}){const guest=(await headers()).get('x-path')?.startsWith('/i/');return <html lang="en"><body>{!guest&&<Header name="ShaadiCard" links={[{href:'/i/aanya-and-aarav',label:'View demo'},{href:'/dashboard',label:'My invites'},{href:'/create',label:'Create invite'}]}/>}
<ErrorBoundary><main id="main">{children}</main></ErrorBoundary>{!guest&&<Footer name="ShaadiCard" year={2026}/>}<Analytics consent={false}/></body></html>;}
