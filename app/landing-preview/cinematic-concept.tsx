"use client";

import { useId } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowDown, ArrowUp, ArrowUpRight, Moon, Sun } from "lucide-react";
import { FaXTwitter, FaLinkedin, FaGithub } from "@/components/site-icons-fa6";
import { SiGooglescholar } from "@/components/site-icons-si";
import styles from "./cinematic.module.css";

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href}>{children}</Link>;
}

// The same ink geometry and palette as the procedural Isomux film.
function Coworker({ color = "var(--orange)", wave = false }: { color?: string; wave?: boolean }) {
  return <g stroke="var(--drawing-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="-22" y="-3" width="44" height="49" rx="15" fill={color} />
    <circle cy="-27" r="24" fill="var(--drawing-paper)" />
    <g fill="var(--drawing-ink)" stroke="none"><circle cx="-7" cy="-28" r="2" /><circle cx="7" cy="-28" r="2" /></g>
    <path d="M-6-17 Q0-11 6-17" fill="none" />
    <path d="M-18 13 L-33 28 L-23 35" fill="none" strokeWidth="5" />
    <path d={wave ? "M18 13 L35 2 L36-18" : "M18 13 L32 28 L41 23"} fill="none" strokeWidth="5" />
    <path d="M-12 45 L-15 66 M12 45 L17 66" strokeWidth="7" />
  </g>;
}

