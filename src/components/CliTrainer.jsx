import React,{useState} from 'react';
import {ArrowLeft,Terminal,Lightbulb,CheckCircle2,AlertTriangle,ChevronRight,BookOpen} from 'lucide-react';
import {cliChallenges} from '../data/cliChallenges.js';

const normalize=(s)=>s.trim().replace(/\\\s*\n\s*/g,' ').replace(/\s+/g,' ');
const splitArgs=(s)=>normalize(s).match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g)||[];
function validCommand(given,expected){
  const a=splitArgs(given),b=splitArgs(expected);
  if(!a.length)return false;
  const flags=(tokens)=>tokens.filter(t=>t.startsWith('--')).map(t=>t.replace(/^--([^=]+)=(.+)$/,'--$1=$2'));
  const positional=(tokens)=>tokens.filter(t=>!t.startsWith('--'));
  // Flags may be reordered, but resource / verb order must be preserved.
  const ap=positional(a), bp=positional(b);
  return ap.length===bp.length&&ap.every((v,i)=>v===bp[i])&&flags(a).length===flags(b).length&&flags(b).every(f=>flags(a).includes(f));
}
export default function CliTrainer({progress={},onComplete}){
  const [id,setId]=useState(cliChallenges[0].id);
  const [filter,setFilter]=useState('all');
  const [typed,setTyped]=useState('');
  const [checked,setChecked]=useState(false);
  const [hint,setHint]=useState(false);
  const [solution,setSolution]=useState(false);
  const [stage,setStage]=useState('guided');
  const task=cliChallenges.find(c=>c.id===id);
  const success=checked&&validCommand(typed,task.command);
  const visible=cliChallenges.filter(c=>filter==='all'||c.topic===filter);
  const topics=[...new Set(cliChallenges.map(c=>c.topic))];
  const completed=progress.cli||[];
  function choose(next){setId(next);setTyped('');setChecked(false);setHint(false);setSolution(false);}
  function check(){setChecked(true);if(validCommand(typed,task.command))onComplete(task.id);}
  function next(){const i=cliChallenges.findIndex(c=>c.id===id);choose(cliChallenges[(i+1)%cliChallenges.length].id);}
  return <div className="cli-trainer">
    <div className="page-head"><span className="eyebrow">COMMAND LINE · INDEPENDENCE TRACK</span><h1>CLI Training Mode</h1><p>Build and explain commands instead of copying them blindly. All output here is simulated; no commands run in your Google Cloud account.</p></div>
    <div className="cli-summary"><div><strong>{completed.length}/{cliChallenges.length}</strong><span>Challenges completed</span></div><div><strong>4 stages</strong><span>Follow · Modify · Recall · Perform</span></div><div><strong>Safe practice</strong><span>No cloud resources created</span></div></div>
    <div className="cli-mode" role="group" aria-label="Training style">{[['guided','Guided: explanations + hints'],['independent','Independent: recall first']].map(([v,l])=><button key={v} className={stage===v?'active':''} onClick={()=>{setStage(v);setSolution(false);setHint(false)}}>{l}</button>)}</div>
    <div className="cli-layout"><aside className="cli-sidebar"><label htmlFor="cli-topic">Topic</label><select id="cli-topic" value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All topics</option>{topics.map(x=><option key={x}>{x}</option>)}</select><div className="cli-task-list">{visible.map((c,i)=><button key={c.id} onClick={()=>choose(c.id)} className={id===c.id?'active':''}><span>{completed.includes(c.id)?<CheckCircle2 size={16} color="#188038"/>:<span className="cli-task-number">{cliChallenges.indexOf(c)+1}</span>}</span><span><strong>{c.topic}</strong><small>{c.level} · {c.task.slice(0,47)}…</small></span></button>)}</div></aside>
      <section className="cli-workspace"><div className="cli-task-top"><span className="tag">{task.topic}</span><span className="muted tiny">{task.level} · Challenge {cliChallenges.indexOf(task)+1} of {cliChallenges.length}</span></div><h2>{task.task}</h2><p className="cli-why"><strong>Why this matters:</strong> {task.why}</p>
      <div className="cli-terminal"><div className="cli-term-bar"><span className="term-lights"><i/><i/><i/></span><span>simulated terminal · commands are never executed</span></div><label htmlFor="cli-command">Enter your command</label><div className="cli-inputline"><span aria-hidden="true">$</span><input id="cli-command" spellCheck={false} autoCapitalize="off" autoComplete="off" value={typed} onChange={e=>{setTyped(e.target.value);setChecked(false)}} onKeyDown={e=>{if(e.key==='Enter')check()}} placeholder="Type a command here..."/></div><div className="cli-actions"><button onClick={check} className="btn primary" disabled={!typed.trim()}>Check syntax</button><button onClick={()=>setHint(x=>!x)} className="btn secondary"><Lightbulb size={15}/> {hint?'Hide hint':'Hint'}</button><button onClick={()=>setSolution(x=>!x)} className="btn secondary">{solution?'Hide example':'Show example'}</button></div>{hint&&<p className="cli-term-hint">Hint: {task.hint}</p>}{solution&&<pre className="cli-code">{task.command}</pre>}</div>
      {checked&&<div className={'cli-feedback '+(success?'pass':'retry')} role="status">{success?<><CheckCircle2 size={19}/><div><strong>Command matched the expected structure.</strong><p>This checks the command pattern only; it does not verify credentials, cloud resources, or real execution.</p></div></>:<><AlertTriangle size={19}/><div><strong>Not quite. Check your verb, resource and flags.</strong><p>Try again or open the hint. Flags can appear in a different order, but exact resource values still matter.</p></div></>}</div>}
      {(success||solution||stage==='guided')&&<div className="cli-explanation"><h3><BookOpen size={18}/> Break down the command</h3><div className="cli-parts">{task.parts.map(([name,meaning])=><div key={name}><code>{name}</code><span>{meaning}</span></div>)}</div><p><strong>Expected verification:</strong> {task.verify}</p>{success&&<><h3>Simulated output</h3><pre className="cli-code">{task.output}</pre></>}</div>}
      {!task.safe&&<p className="cli-warning"><AlertTriangle size={16}/> In a real terminal this command changes configuration or deploys resources. Do not execute against a production project without checking impacts, IAM, and cost.</p>}
      <div className="cli-next"><a href="https://cloud.google.com/sdk/gcloud/reference" target="_blank" rel="noreferrer">Official gcloud command reference ↗</a><button className="btn primary" onClick={next}>Next challenge <ChevronRight size={16}/></button></div></section>
    </div>
  </div>
}
