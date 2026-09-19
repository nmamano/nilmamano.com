"use client";

import type { ReactNode } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import styles from "./office-clock-options.module.css";

const ink="var(--ink)", paper="var(--paper)", mint="var(--mint)", gold="var(--gold)", orange="var(--orange)", face="var(--face)", wood="var(--wood)", blue="var(--blue)";
function Art({children,room=false}:{children:ReactNode;room?:boolean}) {return <svg viewBox={room?"0 0 900 720":"0 0 320 300"} width="100%" aria-hidden="true" focusable="false" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;}
function Circuit({dark=false,sparse=false}:{dark?:boolean;sparse?:boolean}) {return <g stroke={dark?paper:"#3c4844"} strokeWidth="1.1">
  <rect x="-35" y="-33" width="70" height="30" rx="3" fill={dark?paper:blue} />
  <g stroke={dark?blue:paper} strokeWidth="1.7" opacity=".8"><path d="M-24-24H-11M-25-13H-12 M12-24H25M11-13H24" /><path d="M1-21V-19M0-15V-13" /></g>
  <path d="M-46-18H-40V5H-26V22 M-42 22H-36V40H-23 M-5 4V16H-17V43 M8 4V13H33V29H44 M22 9V-1H43V-19 M4 25V49H20 M29 35H39V47" />
  <rect x="-12" y="23" width="27" height="17" rx="1" fill={dark?gold:mint} />
  <path d="M-8 19V23M-2 19V23M4 19V23M10 19V23 M-8 40V44M-2 40V44M10 40V44" />
  {[[-26,22],[-23,40],[-17,43],[44,29],[43,-19],[20,49],[39,47]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.3" fill={dark?paper:gold} />)}
  {!sparse&&<><path d="M-49 2H-40 M-46 8H-38 M46 6H39V16 M22 42V50 M-21-43V-37H-10 M7-45V-39H22" /><rect x="-48" y="27" width="8" height="15" rx="1" fill={gold}/><rect x="29" y="-49" width="9" height="14" rx="1" fill={mint}/><circle cx="-32" cy="-44" r="3" fill={orange}/><circle cx="-42" cy="-36" r="2" fill={mint}/><circle cx="3" cy="-48" r="2" fill={gold}/></>}
</g>;}
function Bells({narrow=false}:{narrow?:boolean}) {return <g>
  <path d="M-48-49L-56-66 M48-49L56-66 M-41-75Q-34-112 0-110Q34-111 42-75 M0-76V-87M-7-89H7" strokeWidth="2.3" />
  <g transform={`translate(-49 -68) rotate(-31) scale(${narrow?.8:1} 1)`}><path d="M-26 3Q-25-24 0-25Q23-24 26 3Z" fill={face}/><path d="M-28 3Q0 9 28 3 M-19-7Q-9-20 8-17" strokeWidth="1.2"/></g>
  <g transform={`translate(49 -68) rotate(31) scale(${narrow?.8:1} 1)`}><path d="M-26 3Q-24-24 0-25Q26-25 27 3Z" fill={face}/><path d="M-28 3Q0 10 29 3 M-12-17Q10-22 20-7" strokeWidth="1.2"/></g>
</g>;}
function Clock({n}:{n:number}) {
  if(n===1)return <Art><g transform="translate(160 159)">
    <path d="M-56-28Q-81 4-93 53Q-96 72-124 89Q-89 79-66 94Q-33 80 0 91Q38 80 66 96Q88 80 123 87Q96 70 92 47Q80 2 55-30Z" fill={gold} strokeWidth="1.5"/>
    <path d="M-62-9Q-85 45-90 80 M-65 81Q-73 58-70 44 M59-11Q89 41 87 79 M64 83Q76 58 70 41" stroke={orange} strokeWidth="1.3" />
    <Bells/><path d="M-42 57L-55 95L-47 98L-33 67 M39 58L52 95L60 92L48 59" fill={face}/>
    <path d="M-76-1C-78-103 79-105 78-1C81 103-78 105-76-1Z" fill={face}/>
    <circle r="68" fill={mint} fillOpacity=".3"/><circle r="62" strokeWidth=".8"/>
    <path d="M-62-23Q-43-64-5-65 M39 56Q62 39 67 17" strokeWidth="3" stroke={paper}/>
    <Circuit/>
  </g><path d="M91 267Q166 276 239 266" opacity=".2" strokeWidth="1.2"/></Art>;
  if(n===2)return <Art><g transform="translate(171 153) rotate(-19)">
    <path d="M-31-28C-102-98-105 15-155-11Q-139 34-161 60Q-104 26-96 68Q-65 60-35 24Z" fill={gold}/>
    <path d="M-49-22C-106-52-111 12-145 3 M-44 2Q-90 1-118 45" stroke={orange} strokeWidth="1.3"/>
    <ellipse cx="17" cy="2" rx="67" ry="82" fill={wood}/><path d="M36-73L52-61 M54-53L66-41 M75-11V25 M56 62L38 78" opacity=".3" strokeWidth="1"/>
    <g transform="scale(.83 1)"><Bells narrow/><path d="M-41 63L-56 102M40 63L55 99" strokeWidth="5"/><ellipse rx="70" ry="80" fill={face}/><ellipse rx="61" ry="70" fill={mint} fillOpacity=".25"/><g transform="scale(.9 1.12)"><Circuit/></g></g>
  </g><path d="M230 242L253 233 M247 256L270 245" opacity=".4" strokeWidth="1.4"/></Art>;
  if(n===3)return <Art><g transform="translate(159 156) rotate(7)">
    <path d="M-47-9Q-63 43-82 75L-50 69L-37 80Q0 71 34 82L54 71L83 77Q62 53 49-12" fill={gold} fillOpacity=".65" strokeWidth="1.3"/>
    <path d="M-56 66L-50 38 M57 67L47 36" strokeWidth="1"/>
    <g transform="scale(.9 .83)"><Bells narrow/></g>
    <path d="M-36 52L-47 89M35 53L44 91" strokeWidth="2.4"/>
    <path d="M-62-7C-60-88 64-90 65-8C75 88-69 87-62-7Z" fill={face} strokeWidth="1.8"/><path d="M-54-7C-52-78 56-77 57-7C61 73-58 73-54-7Z" strokeWidth=".9"/>
    <g transform="translate(0 -3) scale(.72)"><Circuit sparse/></g>
    <path d="M-64 1Q-71 44-40 61 M26-65Q51-59 59-36" opacity=".25" strokeWidth="1"/>
  </g><path d="M118 259Q158 264 199 258" opacity=".25" strokeWidth="1"/></Art>;
  return <Art><g transform="translate(163 158) rotate(-5)">
    <path d="M-61-31Q-79-26-96 17Q-112 65-130 74Q-107 75-93 94Q-72 79-46 84L49 87Q76 71 105 88L126 72Q101 58 94 29Q84-11 60-28Z" fill={gold}/>
    <path d="M-96 70Q-92 26-69-8 M-80 78Q-70 47-66 26 M96 71Q90 35 73 6" stroke={orange} strokeWidth="1.5"/>
    <g transform="scale(1.06 .87)"><Bells/></g>
    <path d="M-48 54L-58 85L-46 90L-32 67 M36 62L50 87L62 82L49 52" fill={wood}/>
    <ellipse rx="85" ry="71" fill={gold}/><ellipse rx="75" ry="61" fill={blue}/><ellipse rx="80" ry="66" strokeWidth=".8"/>
    <g transform="translate(0 1) scale(1.1 .97)"><Circuit dark/></g>
    <path d="M-70-22Q-54-51-23-57" stroke={paper} strokeWidth="2.5"/>
  </g></Art>;
}

function Plant({x,y,s=1}:{x:number;y:number;s?:number}) {return <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M0 0Q-7-39 1-66"/><path d="M-2-12Q-33-17-25-41Q-5-36-2-12 M-3-34Q28-41 21-58Q2-56-3-34 M0-53Q-15-67-5-77Q8-70 0-53" fill={mint}/><path d="M-17-1L18 0L13 29L-12 28Z" fill={orange}/>
</g>;}
function Agent({x,y,s=1,color=orange,hair=0,wave=false,sleep=false}:{x:number;y:number;s?:number;color?:string;hair?:number;wave?:boolean;sleep?:boolean}) {return <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#3c4844">
  <path d="M-17 0Q-23-13-8-17H9Q25-11 18 21H-19Z" fill={color}/><path d="M-19-35C-19-62 25-59 24-35C23-12-21-12-19-35Z" fill={face}/>
  {hair===0?<path d="M-21-36Q-25-62 2-60Q26-60 23-40Q3-48-20-35Z" fill={wood}/>:hair===1?<><path d="M-23-35Q-24-60 1-60Q30-56 27-32" stroke={blue} strokeWidth="5"/><path d="M-23-34V-25M28-33V-24" strokeWidth="7" stroke={gold}/></>:<path d="M-21-42Q-23-53-11-50Q-9-67 4-57Q14-65 17-54Q32-55 25-40Z" fill={gold}/>}
  {sleep?<path d="M-12-32L-5-31M7-31L14-32"/>:<g fill="#3c4844" stroke="none"><circle cx="-7" cy="-33" r="2"/><circle cx="10" cy="-32" r="2"/></g>}
  {hair===2&&<g strokeWidth="1.2"><circle cx="-7" cy="-32" r="6"/><circle cx="10" cy="-32" r="6"/><path d="M-1-32H4"/></g>}
  <path d="M-4-23Q3-18 11-24" strokeWidth="1.4"/>
  <path d={wave?"M16-1L30-12L31-35":"M16 0L29 8L35 2"} strokeWidth="4"/><path d="M-17 0L-30 6" strokeWidth="4"/>
</g>;}
function Desk({x,y,s=1,n=0}:{x:number;y:number;s?:number;n?:number}) {const c=[orange,mint,gold,blue][n%4];return <g transform={`translate(${x} ${y}) scale(${s})`}>
  <Agent x={16} y={-16} color={c} hair={n%3} wave={n%3===0} sleep={n===2}/>
  <path d="M-70 2L-4-33L87 2L22 40Z" fill={wood}/><path d="M-70 2V12L22 50L87 11V2L22 40Z" fill={gold} fillOpacity=".45"/><path d="M-59 18V76M75 20V80M22 50V101" strokeWidth="3"/>
  <path d="M-40-52L18-33V7L-40-12Z" fill={blue}/><path d="M-32-36L-24-30L-32-27 M-17-23L4-16" stroke={face} strokeWidth="1.4"/><path d="M-9-2V15L-24 21L-7 26L9 19L-9 15" fill={wood}/>
  <path d="M23 17L43 25L30 33L9 25Z" fill={face}/><Plant x={-53} y={-2} s={.26}/>
  <g transform="translate(64 3)"><path d="M-8-8L8-3L8 5L-8 0Z" fill={c}/><path d="M-7-5L7 0" stroke={face} strokeWidth="1"/></g>
</g>;}
function Pins({x,y,s=1}:{x:number;y:number;s?:number}) {return <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M0 0H135V94H0Z" fill={wood}/><path d="M6 6H129V88H6Z" fill={gold} fillOpacity=".4"/>
  {[[16,20,face],[74,13,mint],[27,54,face],[88,52,face]].map(([a,b,c],i)=><g key={i} transform={`translate(${a} ${b}) rotate(${i%2?4:-5})`}><path d="M0 0H35V25H0Z" fill={String(c)} strokeWidth="1"/><circle cx="17" cy="2" r="2.8" fill={i%2?blue:orange} stroke="none"/><path d="M6 10H27M6 15H23" opacity=".3" strokeWidth=".9"/></g>)}
</g>;}
function WallClock({x,y,s=1}:{x:number;y:number;s?:number}) {return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r="28" fill={face}/><circle r="24" strokeWidth=".8"/><path d="M0-19V0L15 8M0-24V-21M24 0H21M0 24V21M-24 0H-21" strokeWidth="1.5"/></g>;}
function Cat({x,y,s=1}:{x:number;y:number;s?:number}) {return <g transform={`translate(${x} ${y}) scale(${s})`}><ellipse cy="10" rx="36" ry="17" fill={wood}/><path d="M-28 3Q-27-18-3-12Q24-26 27-1Q35 11 14 13H-17Z" fill={gold}/><path d="M-24-6L-26-21L-14-12L-6-23L-2-7" fill={gold}/><path d="M-20-3L-15-1M-9-2L-5-4M22 6Q49 8 40-16Q34-30 25-18"/><path d="M-28 2L-35 0M-27 6L-36 8" strokeWidth="1"/></g>;}
function Ghost({x,y,s=1}:{x:number;y:number;s?:number}) {return <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M-16 17V-8Q-16-28 1-28Q18-29 18-8V17L9 12L1 19L-7 12Z" fill={mint} fillOpacity=".45" strokeWidth="1.5"/><ellipse cx="-5" cy="-9" rx="3" ry="5" fill={face}/><ellipse cx="7" cy="-9" rx="3" ry="5" fill={face}/><circle cx="-4" cy="-9" r="1" fill={ink}/><circle cx="8" cy="-9" r="1" fill={ink}/></g>;}
function Thought({x,y}:{x:number;y:number}) {return <g transform={`translate(${x} ${y})`} strokeWidth="1.4"><path d="M0 0Q-16-24 10-33Q50-42 65-24Q78-4 47 2H21L5 13L8 1Z" fill={face}/><circle cx="15" cy="-15" r="2" fill={mint}/><circle cx="30" cy="-15" r="2" fill={gold}/><circle cx="45" cy="-15" r="2" fill={orange}/></g>;}
function IsoOffice(){return <Art room>
  {/* Full room grounded in isomux-screenshot.jpeg: windows, board, staggered desks, cat. */}
  <path d="M58 485L450 276L842 485L449 704Z" fill={mint} fillOpacity=".12"/>
  <g strokeWidth="1" opacity=".16">{Array.from({length:7},(_,i)=>{const t=(i+1)/8;return <g key={i}><path d={`M${58+392*t} ${485-209*t}L${449+393*t} ${704-219*t}`}/><path d={`M${450+392*t} ${276+209*t}L${58+391*t} ${485+219*t}`}/></g>;})}</g>
  <path d="M58 485L58 272L450 56L450 276Z" fill={paper}/><path d="M450 56L842 272V485L450 276Z" fill={wood} fillOpacity=".18"/>
  <path d="M57 478L449 269L842 478M451 57L450 276" opacity=".4" strokeWidth="1"/>
  <g transform="matrix(1 -.55 0 1 93 282)"><path d="M0 0H157V132H0Z" fill={blue}/><path d="M8 8H149V124H8Z" stroke={face} strokeWidth="1"/><path d="M78 2V130M0 65H157" stroke={face} strokeWidth="2"/><path d="M119 22Q95 39 115 50Q82 48 91 23Q101 10 119 22Z" fill={gold} stroke="none"/><g fill={face} stroke="none"><circle cx="29" cy="28" r="1.8"/><circle cx="54" cy="93" r="1.6"/><circle cx="129" cy="103" r="1.3"/><circle cx="33" cy="112" r="1.3"/></g></g>
  <g transform="matrix(.79 -.43 0 .79 288 191)"><Pins x={0} y={0}/></g>
  <g transform="matrix(.7 .4 0 .8 520 154)"><WallClock x={0} y={0}/></g>
  <g transform="matrix(1 .54 0 1 725 338)"><path d="M0 0H85V133H0Z" fill={wood}/><path d="M8 9H76V124H8Z"/><path d="M15 19H69V64H15Z M15 77H69V116H15Z" strokeWidth="1" opacity=".45"/><circle cx="18" cy="70" r="4" fill={gold}/></g>
  <g transform="matrix(1 .54 0 1 652 205)"><path d="M0 0H82V34H0Z" fill={paper}/><path d="M9 9H73M9 16H73M9 23H73" opacity=".35" strokeWidth="1"/></g>
  <Plant x={109} y={457} s={.85}/>
  <Desk x={451} y={335} s={.86} n={0}/><Desk x={319} y={402} s={.87} n={1}/><Desk x={599} y={423} s={.88} n={2}/>
  <Desk x={195} y={471} s={.84} n={3}/><Desk x={463} y={501} s={.91} n={4}/><Desk x={333} y={574} s={.93} n={5}/>
  <Thought x={506} y={279}/><Thought x={197} y={383}/>
  <g transform="translate(786 468)"><path d="M-17-31H18V28H-17Z" fill={blue}/><path d="M-9-31V-56Q-8-64 10-61L10-31Z" fill={mint} fillOpacity=".6"/><circle cx="-6" cy="-9" r="2.8" fill={mint}/><circle cx="8" cy="-9" r="2.8" fill={orange}/><path d="M-10 28V35M11 28V35"/></g>
  <Ghost x={547} y={565} s={.92}/><Cat x={453} y={657} s={.83}/>
  <path d="M610 566L652 543L698 569L656 592Z" strokeDasharray="5 7" opacity=".3"/>
</Art>;}
function FrontOffice(){return <Art room>
  {/* The same room as an open dollhouse: desk rows, windows, noticeboard, doorway. */}
  <path d="M73 338L803 337L865 603L440 704L29 602Z" fill={wood} fillOpacity=".18"/>
  <path d="M73 83L803 81V338L73 339Z" fill={paper}/><path d="M29 38L73 83V339L29 602Z M803 81L865 35V603L803 337Z" fill={mint} fillOpacity=".15"/>
  <path d="M73 329H803M76 340L31 603M803 338L865 603" opacity=".35"/>
  <g strokeWidth="1" opacity=".13"><path d="M92 399H817M73 473H836M57 553H853 M217 338L171 637M360 338L343 681M509 338L524 683M655 338L706 641"/></g>
  <g transform="translate(112 127)"><path d="M0 0L171-3V123L0 126Z" fill={blue}/><path d="M8 8H163V115H8Z" stroke={face} strokeWidth="1"/><path d="M85 1V122M0 60H171" stroke={face}/><circle cx="127" cy="29" r="13" fill={gold} stroke="none"/><path d="M21 93Q50 67 83 99Q119 78 153 99" stroke={mint} strokeWidth="1.2"/><path d="M-10 129H184V137H-10Z" fill={wood}/></g>
  <Pins x={352} y={116} s={1.05}/><WallClock x={581} y={128} s={.9}/>
  <path d="M684 169L770 167V340H684Z" fill={wood}/><path d="M692 180L761 178V329H692Z M701 192H752V248H701Z M701 267H752V316H701Z" strokeWidth="1.3"/><circle cx="702" cy="257" r="4" fill={gold}/>
  <g transform="translate(103 288)"><path d="M0 0H86V99H0Z" fill={wood}/><path d="M6 7H80V44H6Z M6 52H80V91H6Z" fill={paper}/>{[12,25,38,55,68].map((x,i)=><path key={i} d={`M${x} 41V${i%2?12:18}H${x+8}V41Z`} fill={[mint,orange,gold][i%3]}/>)}<path d="M13 85H64V74H13Z" fill={mint}/></g>
  <Plant x={143} y={284} s={.65}/><Plant x={789} y={368} s={1.05}/>
  <g transform="translate(0 -8)"><Agent x={280} y={295} color={orange} hair={1} wave/><Agent x={427} y={293} color={mint} hair={0}/>
    <path d="M204 323L481 324L514 367L178 366Z" fill={wood}/><path d="M178 366V378H514V367M191 378V446M500 378V445"/>
    <path d="M225 285L309 285L315 344H230Z M368 286H454L459 344H373Z" fill={blue}/><path d="M244 299L251 306L244 314M260 314H289 M389 300H438M389 310H421" stroke={face} strokeWidth="1.4"/>
    <path d="M257 344V352H284 M398 344V353H429"/><Plant x={338} y={348} s={.32}/>
  </g>
  <Thought x={496} y={259}/>
  <Agent x={641} y={377} color={gold} hair={2} wave/>
  <path d="M557 407L709 407L750 449L533 449Z" fill={wood}/><path d="M533 449V460H750V449M547 460V530M735 460V530"/>
  <path d="M583 369L663 368L669 428H588Z" fill={blue}/><path d="M597 385L604 392L597 400 M616 401H648" stroke={face} strokeWidth="1.3"/><path d="M620 428V440H646"/><Plant x={705} y={428} s={.37}/>
  <Agent x={306} y={474} s={1.15} color={blue} hair={2}/><Agent x={469} y={476} s={1.1} color={orange} hair={1} sleep/>
  <path d="M214 511L533 512L566 566L178 565Z" fill={wood}/><path d="M178 565V579H566V566M192 579V648M552 579V649"/>
  <path d="M242 468L335 469L342 540H248Z M408 476H495L503 544H413Z" fill={blue}/><path d="M258 489L267 497L259 506M278 507H316 M425 492H478M425 503H462M425 514H470" stroke={face} strokeWidth="1.5"/>
  <path d="M282 540V554H311M444 544V558H474"/><Plant x={370} y={546} s={.39}/>
  <g transform="translate(596 571)"><path d="M0 0Q-7-23 18-28Q60-30 64-9V22H0Z" fill={mint} fillOpacity=".3"/><path d="M8 22V63M56 22V63M0 22H65"/></g>
  <Ghost x={638} y={559} s={1.12}/><Cat x={747} y={611} s={1.07}/>
  <path d="M37 83L47 77 M45 91L53 86 M828 85L844 72" strokeWidth="1" opacity=".35"/>
</Art>;}

export function OfficeClockOptions(){const{resolvedTheme,setTheme}=useTheme();return <main className={styles.sheet}>
  <header className={styles.header}><nav aria-label="Drawing groups"><a href="#clock-options">K1–K4</a><a href="#office-options">O1–O2</a></nav><button type="button" onClick={()=>setTheme(resolvedTheme==="dark"?"light":"dark")} aria-label="Toggle color theme"><Sun className={styles.sun} size={18}/><Moon className={styles.moon} size={18}/></button></header>
  <section id="clock-options" className={styles.clocks} aria-label="Clock options">{[1,2,3,4].map(n=><figure key={n}><Clock n={n}/><figcaption>K{n}</figcaption></figure>)}</section>
  <section id="office-options" className={styles.offices} aria-label="Office options"><figure><IsoOffice/><figcaption>O1</figcaption></figure><figure><FrontOffice/><figcaption>O2</figcaption></figure></section>
</main>;}
export default OfficeClockOptions;
