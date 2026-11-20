import { ImageResponse } from 'next/og';
import { getInvite } from '../../../lib/invites';
export const alt='Wedding invitation';
export const size={width:1200,height:630};
export const contentType='image/png';
export default async function Image({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const invite=await getInvite(slug);return new ImageResponse(<div style={{width:'100%',height:'100%',background:'#421d37',color:'#f8e7c4',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',border:'24px solid #b77822',fontFamily:'serif'}}><div style={{fontSize:24,letterSpacing:7}}>YOU ARE INVITED</div><div style={{fontSize:70,marginTop:40}}>A celebration of love</div><div style={{fontSize:34,marginTop:30}}>{`${invite?.data.ceremonies.length||4} ceremonies · One invitation`}</div><div style={{fontSize:25,marginTop:55}}>{`${invite?.data.brand||'ShaadiCard'} · RSVP inside`}</div></div>,size);}
