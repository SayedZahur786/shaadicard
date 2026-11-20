import test from 'node:test';
import assert from 'node:assert/strict';
import { demo,inviteSchema,rsvpSchema,validAnswers,totals,languages,copy,langOf,dateLabel } from '../lib/model';
test('all four ceremonies and three language inputs validate',()=>{assert.equal(inviteSchema.safeParse(demo.data).success,true);});
test('rejects duplicate ceremonies and missing translation',()=>{assert.equal(inviteSchema.safeParse({...demo.data,ceremonies:[demo.data.ceremonies[0],demo.data.ceremonies[0]]}).success,false);assert.equal(inviteSchema.safeParse({...demo.data,couple:{...demo.data.couple,ur:''}}).success,false);});
test('rejects oversized or negative family counts',()=>{for(const size of [-1,21,1.2])assert.equal(rsvpSchema.safeParse({name:'Shah family',answers:[{kind:'wedding',size}]}).success,false);});
test('each enabled ceremony requires exactly one answer',()=>{const answers=demo.data.ceremonies.map(c=>({kind:c.kind,size:3}));assert.equal(validAnswers(demo.data,answers),true);assert.equal(validAnswers(demo.data,answers.slice(1)),false);assert.equal(validAnswers(demo.data,[answers[0],answers[0],answers[2],answers[3]]),false);});
test('headcounts are independent per ceremony; declines contribute zero',()=>{assert.deepEqual(totals(demo.data,[{answers:[{kind:'wedding',size:4},{kind:'reception',size:0}]},{answers:[{kind:'wedding',size:2},{kind:'mehndi',size:1}]}]).map(x=>x.count),[1,0,6,0]);});
test('all language dictionaries have matching renderer keys and local dates',()=>{for(const lang of languages){assert.deepEqual(Object.keys(copy[lang]),Object.keys(copy.hi));assert.deepEqual(Object.keys(copy[lang].ceremony),Object.keys(copy.hi.ceremony));assert.ok(dateLabel('2027-02-13T10:00',lang).length>10);}assert.equal(langOf('invalid'),'hi');assert.equal(langOf('ur'),'ur');});

test('rejects impossible calendar dates',()=>{assert.equal(inviteSchema.safeParse({...demo.data,ceremonies:[{...demo.data.ceremonies[0],date:'2027-02-30T10:00'}]}).success,false);});
