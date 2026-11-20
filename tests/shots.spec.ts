import { test,expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
test('capture main routes on desktop and mobile',async({page,baseURL})=>{
 await mkdir('docs/screenshots',{recursive:true});const stamp=Date.now();const auth=await page.request.post('/api/auth',{headers:{origin:baseURL!},data:{mode:'register',email:`shots-${stamp}@shaadicard.invalid`,password:`Studio-Celebration-${stamp}!`}});expect(auth.ok()).toBeTruthy();
 const {demo}=await import('../lib/model');const created=await page.request.post('/api/invites',{headers:{origin:baseURL!},data:{...demo.data,brand:'Gulab Invitation Studio'}});expect(created.ok()).toBeTruthy();const {id,slug}=await created.json();await page.request.post('/api/rsvp/'+slug,{headers:{origin:baseURL!},data:{name:'Joshi family',answers:demo.data.ceremonies.map(c=>({kind:c.kind,size:3}))}});
 for(const viewport of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}]){await page.setViewportSize(viewport);for(const [name,path] of [['home','/'],['editor','/create'],['dashboard','/dashboard'],['replies','/dashboard/'+id],['invite','/i/'+slug],['urdu','/i/'+slug+'?lang=ur'],['gujarati','/i/'+slug+'?lang=gu'],['contact','/contact'],['privacy','/privacy'],['terms','/terms'],['login','/login'],['404','/not-here']]){await page.goto(path);await page.getByRole('heading',{level:1}).waitFor();await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`docs/screenshots/${name}-${viewport.name}.png`,fullPage:true});}}
 await page.request.delete('/api/account',{headers:{origin:baseURL!}});
});
