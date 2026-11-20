'use client';
export default function GlobalError({reset}:{reset:()=>void}){return <html lang="en"><body><h1>We could not load ShaadiCard.</h1><p>Please try again.</p><button onClick={reset}>Retry</button></body></html>;}
