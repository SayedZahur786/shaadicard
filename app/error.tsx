'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <div className="page narrow" role="alert"><h1>A small pause.</h1><p>We could not load this page. Your action may not have completed. Please try again.</p><button className="btn" onClick={reset}>Try again</button></div>;}