function Desk({ x, y, scale = 1, color, wave = false }: { x: number; y: number; scale?: number; color: string; wave?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="var(--drawing-ink)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
    <ellipse cy="83" rx="85" ry="15" fill="var(--drawing-ink)" opacity=".06" stroke="none" />
    <g transform="translate(12 -51)"><Coworker color={color} wave={wave} /></g>
    <path d="M-82 5 L-14-27 L88 10 L22 48Z" fill="#d6bea0" />
    <path d="M-82 5 L22 48 L22 56 L-82 13Z" fill="#ad8e70" />
    <path d="M22 48 L88 10 L88 18 L22 56Z" fill="#c3a384" />
    <path d="M-70 17V78 M74 27V85 M22 56V104" fill="none" strokeWidth="5" />
    <path d="M-44-48 L17-30 V12 L-44-6Z" fill="#152735" />
    <path d="M-36-33 L7-19 M-36-22 L-8-13 M-36-11 L-21-6" stroke={color} strokeWidth="2.5" />
    <path d="M-12 4V20 L-25 26" fill="none" strokeWidth="3" />
    <path d="M2 21 L27 30 L13 37 L-12 28Z" fill="#f5eedf" />
    <rect x="53" y="-6" width="13" height="18" rx="3" fill="#f5eedf" />
  </g>;
}

function Plant({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`} stroke="var(--drawing-ink)" strokeWidth="2" strokeLinejoin="round">
    <path d="M0 0V-78" fill="none" />
    <path d="M0-13 Q-35-23-23-37 Q-1-34 0-13 M0-31 Q30-39 25-55 Q4-54 0-31 M0-49 Q-23-53-18-70 Q0-69 0-49 M0-65 Q4-87 15-88 Q22-68 0-65" fill="var(--mint)" />
    <path d="M-18 0H18L12 30H-12Z" fill="var(--orange)" />
  </g>;
}

function Envelope({ x, y, color = "var(--gold)", rotate = 0 }: { x: number; y: number; color?: string; rotate?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${rotate})`} stroke="var(--drawing-ink)" strokeWidth="1.8" strokeLinejoin="round">
    <rect x="-15" y="-10" width="30" height="20" rx="2" fill={color} />
    <path d="M-14-9 L0 2 L14-9" fill="none" />
  </g>;
}

function Plate({ scene }: { scene: "cover" | "algorithms" | "office" }) {
  const id = useId().replace(/:/g, "");
  return <svg viewBox="0 0 600 500" className={styles.plate} aria-hidden="true" focusable="false">
    <defs>
      <pattern id={`${id}-grid`} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="currentColor" strokeWidth=".6" /></pattern>
    </defs>
    <rect x="30" y="25" width="540" height="450" fill={`url(#${id}-grid)`} opacity=".13" />
    <g fill="none" stroke="currentColor" opacity=".3" strokeWidth="1">
      <path d="M30 50V25H55 M545 25H570V50 M30 450V475H55 M545 475H570V450" />
      <circle cx="300" cy="250" r="190" strokeDasharray="3 9" />
    </g>
    {scene === "cover" && <>
      <g stroke="var(--drawing-ink)" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M82 312L263 250L508 310L320 408Z" fill="#bda689" />
        <path d="M82 312V334L320 431L508 332V310L320 408Z" fill="#d7c5a8" />
        <path d="M89 307L259 250Q288 251 300 269Q325 256 346 263L509 302L319 394Q301 382 286 389Z" fill="var(--drawing-paper)" />
        <path d="M300 269L302 386 M92 320L286 400 M94 328L286 409 M330 405L497 324 M330 413L497 332" fill="none" strokeWidth="1.3" />
      </g>
      <Desk x={228} y={239} scale={.87} color="var(--orange)" />
      <Desk x={399} y={264} scale={.73} color="var(--mint)" wave />
      <Plant x={152} y={301} />
      <g fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeDasharray="4 8"><path d="M234 130C270 53 422 61 405 184" /></g>
      <Envelope x={335} y={102} rotate={-13} />
      <g transform="translate(229 95)" stroke="var(--orange)" strokeWidth="2.5" strokeLinecap="round"><circle r="13" fill="var(--gold)" stroke="none" /><path d="M-5 18H5 M0-25V-31 M-21-12L-27-15 M21-12L27-15 M-22 10L-28 13 M22 10L28 13" /></g>
    </>}
    {scene === "algorithms" && <>
      <g stroke="var(--drawing-ink)" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M79 263L272 168L509 277L313 381Z" fill="var(--drawing-paper)" />
        <path d="M79 263V280L313 400L509 295V277L313 381Z" fill="#c6ae8e" />
      </g>
      <g transform="matrix(29 14 -24 12 272 168)">
        {Array.from({ length: 64 }, (_, i) => <rect key={i} x={i % 8} y={Math.floor(i / 8)} width="1" height="1" fill={(i + Math.floor(i / 8)) % 2 === 0 ? "var(--mint)" : "var(--drawing-paper)"} opacity=".7" />)}
        <path d="M.5.5L2.5 1.5L3.5 3.5L5.5 4.5L6.5 6.5L4.5 7.5L3.5 5.5L1.5 4.5" fill="none" stroke="var(--orange)" strokeWidth=".13" />
        {[[.5,.5],[2.5,1.5],[3.5,3.5],[5.5,4.5],[6.5,6.5],[4.5,7.5],[3.5,5.5],[1.5,4.5]].map(([x,y], i) => <circle key={i} cx={x} cy={y} r=".14" fill="var(--drawing-ink)" />)}
      </g>
      <g transform="translate(312 212)" stroke="var(--drawing-ink)" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cy="56" rx="33" ry="10" fill="var(--gold)" />
        <path d="M-28 49Q-23 19-8 1L-27 5L-36-9L-16-38L-12-55L0-46Q35-38 30-2L20 43L28 50Z" fill="var(--gold)" />
        <path d="M-8-31L-14-15 M0-42Q20-24 11-3" fill="none" />
        <circle cx="-12" cy="-24" r="2.5" fill="var(--drawing-ink)" stroke="none" />
      </g>
      <g stroke="var(--accent)" fill="none" strokeWidth="1.6"><path d="M119 169L147 97L214 116L256 73L337 99" /><path d="M147 97L172 49M214 116L227 154" /></g>
      {[[119,169],[147,97],[214,116],[256,73],[337,99],[172,49],[227,154]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===2?8:5} fill={i%2 ? "var(--orange)":"var(--mint)"} stroke="var(--drawing-ink)" strokeWidth="1.5" />)}
      <g transform="translate(402 382) rotate(-16)" stroke="var(--drawing-ink)" strokeWidth="2"><rect x="-37" y="-25" width="74" height="50" rx="3" fill="var(--orange)" /><path d="M-27-25V25 M-14-10H25 M-14-1H17 M-14 8H22" fill="none" /></g>
    </>}
    {scene === "office" && <>
      <g stroke="var(--mint)" strokeWidth="1.5" fill="none" opacity=".6"><path d="M113 232L300 139L498 233L302 338Z M113 232V250L302 356L498 251V233 M302 338V356" /><path d="M200 86C275 17 466 50 474 174 M119 242C83 340 173 413 288 412 M449 326C429 392 373 406 343 407" strokeDasharray="5 8" /></g>
      <Desk x={229} y={181} scale={.83} color="var(--orange)" />
      <Desk x={405} y={242} scale={.83} color="var(--mint)" wave />
      <Desk x={246} y={327} scale={.83} color="var(--gold)" />
      <Plant x={477} y={303} />
      <Envelope x={352} y={64} rotate={12} />
      <Envelope x={132} y={362} color="var(--mint)" rotate={-18} />
      <Envelope x={385} y={398} color="var(--orange)" rotate={-8} />
      <g stroke="var(--mint)" strokeWidth="1.5" opacity=".5"><path d="M521 108v34M504 125h34 M91 82v18M82 91h18" /></g>
    </>}
  </svg>;
}

