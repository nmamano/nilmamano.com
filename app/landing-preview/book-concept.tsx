"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Research, Agents, OtherWork, SocialLinks } from "./concept";
import styles from "./book.module.css";

export function BookConcept({ variant }: { variant: "spread" | "reader" }) {
  const { resolvedTheme, setTheme } = useTheme();
  return <div className={`${styles.root} ${styles[variant]}`}>
    <nav className={styles.compare} aria-label="Compare designs">
      <Link href="/landing-preview/spread" aria-current={variant === "spread" ? "page" : undefined}>Open book</Link>
      <Link href="/landing-preview/reader" aria-current={variant === "reader" ? "page" : undefined}>Chapter pages</Link>
      <Link href="/landing-preview/cinematic">Illustrated book</Link>
      <Link href="/landing-preview/letter">Earlier designs</Link>
      <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label="Toggle color theme">◐</button>
    </nav>
    <div className={styles.desk}>
      <header className={styles.header}>
        <div className={styles.portrait}><img className={styles.day} src="/nil2024_opt.jpg" alt="Nil Mamano" width={120} height={120}/><img className={styles.night} src="/nil2024_night_opt.jpg" alt="Nil Mamano" width={120} height={120}/></div>
        <div><h1>Nil Mamano</h1><p>Computer scientist, software engineer, author</p><SocialLinks /></div>
        <nav className={styles.siteLinks} aria-label="Site navigation"><Link href="/research">Research</Link><Link href="/posts">Feed</Link><Link href="/blog">Blog</Link></nav>
      </header>
      <p className={styles.intro}>In my career, I&apos;ve been passionate about two things: DS&amp;A and agentic tooling.</p>
      <nav className={styles.contents} aria-label="Chapters">
        <a href="#dsa">Chapter 1. DS&amp;A</a><a href="#agents">Chapter 2. Agentic Tooling</a>
      </nav>
      <main className={styles.book}>
        <section id="dsa" className={styles.page} aria-labelledby="dsa-heading">
          <div className={styles.running}>Nil Mamano <span>Data structures &amp; algorithms</span></div>
          <div className={styles.chapterBody}><span className={styles.chapterNumber}>Chapter 1.</span><h2 id="dsa-heading">DS&amp;A</h2><div className={styles.rule} /><Research /></div>
          <footer className={styles.folio}><span>01</span>{variant === "reader" && <a href="#agents">Next: Agentic Tooling →</a>}</footer>
        </section>
        <section id="agents" className={styles.page} aria-labelledby="agents-heading">
          <div className={styles.running}>Nil Mamano <span>Working with agents</span></div>
          <div className={styles.chapterBody}><span className={styles.chapterNumber}>Chapter 2.</span><h2 id="agents-heading">Agentic Tooling</h2><div className={styles.rule} /><Agents /></div>
          <footer className={styles.folio}>{variant === "reader" && <a href="#dsa">← Previous: DS&amp;A</a>}<span>02</span></footer>
        </section>
      </main>
      <div className={styles.afterword}><OtherWork /></div>
      <footer className={styles.footer}><span>© {new Date().getFullYear()} Nil Mamano</span><nav><Link href="/personal">Outside of work</Link><Link href="/contact">Get in touch</Link><Link href="/rss.xml">RSS</Link></nav></footer>
    </div>
  </div>;
}
