"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";
import { ArrowUp, Square, Moon, Sun } from "lucide-react";
import { FaXTwitter, FaLinkedin, FaGithub } from "@/components/site-icons-fa6";
import { SiGooglescholar } from "@/components/site-icons-si";
import styles from "./notebook.module.css";
import { ApprovedOffice } from "./approved-doodles";
import { NotebookDoodles } from "./notebook-doodles";

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} target="_blank" rel="noopener noreferrer">{children}</Link>;
}

function NotebookPaper() {
  const id = useId().replace(/:/g, "");
  return <svg className={styles.ruledPaper} aria-hidden="true" width="100%" height="100%">
    <defs><pattern id={`rules-${id}`} width="100%" height="28" patternUnits="userSpaceOnUse"><line x1="0" y1="27.5" x2="100%" y2="27.5" stroke="var(--rule)" strokeWidth="1" /></pattern></defs>
    <rect width="100%" height="100%" fill={`url(#rules-${id})`} />
    <line x1="27" y1="0" x2="27" y2="100%" stroke="#cd796750" strokeWidth="1" />
  </svg>;
}

function Profiles() {
  return <nav className={styles.profiles} aria-label="Profiles and resume">
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nmamano" aria-label="GitHub" title="GitHub"><FaGithub /></a>
    <a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/nilmamano/" aria-label="LinkedIn" title="LinkedIn"><FaLinkedin /></a>
    <a target="_blank" rel="noopener noreferrer" href="https://x.com/Nil053" aria-label="X" title="X"><FaXTwitter /></a>
    <a target="_blank" rel="noopener noreferrer" href="https://scholar.google.com/citations?user=LIuIigEAAAAJ" aria-label="Google Scholar" title="Google Scholar"><SiGooglescholar /></a>
    <div className={styles.profilePages}><a target="_blank" rel="noopener noreferrer" href="/resume/resume_nilmamano.pdf">Resume</a><A href="/blog">Blog</A></div>
  </nav>;
}

