"use client";

import type { ReactNode } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import styles from "./doodle-options.module.css";

const I = "var(--ink)", P = "var(--paper)", O = "var(--orange)", M = "var(--mint)", G = "var(--gold)";

function Art({ children }: { children: ReactNode }) {
  return <svg viewBox="0 0 320 260" width="100%" aria-hidden="true" focusable="false" fill="none" stroke={I} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
}
function Person({ x, y, scale = 1, color = O, sleep = false }: { x: number; y: number; scale?: number; color?: string; sleep?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M-21 4Q-26-15-9-17H11Q25-14 22 5L20 35H-20Z" fill={color} />
    <path d="M-22-40C-21-65 23-64 24-40C26-14-24-15-22-40Z" fill={P} />
    {sleep ? <path d="M-12-41Q-7-36-2-41 M5-41Q10-36 15-41" /> : <g fill={I} stroke="none"><circle cx="-7" cy="-42" r="2" /><circle cx="9" cy="-41" r="2" /></g>}
    <path d="M-6-29Q2-24 10-30" />
    <path d="M-18 1L-34 17L-25 27 M19 1L33 17L44 11 M-12 35L-15 57 M12 35L15 57" strokeWidth="4" />
  </g>;
}
function Knight({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cy="45" rx="28" ry="8" fill={G} />
    <path d="M-24 41Q-23 16-9 0L-24 4L-31-9L-14-34L-11-47L0-40Q30-34 25-2L17 36L24 42Z" fill={G} />
    <path d="M-7-28L-13-13 M1-34Q17-20 10-4" />
    <circle cx="-10" cy="-21" r="2" fill={I} stroke="none" />
  </g>;
}
function Node({ x, y, r = 5, color = M }: { x: number; y: number; r?: number; color?: string }) {
  return <circle cx={x} cy={y} r={r} fill={color} />;
}
function Book({ children }: { children?: ReactNode }) {
  return <g transform="translate(33 58) rotate(-5 125 90)">
    <path d="M0 15Q61-4 126 15Q188-6 250 11L253 167Q192 150 130 171Q63 151-1 170Z" fill={M} />
    <path d="M4 7Q67-10 126 10Q188-12 246 4L248 156Q191 141 130 163Q62 142 4 157Z" fill={P} />
    <path d="M126 10L130 163 M5 163Q62 151 124 168 M136 168Q191 149 247 163" strokeWidth="1.4" />
    {children}
  </g>;
}
function Pen({ x, y, rotate = 0, scale = 1 }: { x: number; y: number; rotate?: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
    <path d="M-6-61H7V41L0 62L-7 41Z" fill={G} /><path d="M-6-50H7 M-6 41H7 M0 58L-2 51H3Z" fill={I} /><path d="M0-45V36" strokeWidth="1" />
  </g>;
}
function Screen({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M-34-25L34-24L36 23L-33 25Z" fill={P} /><path d="M-21-9L-12-2L-21 6 M-4 6H14 M1 25V36 M-14 37H17" /></g>;
}
function Spark({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y-8}Q${x+1} ${y-1} ${x+8} ${y}Q${x+1} ${y+1} ${x} ${y+9}Q${x-1} ${y+1} ${x-8} ${y}Q${x-1} ${y-1} ${x} ${y-8}Z`} strokeWidth="1.5" />;
}

function CoverOption({ n }: { n: number }) {
  if (n === 1) return <Art>
    <Book><path d="M63 7L76 8L75 188L64 181L54 187Z" fill={O} /><path d="M185 2L200 2L208 188L195 179L186 188Z" fill={G} /><path d="M25 104L104 101 M25 116L96 114 M154 119L224 117 M155 131L215 130" opacity=".25" /></Book>
    <Knight x={102} y={95} scale={.75} /><Person x={222} y={116} scale={.63} color={M} />
    <Spark x={37} y={50} /><Spark x={286} y={161} />
  </Art>;
  if (n === 2) return <Art>
    <Book><path d="M25 66L57 47L89 76L61 104L25 66 M57 47L83 21" strokeWidth="2" />{[[25,66],[57,47],[89,76],[61,104],[83,21]].map(([x,y],i)=><Node key={i} x={x} y={y} r={4} color={i%2?O:M} />)}<Screen x={187} y={73} scale={.87} /></Book>
    <path d="M23 233C53 219 66 246 111 229S184 231 184 212" strokeWidth="1.7" /><Pen x={266} y={162} rotate={27} scale={.85} />
  </Art>;
  if (n === 3) return <Art>
    <path d="M77 148C18 100 52 39 102 38C165 34 184 104 140 140L130 165L87 167Z" fill={G} fillOpacity=".35" />
    <path d="M88 168L130 166 M88 175L130 174 M93 183L126 182 M100 190L118 190" />
    <path d="M95 160L90 112L71 87L110 68L134 100L90 112L126 126L121 160" />
    {[[90,112],[71,87],[110,68],[134,100],[126,126]].map(([x,y],i)=><Node key={i} x={x} y={y} r={4} />)}
    <path d="M44 44L34 32 M30 83L15 81 M108 23V11 M166 51L177 40 M180 90L193 89" stroke={O} />
    <Person x={231} y={163} scale={1} color={M} /><Pen x={281} y={168} rotate={12} scale={.72} />
    <path d="M68 224Q169 232 282 224" opacity=".3" />
  </Art>;
  return <Art>
    <Book><path d="M193 6L207 6L211 177L200 169L190 178Z" fill={O} /><path d="M213 0L245 4L247 34Z" fill={G} /><path d="M213 0L214 32L247 34" /><path d="M33 54L90 52 M31 69L79 66 M32 83L94 81" opacity=".3" /></Book>
    <g transform="translate(174 209) rotate(-28)"><path d="M0 0Q-7-67 4-145" /><path d="M-2-18Q-43-32-30-59Q-3-49-2-18 M-4-53Q38-60 30-85Q1-80-4-53 M-1-87Q-29-100-18-125Q3-115-1-87 M3-122Q5-158 24-163Q35-137 3-122" fill={M} /></g>
    <path d="M36 229L72 226 M39 235L64 231" opacity=".35" />
  </Art>;
}

function ChessLayer({ y, opacity = 1 }: { y: number; opacity?: number }) {
  return <g transform={`translate(154 ${y}) matrix(18 8 -18 8 0 0)`} opacity={opacity} strokeWidth=".1">
    {Array.from({length:36},(_,i)=><rect key={i} x={i%6} y={Math.floor(i/6)} width="1" height="1" fill={(i+Math.floor(i/6))%2?M:P} />)}
  </g>;
}
function ResearchOption({ n }: { n: number }) {
  if(n===1) return <Art>
    <ChessLayer y={145} opacity={.45} /><ChessLayer y={91} opacity={.7} /><ChessLayer y={37} />
    <path d="M64 131L64 185L172 193L172 139 M154 84L172 108L226 116" stroke={O} strokeWidth="3" strokeDasharray="5 5" />
    <Knight x={156} y={56} scale={.87} /><path d="M49 236Q152 247 261 235" opacity=".2" />
  </Art>;
  if(n===2) return <Art>
    <path d="M33 201L65 122L159 92L216 98L247 114" strokeWidth="2" />
    <path d="M37 198Q66 114 158 94" opacity=".18" strokeWidth="6" />
    <path d="M199 85C186 38 278 43 281 102C284 164 184 157 198 108" stroke={O} strokeWidth="2.5" />
    {[[33,201],[65,122],[159,92],[216,98],[247,114]].map(([x,y],i)=><Node key={i} x={x} y={y} r={i>2?8:6} color={i>2?O:M} />)}
    <g opacity=".23" fill={I} stroke="none"><circle cx="111" cy="189" r="3" /><circle cx="51" cy="42" r="3" /><circle cx="247" cy="204" r="3" /><circle cx="133" cy="40" r="3" /></g>
    <path d="M208 178Q231 187 251 178" opacity=".35" /><Spark x={284} y={53} />
  </Art>;
  if(n===3) return <Art>
    <g transform="translate(51 35) rotate(-7 105 90)"><path d="M0 15L69 0L144 14L211 1L215 177L146 188L72 171L0 190Z" fill={P} />
      <path d="M0 15L69 0Q94 41 69 81L0 104Z" fill={M} fillOpacity=".6" /><path d="M69 0L144 14L211 1L213 87Q169 107 121 91L69 81Q94 42 69 0Z" fill={G} fillOpacity=".55" /><path d="M0 104L69 81L121 91Q126 144 99 178L72 171L0 190Z" fill={O} fillOpacity=".5" /><path d="M121 91L213 87L215 177L146 188L99 178Q126 144 121 91Z" fill={M} fillOpacity=".22" />
      {[[34,52],[143,49],[48,134],[165,146]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`}><path d="M-6 1L0-5L6 1V8H-6Z" fill={P} /><path d="M0 8V4" /></g>)}
      <path d="M69 0L72 171 M144 14L146 188" opacity=".15" strokeDasharray="3 5" />
    </g><g transform="translate(279 210)" strokeWidth="1.5"><circle r="17" /><path d="M0-12L4 2L0 12L-4-2Z" fill={O} /></g>
  </Art>;
  if(n===4) return <Art>
    <path d="M33 110L62 63L111 97L91 164L44 183L33 110L91 164L62 63 M111 97L162 126L210 83L277 105L271 167L213 187L199 140L162 126 M210 83L199 140L277 105 M199 140L271 167" />
    <path d="M132 91C118 31 45 26 22 80C-10 156 34 221 91 206C143 195 154 143 132 91Z M189 72C220 40 295 59 303 112C319 190 258 225 205 211C170 197 156 108 189 72Z" opacity=".25" strokeDasharray="3 5" strokeWidth="1.5" />
    {[[33,110],[62,63],[111,97],[91,164],[44,183],[210,83],[277,105],[271,167],[213,187],[199,140]].map(([x,y],i)=><Node key={i} x={x} y={y} r={6} />)}<Node x={162} y={126} r={10} color={O} />
    <path d="M163 77Q148 100 160 124Q174 151 160 177" stroke={O} strokeDasharray="4 6" />
  </Art>;
  return <Art>
    {/* Inspected public/projects/bctci-cover.png: cape, twin bells, circuitry. */}
    <path d="M114 86Q80 135 54 206Q103 194 124 217Q162 199 205 218Q234 204 273 208Q232 173 213 89Z" fill={G} />
    <path d="M118 108Q92 172 80 197 M207 108Q223 176 245 198 M115 193L124 215 M205 192L205 216" stroke={O} opacity=".7" />
    <path d="M115 66Q105 19 160 23Q214 21 208 62" />
    <path d="M93 47Q73 63 93 77L120 50Q108 35 93 47Z M207 43Q234 43 239 66L208 74Q193 58 207 43Z" fill={M} />
    <path d="M104 75L115 86 M215 72L205 88 M157 36V48" strokeWidth="4" />
    <circle cx="161" cy="137" r="76" fill={P} /><circle cx="161" cy="137" r="64" fill={M} fillOpacity=".35" />
    <path d="M109 195L98 222 M208 195L221 222" strokeWidth="5" />
    <rect x="128" y="98" width="66" height="34" rx="3" fill={I} />
    <g stroke={G} strokeWidth="2"><path d="M138 107H151 M138 120H151 M171 107H184 M171 120H184" /><path d="M161 110V112 M161 117V119" /></g>
    <g strokeWidth="1.5"><path d="M111 142H138V160H150 M177 133V152H202V167 M157 140V181H133V193 M116 163V177H127 M191 181H175V195 M210 137H197V147" />
      <rect x="148" y="153" width="24" height="22" fill={O} />
      {[[111,142],[150,160],[202,167],[133,193],[127,177],[175,195],[210,137]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3" fill={G} />)}
    </g><Spark x={48} y={91} /><Spark x={275} y={45} />
  </Art>;
}

function AgentOption({ n }: { n: number }) {
  if(n===1) return <Art>
    <path d="M29 204Q155 210 291 204 M39 211V224 M282 210V224" />
    {[{x:45,y:53,w:62,h:148,c:O,angle:-7},{x:114,y:74,w:66,h:132,c:M,angle:3},{x:194,y:85,w:62,h:119,c:G,angle:8}].map((b,i)=><g key={i} transform={`rotate(${b.angle} ${b.x+b.w/2} 202)`}><path d={`M${b.x} ${b.y}H${b.x+b.w}V${b.y+b.h}H${b.x}Z`} fill={b.c} /><path d={`M${b.x+9} ${b.y}V${b.y+b.h}`} opacity=".4" /><path d={`M${b.x+31} ${b.y-9}H${b.x+44}V${b.y+24}L${b.x+37} ${b.y+17}L${b.x+31} ${b.y+24}Z`} fill={P} />
      {i===0?<g transform="translate(74 112)"><path d="M-16 21V-13H16V21Z" fill={P} /><path d="M-8-5V0 M6-5V0 M-8 7V12 M6 7V12 M-3 21V12H4V21" /></g>:i===1?<g transform="translate(151 136)"><path d="M-17-18H17V19H-17Z" fill={P} /><path d="M-10 19V-10H9V19 M4 6H5" /></g>:<g transform="translate(227 147)"><circle cy="-6" r="12" fill={P} /><path d="M-14 20Q-15 5 0 6Q15 5 14 20Z" fill={P} /><path d="M-4-7H-3 M4-7H5" /></g>}
    </g>)}
  </Art>;
  if(n===2) return <Art>
    <Person x={62} y={161} scale={.86} /><Person x={258} y={159} scale={.86} color={M} />
    <g transform="translate(88 80) rotate(-3 70 65)"><path d="M0 0H145V141H0Z" fill={P} /><path d="M0 29H145 M48 29V141 M96 29V141" opacity=".5" />
      {[[8,42,O],[56,66,G],[104,93,M]].map(([x,y,c],i)=><g key={i}><rect x={Number(x)} y={Number(y)} width="32" height="34" rx="2" fill={String(c)} /><path d={`M${Number(x)+7} ${Number(y)+17}L${Number(x)+13} ${Number(y)+23}L${Number(x)+26} ${Number(y)+10}`} /></g>)}
      <path d="M14 15H33 M64 15H81 M110 15H131" strokeWidth="4" stroke={M} />
    </g>
    <path d="M80 158L99 150 M238 155L225 148" strokeWidth="5" />
  </Art>;
  if(n===3) return <Art>
    <g transform="translate(43 35) rotate(-11)"><rect width="69" height="71" rx="3" fill={P} /><path d="M0 19H69 M14-4V8 M53-4V8" />{[[15,33],[34,33],[53,33],[15,53],[34,53],[53,53]].map(([x,y],i)=><rect key={i} x={x-4} y={y-4} width="8" height="8" fill={i===4?O:M} stroke="none" />)}</g>
    <g transform="translate(136 31) rotate(6)"><path d="M0 0H75V68H0Z" fill={P} /><path d="M12 12V55H64 M20 47L32 34L45 40L61 19" /><circle cx="61" cy="19" r="3" fill={O} /></g>
    <Person x={268} y={147} scale={.73} color={M} />
    <g transform="translate(52 129)"><path d="M0 16L21-1H150L171 17V93H0Z" fill={O} /><path d="M0 17H171 M72 18V32H101V18 M45 0V-24Q86-44 125-24V0" /><path d="M11 22V83H159" opacity=".3" /><rect x="21" y="-35" width="46" height="48" rx="3" fill={P} /><path d="M21-22H67 M31-11L37-6L32 0 M44 0H56" /><path d="M119 17V-34L135-34L135 17" fill={G} /><path d="M113-34L141-34L141-44L113-44Z" fill={M} /></g>
    <path d="M246 160L228 142" strokeWidth="4" /><Spark x={226} y={35} />
  </Art>;
  return <Art>
    <g transform="translate(93 140)"><path d="M-26-48Q-43-68-57-48L-42-32 M26-48Q43-68 57-48L42-32" fill={G} /><circle r="53" fill={P} /><circle r="43" fill={M} fillOpacity=".3" /><path d="M0-29V0L22 10 M-35 44L-44 62 M35 44L44 62" strokeWidth="3" /><circle r="3" fill={I} /><path d="M0-39V-34 M39 0H34 M0 39V34 M-39 0H-34" /></g>
    <Person x={226} y={143} sleep color={G} />
    <path d="M177 161L285 162 M186 165V209 M275 165V210" strokeWidth="3" />
    <g transform="translate(203 10) rotate(7)"><path d="M0 0H71V56H0Z" fill={P} /><path d="M0 15H71 M12-4V6 M57-4V6 M52 56V39H71" /><path d="M12 28H19 M29 28H36 M46 28H53 M12 41H19 M29 41H36" stroke={M} strokeWidth="4" /></g>
    <path d="M263 90Q273 78 282 85 M270 103Q287 91 296 101" opacity=".5" />
  </Art>;
}

export function DoodleOptions() {
  const { resolvedTheme, setTheme } = useTheme();
  const groups = [{ id: "cover", title: "Cover", prefix: "C", count: 4 }, { id: "algorithms", title: "Chapter 1 · DS&A", prefix: "R", count: 5 }, { id: "office", title: "Chapter 2 · Agentic Tooling", prefix: "A", count: 4 }];
  return <main className={styles.sheet}>
    <header className={styles.header}><nav aria-label="Doodle groups">{groups.map(g=><a key={g.id} href={`#doodles-${g.id}`}>{g.title}</a>)}</nav><button type="button" onClick={()=>setTheme(resolvedTheme==="dark"?"light":"dark")} aria-label="Toggle color theme"><Sun className={styles.sun} size={19} /><Moon className={styles.moon} size={19} /></button></header>
    {groups.map(g=><section key={g.id} id={`doodles-${g.id}`} className={styles.group} aria-labelledby={`doodles-heading-${g.id}`}><h1 id={`doodles-heading-${g.id}`}>{g.title}</h1><div className={styles.options}>{Array.from({length:g.count},(_,i)=><figure key={i} className={styles.option}><div className={styles.art}>{g.prefix==="C"?<CoverOption n={i+1} />:g.prefix==="R"?<ResearchOption n={i+1} />:<AgentOption n={i+1} />}</div><figcaption>{g.prefix}{i+1}</figcaption></figure>)}</div></section>)}
  </main>;
}

export default DoodleOptions;
