import { LoaderCircle, Loader, CircleDashed, RotateCw } from "lucide-react";
export function SpinnerOptions() {
  return <main style={{background:'#e6dcc6',minHeight:'100svh',padding:'40px',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'24px',alignContent:'start'}}>
    {[LoaderCircle,Loader,CircleDashed,RotateCw].map((Icon,i)=><figure key={i} style={{margin:0}}><div style={{background:'#4c6255',color:'#f2ebdb',padding:'32px 24px',borderRadius:'4px',boxShadow:'3px 5px 0 #c4bcaa'}}><div style={{display:'flex',alignItems:'center',gap:'14px',fontFamily:'Georgia,serif',fontSize:'18px'}}><Icon size={23} strokeWidth={1.6}/><span>Chapter 2: Agentic tooling</span></div><div style={{paddingTop:'25px',display:'flex',justifyContent:'center'}}><Icon size={46} strokeWidth={1.5}/></div></div><figcaption style={{textAlign:'center',marginTop:'18px',fontFamily:'monospace',color:'#334238'}}>S{i+1}</figcaption></figure>)}
  </main>;
}