export function NotebookConcept() {
  const { resolvedTheme, setTheme } = useTheme();
  const [chapterLinksActive, setChapterLinksActive] = useState(true);
  useEffect(() => {
    const layout = window.matchMedia("(max-width: 1100px)");
    const update = () => setChapterLinksActive(layout.matches);
    update();
    layout.addEventListener("change", update);
    return () => layout.removeEventListener("change", update);
  }, []);
  return <div className={styles.book}>
    <main className={styles.desk}>
      <section className={`${styles.sheet} ${styles.cover}`} id="notebook-cover" aria-labelledby="notebook-title">
        <div className={styles.spread}>
          <header className={styles.coverCopy}>
            <div className={styles.coverTop}>
            <div className={styles.portrait}>
              <img className={styles.day} src="/nil2024_opt.jpg" alt="Nil Mamano" width="600" height="600" />
              <img className={styles.night} src="/nil2024_night_opt.jpg" alt="Nil Mamano" width="600" height="600" />
            </div>
            <div className={styles.coverControls}><Profiles /><button className={styles.themeSwitch} type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label="Toggle color theme"><Sun className={styles.sun} size={18} /><Moon className={styles.moon} size={18} /></button></div>
            </div>
            <h1 id="notebook-title">Nil Mamano</h1>
            <p className={styles.subtitle}>Computer scientist, software engineer, author</p>
            <nav className={styles.toc} aria-label="Chapters"><a href={chapterLinksActive ? "#notebook-dsa" : undefined}><svg className={styles.tocStatus} width="18" height="18" viewBox="0 0 24 24" style={{overflow:"visible"}} role="img" aria-label="Finished"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M6 11Q9 14 10 17Q17 5 25 -1" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" /></svg><span>Chapter 1:</span> DS&amp;A</a><a href={chapterLinksActive ? "#notebook-agents" : undefined}><Square className={styles.tocStatus} size={16} aria-label="In Progress" /><span>Chapter 2:</span> Agentic tooling</a></nav>
          </header>
          <div className={styles.illustration}><NotebookDoodles scene="cover" /></div>
        </div>
      </section>
      <div className={styles.chapters}>
      <section className={`${styles.sheet} ${styles.research}`} id="notebook-dsa" aria-labelledby="notebook-dsa-title">
        <NotebookPaper />
        <div className={styles.spread}>
          <div className={styles.illustration}><NotebookDoodles scene="algorithms" /></div>
          <div className={styles.chapterCopy}>
            <div className={styles.chapterHeading}><span className={styles.chapterNumber}>Chapter 1</span><span className={styles.chapterStatus}>(Finished)</span></div>
            <h2 id="notebook-dsa-title">DS&amp;A<span className={styles.titleDot}>.</span></h2>
            <div className={styles.narrative}>
              <p>Data Structures &amp; Algorithms was my first passion. It brought me to the US as a <A href="/research">PhD student</A>. I co-authored <A href="/research">9 papers</A> (<a target="_blank" rel="noopener noreferrer" href="https://scholar.google.com/citations?user=LIuIigEAAAAJ" title="191 citations on Google Scholar, checked September 17, 2026">190+ citations</a>, if you want such metrics).</p>
              <p>For me, the highlights were being <A href="/posts/recap-of-my-donald-knuth-arc-9946361">cited by Knuth</A> himself in TAOCP and co-authoring <A href="https://www.amazon.com/dp/195570600X">the sequel to <em>Cracking the Coding Interview</em></A> with Gayle McDowell et al.</p>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.sheet} ${styles.blueprint}`} id="notebook-agents" aria-labelledby="notebook-agents-title">
        <NotebookPaper />
        <div className={styles.spread}>
          <div className={styles.chapterCopy}>
            <div className={styles.chapterHeading}><span className={styles.chapterNumber}>Chapter 2</span><span className={`${styles.chapterStatus} ${styles.inProgress}`}>(In Progress)</span></div>
            <h2 id="notebook-agents-title">Agentic Tooling<span className={styles.titleDot}>.</span></h2>
            <div className={styles.narrative}>
              <p>I&apos;m now absorbed in the question of how we work with agents. I aim to deconstruct the limitations we bought into when we accepted TUIs like Claude Code as the default.</p>
              <p>I created <A href="https://isomux.com">isomux.com</A>, a multi-user &amp; multi-agent meta-harness (<A href="/blog/isomux">built in public</A>), and started <A href="https://isomux.app">isomux.app</A>, a hosting business around it (also <A href="/blog/hosted-isomux">built in public</A>). I focus on <A href="/blog/agent-ui">bringing agents to non-technical users</A>. My favorite feature is the <A href="/blog/personal-software-suites">personal-software suite</A>.</p>
              <p><strong>I&apos;m looking for my next opportunity <span className={styles.opportunityLastLine}>in this space.</span></strong></p>
            </div>
          </div>
          <a target="_blank" rel="noopener noreferrer" href="/blog/isomux" className={`${styles.illustration} ${styles.officeScene}`} aria-label="Read about Isomux"><ApprovedOffice /></a>
        </div>
      </section>
      </div>
      <section className={styles.afterword} aria-label="Other projects">
        <span className={styles.notePaper} aria-hidden="true" />
        <div className={styles.otherWork}><span className={styles.smallRule} aria-hidden="true" /><p>Some of my other projects include the <A href="https://wallgame.io">Wall Game</A>, the <A href="https://dsatoolkit.com">DSA Toolkit</A>, and the <A href="/blog">Nil Pointers blog</A>.</p><p>I also spent a few formative years at Google, but decided to leave because I realized I do my best work when I&apos;m truly passionate about it.</p></div>
        <a href="#notebook-cover" className={styles.back}>Back to cover <ArrowUp size={16} aria-hidden="true" /></a>
      </section>
    </main>
    <footer className={styles.footer}><span>© {new Date().getFullYear()} Nil Mamano</span><nav aria-label="More about Nil"><A href="/research">Research</A><A href="/posts">Feed</A><A href="/personal">Outside of work</A><A href="/contact">Get in touch</A><A href="/rss.xml">RSS</A></nav></footer>
  </div>;
}

export default NotebookConcept;
