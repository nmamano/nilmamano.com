"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { FaXTwitter, FaLinkedin, FaGithub } from "@/components/site-icons-fa6";
import { SiGooglescholar } from "@/components/site-icons-si";
import styles from "./helper.module.css";

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href}>{children}</Link>;
}

function Research() {
  return <p>DS&amp;A brought me to the US, as a <A href="/research">PhD student</A>. I co-authored <A href="/research">9 papers</A> and got <a href="https://scholar.google.com/citations?user=LIuIigEAAAAJ" title="191 citations on Google Scholar, checked September 17, 2026">190+ citations</a> (if you care about such metrics). But for me the highlight of that chapter was being <A href="/blog/knights-tour">cited by Knuth himself</A> in TAOCP, and co-authoring <A href="https://www.beyondctci.com/">the sequel to Cracking the Coding Interview</A>.</p>;
}

function Agents() {
  return <p>I&apos;m now absorbed in the question of how we work with agents. I think many of the limitations that we accept when interacting with agents are historical artifacts, and my work aims to deconstruct them. I <A href="/blog/isomux">built in public</A> a multi-user, multi-agent platform (<A href="https://isomux.com">isomux.com</A>) and started <A href="https://isomux.app">isomux.app</A>, a hosting business around it (also <A href="/blog/hosted-isomux">built in public</A>). My focus is on <A href="/blog/agent-ui">bringing agents to non-technical users</A>. One feature I&apos;m proud of is the <A href="/blog/personal-software-suites">personal-software suite</A>.</p>;
}

function OtherWork() {
  return <p>Some of my other projects are the <A href="https://wallgame.io">Wall Game</A>, the <A href="https://dsatoolkit.com">DSA Toolkit</A>, and the <A href="/blog">Nil pointers blog</A>.</p>;
}

// The narrative stays identical to the other concepts; only its setting changes.
export function HelperConcept() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div className={styles.preview}>
      <nav className={styles.chooser} aria-label="Compare landing page designs">
        <span className={styles.previewLabel}>Preview</span>
        <div className={styles.choices}>
          <Link href="/landing-preview/letter">A · Letter</Link>
          <Link href="/landing-preview/study">B · Study</Link>
          <Link href="/landing-preview/journal">C · Journal</Link>
          <Link href="/landing-preview/helper" aria-current="page">D · Window</Link>
        </div>
        <button type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label="Toggle color theme">
          <Sun className={styles.sun} size={17} />
          <Moon className={styles.moon} size={17} />
        </button>
      </nav>
      <div className={styles.canvas}>
        <header className={styles.siteNav}>
          <span aria-hidden="true" />
          <nav aria-label="Site navigation">
            <A href="/research">Research</A>
            <A href="/posts">Feed</A>
            <A href="/blog">Blog <span aria-hidden="true">↗</span></A>
          </nav>
        </header>
        <main className={styles.page}>
          <header className={styles.identity}>
            <h1>Nil Mamano</h1>
            <p className={styles.subtitle}>Computer scientist, software engineer, author</p>
          </header>
          <aside className={styles.margin} aria-label="Portrait and profiles">
            <div className={styles.photoFrame}>
              <div className={styles.portrait}>
                <img className={styles.day} src="/nil2024_opt.jpg" alt="Nil Mamano" width="600" height="600" />
                <img className={styles.night} src="/nil2024_night_opt.jpg" alt="Nil Mamano" width="600" height="600" />
              </div>
            </div>
            <nav className={styles.socials} aria-label="Profiles and resume">
              <div className={styles.profileLinks}>
                <a href="https://github.com/nmamano" aria-label="GitHub" title="GitHub"><FaGithub /></a>
                <a href="https://linkedin.com/in/nilmamano/" aria-label="LinkedIn" title="LinkedIn"><FaLinkedin /></a>
                <a href="https://x.com/Nil053" aria-label="X" title="X"><FaXTwitter /></a>
                <a href="https://scholar.google.com/citations?user=LIuIigEAAAAJ" aria-label="Google Scholar" title="Google Scholar"><SiGooglescholar /></a>
              </div>
              <a className={styles.resume} href="/resume/resume_nilmamano.pdf">Resume <span aria-hidden="true">↗</span></a>
            </nav>
            <div className={styles.marginRule} aria-hidden="true"><span /></div>
          </aside>
          <article className={styles.story} aria-label="About Nil">
            <p className={styles.lead}>In my career, I&apos;ve been passionate about two things: <span>DS&amp;A</span> and <span>agentic tooling</span>.</p>
            <div className={styles.chapters}>
              <section aria-label="Data structures and algorithms"><Research /></section>
              <section aria-label="Agentic tooling"><Agents /></section>
            </div>
            <div className={styles.otherWork}><OtherWork /></div>
          </article>
        </main>
        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Nil Mamano</span>
          <nav aria-label="More about Nil">
            <A href="/personal">Outside of work</A>
            <A href="/contact">Get in touch</A>
            <A href="/rss.xml">RSS</A>
          </nav>
        </footer>
      </div>
    </div>
  );
}

export default HelperConcept;
