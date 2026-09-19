import type { ReactNode } from "react";
import { ApprovedClock } from "./approved-doodles";

const ink = "var(--drawing-ink, #30464b)";
const paper = "var(--drawing-paper, #fbf6e9)";
const orange = "var(--orange, #d78861)";
const mint = "var(--mint, #8bb8a7)";
const gold = "var(--gold, #d8b66f)";

function Note({ x, y, children, tilt = -4, size = 19 }: { x: number; y: number; children: ReactNode; tilt?: number; size?: number }) {
  return <text x={x} y={y} transform={`rotate(${tilt} ${x} ${y})`} fill="currentColor" stroke="none" fontSize={size} fontFamily="'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive" fontStyle="italic">{children}</text>;
}

function Arrow({ d, head }: { d: string; head: string }) {
  return <g fill="none" stroke="currentColor" strokeWidth="1.7" opacity=".75"><path d={d} /><path d={head} /></g>;
}

function Star({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  const s = small ? .55 : 1;
  return <g transform={`translate(${x} ${y}) scale(${s})`} stroke="currentColor" strokeWidth="1.7" fill="none"><path d="M0-9Q1-1 8 0Q1 1 0 10Q-1 1-9 0Q-1-1 0-9Z" /></g>;
}

function Letter({ x, y, tilt = 0, color = gold }: { x: number; y: number; tilt?: number; color?: string }) {
  return <g transform={`translate(${x} ${y}) rotate(${tilt})`} stroke={ink} strokeWidth="2" fill={color}><path d="M-22-14L23-13L22 15L-23 14Z" /><path d="M-21-12L0 4L21-11 M-21 13L-8 2 M21 13L8 2" fill="none" /></g>;
}

function Person({ x, y, color = orange, wave = false, scale = 1 }: { x: number; y: number; color?: string; wave?: boolean; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M-21 6Q-24-9-9-12H10Q24-8 22 7L20 36H-20Z" fill={color} />
    <path d="M-20-29C-21-57 24-56 23-30C24-4-20-5-20-29Z" fill={paper} />
    <path d="M-7-16Q1-10 9-17" fill="none" />
    <g stroke="none" fill={ink}><circle cx="-7" cy="-31" r="2.2" /><circle cx="8" cy="-30" r="2.2" /></g>
    <path d="M-18 4L-30 21L-20 29" fill="none" strokeWidth="5" />
    <path d={wave ? "M19 5L35-5L36-26" : "M19 5L32 21L43 14"} fill="none" strokeWidth="5" />
    <path d="M-12 37L-13 61 M12 37L16 61" fill="none" strokeWidth="7" />
  </g>;
}

function Sprig({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={ink} strokeWidth="2" fill={mint}>
    <path d="M0 0Q-5-37 2-70" fill="none" stroke="currentColor" />
    <path d="M-1-15Q-28-23-20-39Q-2-34-1-15 M-2-34Q24-39 21-55Q2-53-2-34 M0-52Q-16-61-11-77Q4-69 0-52" />
    <path d="M-17 0L19 1L12 29L-11 28Z" fill={orange} />
  </g>;
}

function Cover() {
  return <>
    {/* One large sketch, with smaller thoughts escaping into the margins. */}
    <g transform="translate(55 128) rotate(-6 220 150)" stroke={ink} strokeWidth="2.6" fill={paper}>
      <path d="M24 20Q103-10 207 16Q312-11 411 18L421 244Q319 214 213 246Q111 218 22 244Z" fill={mint} />
      <path d="M30 15Q111-8 209 21Q314-6 407 14L410 226Q320 203 214 233Q111 208 28 228Z" />
      <path d="M209 21Q207 128 214 233" fill="none" />
      <path d="M33 235Q112 215 212 241 M220 240Q314 212 413 233" fill="none" strokeWidth="1.3" />
      <path d="M214 233L224 276L237 264L249 272L237 226" fill={orange} />
      <g fill="none" strokeWidth="1.4" opacity=".45"><path d="M57 51L125 48 M56 61L145 60 M55 72L112 69 M258 174L370 169 M258 186L348 180 M259 196L361 192" /></g>
      <g fill="none" strokeWidth="2"><path d="M65 118Q91 137 117 111L170 150 M117 111L135 78 M65 118L78 175" /></g>
      {[[65,118],[117,111],[170,150],[135,78],[78,175]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===1?9:6} fill={i%2 ? orange : mint} />)}
      <g transform="translate(293 101)"><Person x={0} y={0} color={orange} scale={.82} wave /></g>
      <g transform="translate(345 116) rotate(8)" fill={paper}><path d="M-22-20L26-20L26 11L-22 11Z" /><path d="M-2 12V20 M-12 21H10 M-16-9L-11-5L-16 0 M-5 0H9" fill="none" /></g>
      <path d="M149 188Q160 195 185 185" fill="none" stroke={orange} strokeWidth="3" />
    </g>
    <g transform="translate(322 56) rotate(12)" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M-9 11C-36-17 33-25 12 8L8 18H-5Z" fill={gold} stroke={ink} /><path d="M-6 23H8 M-3 28H5 M-24-13L-32-18 M27-11L35-15 M1-29L1-38" />
    </g>
    <g transform="translate(476 311) rotate(18)" stroke={ink} strokeWidth="2"><path d="M-5-69L7-70L7 44L0 63L-6 45Z" fill={gold} /><path d="M-5 45H7 M-5-60H7 M0 61L-2 53H3Z" fill={ink} /><path d="M1-56V40" opacity=".45" /></g>
    <Note x={182} y={447} tilt={-3}>a work in progress</Note>
    <path d="M183 458Q269 449 382 458" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".6" />
    <Star x={411} y={48} small /><Star x={39} y={283} /><Star x={408} y={420} small />
  </>;
}

function Algorithms() {
  return <>
    {/* Research motifs from app/research/page.tsx and app/lib/publications.ts:
        knight tours, nearest-neighbor chains, geometric regions, graph separators.
        These are margin sketches, not figures reproducing a paper's construction. */}
    <g transform="translate(46 115) rotate(-7 115 100)">
      <g stroke="currentColor" strokeWidth="1.7" fill="none"><path d="M1 1Q116-3 224 1L227 217Q113 214 0 218Z" />
        {Array.from({length:7},(_,i)=><path key={i} d={`M${(i+1)*28} 0L${(i+1)*28+1} 216 M0 ${(i+1)*27}L226 ${(i+1)*27+1}`} opacity=".45" />)}
      </g>
      {Array.from({length:64},(_,i)=>i%2 !== Math.floor(i/8)%2 ? <rect key={i} x={i%8*28+1} y={Math.floor(i/8)*27+1} width="26" height="25" fill={mint} opacity=".25" /> : null)}
      <path d="M14 14L70 41L98 95L154 122L182 176L126 203L98 149L42 122" fill="none" stroke={orange} strokeWidth="3" strokeLinejoin="round" />
      <g transform="translate(115 70)" stroke={ink} strokeWidth="2.7" strokeLinejoin="round"><ellipse cy="59" rx="34" ry="10" fill={gold} /><path d="M-29 53Q-24 23-10 5L-27 8L-38-7L-18-37L-14-53L-2-46Q34-38 29-3L20 46L29 53Z" fill={gold} /><path d="M-10-30L-15-15 M-1-39Q17-25 11-6" fill="none" /><circle cx="-12" cy="-24" r="2.4" fill={ink} stroke="none" /></g>
    </g>
    {/* A chain enters a mutually nearest pair; each arrow stops at the node rim. */}
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M287 117L350 102 M343 98L350 102L345 108 M362 101L401 100 M394 96L401 100L394 104" />
      <path d="M411 97Q430 89 440 104 M432 101L440 104L440 96" />
      <path d="M439 114Q421 122 410 105 M410 113L410 105L418 108" />
    </g>
    {[[282,118],[356,101],[407,100],[443,110]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill={i>1?orange:mint} stroke={ink} strokeWidth="1.8" />)}
    <path d="M391 92C382 64 463 68 461 106C462 139 394 142 391 111" fill="none" stroke="currentColor" opacity=".35" strokeWidth="1.5" />
    <g transform="translate(319 210) rotate(5)" stroke="currentColor" strokeWidth="1.7" fill="none">
      <path d="M1 1Q50-6 123 0L126 118Q47 122-2 115Z" />
      <path d="M1 1H45Q66 22 47 56L-2 71Z" fill={mint} fillOpacity=".23" /><path d="M45 1H123V65Q77 85 47 56Q65 23 45 1Z" fill={gold} fillOpacity=".3" /><path d="M-2 71Q29 60 47 56Q72 79 89 77L66 119H-2Z" fill={orange} fillOpacity=".23" />
      <path d="M89 77L126 65 M66 119L89 77" />
      <g fill="currentColor" stroke="none"><circle cx="24" cy="29" r="4" /><circle cx="89" cy="31" r="4" /><circle cx="31" cy="95" r="4" /><circle cx="106" cy="97" r="4" /></g>
    </g>
    <g transform="translate(20 345) scale(.65)" fill="none" stroke="currentColor" strokeWidth="2.3">
      <path d="M33 110L62 63L111 97L91 164L44 183L33 110L91 164L62 63 M111 97L162 126L210 83L277 105L271 167L213 187L199 140L162 126 M210 83L199 140L277 105 M199 140L271 167" />
      <path d="M132 91C118 31 45 26 22 80C-10 156 34 221 91 206C143 195 154 143 132 91Z M189 72C220 40 295 59 303 112C319 190 258 225 205 211C170 197 156 108 189 72Z" opacity=".25" strokeDasharray="3 5" strokeWidth="1.5" />
      {[[33,110],[62,63],[111,97],[91,164],[44,183],[210,83],[277,105],[271,167],[213,187],[199,140]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={6} fill={mint}/>)}
      <circle cx={162} cy={126} r={10} fill={orange}/>
      <path d="M163 77Q148 100 160 124Q174 151 160 177" stroke={orange} strokeDasharray="4 6" />
    </g>
    <svg x={305} y={330} width={200} height={188} viewBox="0 0 320 300"><ApprovedClock /></svg>
  </>;
}

function Office() {
  return <>
    {/* A tiny shared desk rather than another repeated isometric plate. */}
    <Person x={204} y={230} color={orange} />
    <Person x={330} y={238} color={mint} wave />
    <g stroke={ink} strokeWidth="2.5" strokeLinejoin="round" fill={paper}>
      <path d="M115 261L378 264L403 280L101 278Z" fill={gold} /><path d="M118 279L117 345 M385 281L388 350" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M145 219L231 222L234 265L149 262Z" /><path d="M263 232L308 232L323 267L254 265Z" />
      <path d="M158 234L165 240L159 247 M174 248L197 249 M273 244H296 M273 252H300" fill="none" />
      <path d="M351 245Q360 241 367 246L365 267H353Z M368 250Q382 247 376 259L367 260" fill={orange} />
    </g>
    <g transform="translate(189 97) rotate(-5)" stroke="currentColor" strokeWidth="1.8" fill="none"><path d="M-2-8Q-15-24 6-34Q43-43 62-29Q80-10 57 0L30 2L13 18L17 2Q-1 2-2-8Z" /><path d="M12-17H46 M12-8H34" opacity=".6" /></g>
    <Letter x={311} y={121} tilt={11} />
    <Arrow d="M256 99Q291 66 331 78Q369 87 355 159" head="M348 149L354 162L366 151" />
    <g transform="translate(26 116) rotate(-8)" stroke={ink} strokeWidth="1.9" fill={paper}><path d="M12-10H82V56H12Z" /><path d="M6-5H76V63H6Z" /><path d="M0 0H70V69H0Z" /><path d="M12 18H51 M12 29H57 M12 41H44 M12 52H53" fill="none" strokeWidth="1.3" /><path d="M9-3L9 8L26 8L26-3" fill={mint} /></g>
    <Arrow d="M102 177Q127 174 138 189" head="M128 184L139 192L140 180" />
    <g transform="translate(411 120) rotate(7)" stroke={ink} strokeWidth="1.8" fill={paper}><path d="M0 0L69-2L73 88L-2 89Z" /><path d="M13 20L19 26L31 12 M13 44L19 49L31 37" fill="none" stroke={mint} strokeWidth="3" /><path d="M42 20H58 M42 44H60 M13 65H27V78H13Z M42 69H59" fill="none" /></g>
    <g transform="translate(47 339) rotate(-9)" stroke={ink} strokeWidth="2" fill={paper}><path d="M1 4Q0-3 9-3H53Q62-3 62 5V100Q62 106 54 106H9Q1 106 1 97Z" /><path d="M7 12H55V89H7Z" fill={mint} fillOpacity=".35" /><path d="M25 4H38 M26 98H37" fill="none" /><path d="M15 33Q30 18 47 34V57H16Z" /><circle cx="25" cy="40" r="1.7" fill={ink} /><circle cx="38" cy="40" r="1.7" fill={ink} /><path d="M26 49Q32 54 39 48" fill="none" /></g>
    <Arrow d="M86 323Q72 283 126 294" head="M115 287L129 294L115 301" />
    <g transform="translate(277 371) rotate(5)" stroke={ink} strokeWidth="1.8" fill={paper}><path d="M22-11H156V76H22Z" /><path d="M9-4H147V82H9Z" /><path d="M0 7H134V94H0Z" /><path d="M0 24H134" fill="none" />
      <g stroke="none"><circle cx="10" cy="16" r="2" fill={orange} /><circle cx="19" cy="16" r="2" fill={gold} /><circle cx="28" cy="16" r="2" fill={mint} /></g>
      <path d="M12 38H48V78H12Z" fill={mint} fillOpacity=".5" /><path d="M62 76V59H72V48H84V55H94V35H106V76 M61 82H119" fill="none" /><path d="M21 49L25 54L34 43 M21 66H39" fill="none" />
    </g>
    <Arrow d="M232 310Q264 348 300 348" head="M290 341L302 348L290 355" />
    <Sprig x={448} y={323} scale={.65} />
    <Star x={142} y={78} small /><Star x={175} y={378} /><Star x={477} y={73} small />
  </>;
}

function DoodleLink({ href, label, x, y, width, height }: { href: string; label: string; x: number; y: number; width: number; height: number }) {
  return <a href={href} target={href.startsWith("#") ? undefined : "_blank"} rel={href.startsWith("#") ? undefined : "noopener noreferrer"} aria-label={label}><title>{label}</title><rect x={x} y={y} width={width} height={height} fill="transparent" stroke="none" /></a>;
}

export function NotebookDoodles({ scene }: { scene: "cover" | "algorithms" | "office" }) {
  return <svg viewBox={scene === "cover" ? "0 8 520 470" : "0 60 520 465"} width="100%" style={{ height: "auto", display: "block", overflow: "visible" }} role="group" aria-label={scene === "cover" ? "Notebook sketches" : scene === "algorithms" ? "Research sketches with links" : "Agent tools with links"} fill="none" strokeLinecap="round" strokeLinejoin="round">
    {scene === "cover" ? <Cover /> : scene === "algorithms" ? <Algorithms /> : <Office />}
    {scene === "cover" ? <>
      <DoodleLink href="#notebook-dsa" label="Chapter 1: Data Structures and Algorithms" x={70} y={135} width={190} height={210}/>
      <DoodleLink href="#notebook-agents" label="Chapter 2: Agentic Tooling" x={270} y={135} width={200} height={210}/>
    </> : scene === "algorithms" ? <>
      <DoodleLink href="/posts/recap-of-my-donald-knuth-arc-9946361" label="The knight’s tour" x={20} y={95} width={255} height={250}/>
      <DoodleLink href="/dissertation/nildissertation.pdf" label="Nearest-neighbor chains and greedy algorithms" x={275} y={65} width={190} height={90}/>
      <DoodleLink href="https://arxiv.org/pdf/1804.09411" label="Stable-matching Voronoi diagrams" x={300} y={195} width={155} height={150}/>
      <DoodleLink href="https://www.amazon.com/dp/195570600X" label="Beyond Cracking the Coding Interview" x={305} y={330} width={200} height={188}/>
      <DoodleLink href="https://arxiv.org/pdf/1803.04555" label="Graph separators" x={15} y={360} width={215} height={135}/>
    </> : <>
      <DoodleLink href="/blog/isomux#hierarchical-memory" label="Hierarchical memory" x={5} y={95} width={120} height={110}/>
      <DoodleLink href="/blog/isomux#agent-human-shared-task-board" label="Agent-human shared task board" x={390} y={100} width={110} height={120}/>
      <DoodleLink href="/blog/isomux" label="Isomux: an office for agents and humans" x={125} y={185} width={280} height={150}/>
      <DoodleLink href="/blog/agent-ui" label="Making agents user-friendly" x={20} y={320} width={110} height={140}/>
      <DoodleLink href="/blog/personal-software-suites" label="Personal-software suites" x={260} y={355} width={190} height={125}/>
    </>}
  </svg>;
}
export default NotebookDoodles;