function Profiles() {
  return <nav className={styles.profiles} aria-label="Profiles and resume">
    <a href="https://github.com/nmamano" aria-label="GitHub" title="GitHub"><FaGithub /></a>
    <a href="https://linkedin.com/in/nilmamano/" aria-label="LinkedIn" title="LinkedIn"><FaLinkedin /></a>
    <a href="https://x.com/Nil053" aria-label="X" title="X"><FaXTwitter /></a>
    <a href="https://scholar.google.com/citations?user=LIuIigEAAAAJ" aria-label="Google Scholar" title="Google Scholar"><SiGooglescholar /></a>
    <a href="/resume/resume_nilmamano.pdf" className={styles.resume}>Resume <ArrowUpRight size={14} aria-hidden="true" /></a>
  </nav>;
}

export function CinematicConcept() {
  const { resolvedTheme, setTheme } = useTheme();
  return <div className={styles.book}>
    <div className={styles.previewBar}>
      <Link href="/landing-preview/spread">Open book</Link><Link href="/landing-preview/reader">Chapter pages</Link><span>Illustrated book</span><Link href="/landing-preview/notebook">Notebook desk</Link>
      <button type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label="Toggle color theme"><Sun className={styles.sun} size={17} /><Moon className={styles.moon} size={17} /></button>
    </div>
    <nav className={styles.contentsBar} aria-label="Book chapters">
      <a href="#cinematic-cover">Cover</a>
      <a href="#cinematic-dsa"><span>01</span> DS&amp;A</a>
      <a href="#cinematic-agents"><span>02</span> Agentic Tooling</a>
      <Link href="/blog" className={styles.blogLink}>Blog <ArrowUpRight size={14} aria-hidden="true" /></Link>
    </nav>
    <main>
      <section className={`${styles.sheet} ${styles.cover}`} id="cinematic-cover" aria-labelledby="cinematic-title">
        <div className={styles.spread}>
          <header className={styles.coverCopy}>
            <div className={styles.portrait}>
              <img className={styles.day} src="/nil2024_opt.jpg" alt="Nil Mamano" width="600" height="600" />
              <img className={styles.night} src="/nil2024_night_opt.jpg" alt="Nil Mamano" width="600" height="600" />
            </div>
            <h1 id="cinematic-title">Nil Mamano</h1>
            <p className={styles.subtitle}>Computer scientist, software engineer, author</p>
            <Profiles />
            <p className={styles.lead}>In my career, I&apos;ve been passionate about two things: <a href="#cinematic-dsa">DS&amp;A</a> and <a href="#cinematic-agents">agentic tooling</a>.</p>
            <a href="#cinematic-dsa" className={styles.turn}>Chapter 1 <ArrowDown size={18} aria-hidden="true" /></a>
          </header>
          <div className={styles.illustration}><Plate scene="cover" /></div>
        </div>
        <div className={styles.folio}><span>Nil Mamano</span><div aria-hidden="true"><b /><i /><i /></div><span>Cover / 00</span></div>
      </section>
      <section className={`${styles.sheet} ${styles.research}`} id="cinematic-dsa" aria-labelledby="cinematic-dsa-title">
        <div className={styles.spread}>
          <div className={styles.illustration}><Plate scene="algorithms" /></div>
          <div className={styles.chapterCopy}>
            <span className={styles.chapterNumber}>Chapter 1</span>
            <h2 id="cinematic-dsa-title">DS&amp;A<span className={styles.titleDot}>.</span></h2>
            <div className={styles.narrative}>
              <p>DS&amp;A brought me to the US, as a <A href="/research">PhD student</A>. I co-authored <A href="/research">9 papers</A> and got <a href="https://scholar.google.com/citations?user=LIuIigEAAAAJ" title="191 citations on Google Scholar, checked September 17, 2026">190+ citations</a> (if you care about such metrics).</p>
              <p>But for me the highlight of that chapter was being <A href="/blog/knights-tour">cited by Knuth himself</A> in TAOCP, and co-authoring <A href="https://www.beyondctci.com/">the sequel to <em>Cracking the Coding Interview</em></A>.</p>
            </div>
            <a href="#cinematic-agents" className={styles.turn}>Chapter 2 <ArrowDown size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <div className={styles.folio}><span>Data structures &amp; algorithms</span><div aria-hidden="true"><i /><b /><i /></div><span>01 / 02</span></div>
      </section>
      <section className={`${styles.sheet} ${styles.blueprint}`} id="cinematic-agents" aria-labelledby="cinematic-agents-title">
        <div className={styles.spread}>
          <div className={styles.chapterCopy}>
            <span className={styles.chapterNumber}>Chapter 2</span>
            <h2 id="cinematic-agents-title">Agentic<br />Tooling<span className={styles.titleDot}>.</span></h2>
            <div className={styles.narrative}>
              <p>I&apos;m now absorbed in the question of how we work with agents. I think many of the limitations that we accept when interacting with agents are historical artifacts, and my work aims to deconstruct them.</p>
              <p>I <A href="/blog/isomux">built in public</A> a multi-user, multi-agent platform (<A href="https://isomux.com">isomux.com</A>) and started <A href="https://isomux.app">isomux.app</A>, a hosting business around it (also <A href="/blog/hosted-isomux">built in public</A>). My focus is on <A href="/blog/agent-ui">bringing agents to non-technical users</A>. One feature I&apos;m proud of is the <A href="/blog/personal-software-suites">personal-software suite</A>.</p>
            </div>
          </div>
          <div className={styles.illustration}><Plate scene="office" /></div>
        </div>
        <div className={styles.folio}><span>Working with agents</span><div aria-hidden="true"><i /><i /><b /></div><span>02 / 02</span></div>
      </section>
      <section className={styles.afterword} aria-label="Other projects">
        <div className={styles.otherWork}><span className={styles.smallRule} aria-hidden="true" /><p>Some of my other projects are the <A href="https://wallgame.io">Wall Game</A>, the <A href="https://dsatoolkit.com">DSA Toolkit</A>, and the <A href="/blog">Nil pointers blog</A>.</p></div>
        <a href="#cinematic-cover" className={styles.back}>Back to cover <ArrowUp size={16} aria-hidden="true" /></a>
      </section>
    </main>
    <footer className={styles.footer}><span>© {new Date().getFullYear()} Nil Mamano</span><nav aria-label="More about Nil"><A href="/research">Research</A><A href="/posts">Feed</A><A href="/personal">Outside of work</A><A href="/contact">Get in touch</A><A href="/rss.xml">RSS</A></nav></footer>
  </div>;
}

export default CinematicConcept;
