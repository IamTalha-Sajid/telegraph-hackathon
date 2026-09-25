import Link from 'next/link'
import { RegisterButton } from '@/components/s2/Shell'
import { Countdown } from '@/components/s2/bits'
import { Section } from '@/components/s2/Page'
import { END, START, STATS } from '@/data/season2/event'
import { PAGES } from '@/data/season2/pages'

const TEASERS: Record<string, string> = {
  '/why': 'Why Season II exists, and what you walk away with.',
  '/how-it-works': 'Anatomy of a build: how an agent buys ranked intelligence while it works.',
  '/tracks': 'Fifteen industries, the problem in each, and example builds you can start from.',
  '/rules': 'The three rules every build meets, and the testnet standard.',
  '/timeline': 'Thirty days, with one checkpoint in the middle.',
  '/judging': 'What you ship, how it is weighted, and what winning is worth.',
  '/build': 'The starter kit, and how to get going on day one.',
}

export default function Overview() {
  return (
    <>
      <section className="s2-hero">
        <div className="s2-inner s2-hero-grid">
          <div className="s2-hero-body">
            <p className="s2-eyebrow">Season II · 16 Nov to 16 Dec 2026</p>
            <h1 className="s2-hero-title">Build the market the machines will buy from.</h1>
            <div className="hero-prize-badge">
              <span className="hero-prize-badge-label">Prize pool</span>
              <span className="hero-prize-badge-amount">TBA</span>
            </div>
            <p className="s2-hero-lede">
              Thirty days on Sepolia to build an agent that buys verified, ranked intelligence for a real
              industry, and prove it with settled transactions. Fifteen commercial tracks. One winner in each.
            </p>
            <div className="s2-actions">
              <RegisterButton>Register for Season II</RegisterButton>
              <Link className="s2-btn s2-btn-lg" href="/tracks">Explore the 15 tracks</Link>
              <Countdown start={START} end={END} />
            </div>
            <dl className="s2-facts">
              <div><dt>Tracks</dt><dd>15</dd></div>
              <div><dt>Winners</dt><dd>1 per track</dd></div>
              <div><dt>Network</dt><dd>Testnet</dd></div>
            </dl>
          </div>
          <div className="s2-hero-visual">
            <img src="/Website/season2-mascot.png" alt="" aria-hidden="true" className="s2-hero-art" />
          </div>
        </div>
      </section>

      <Section
        label="Overview"
        title="A peer-to-peer ranking protocol for machine intelligence."
        sub="Miners serve machines and earn. Machines buy verified, ranked intelligence and act on it. Season II fills both sides of that market with real work before mainnet."
      >
        <p className="s2-stats-label">On testnet today</p>
        <dl className="s2-stats">
          {STATS.testnet.map(s => <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}
        </dl>
        <p className="s2-stats-label">Coming</p>
        <dl className="s2-stats s2-stats-3">
          {STATS.soon.map(s => <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}
        </dl>
      </Section>

      <Section label="Explore Season II" title="Start anywhere.">
        <ul className="s2-grid s2-grid-4 s2-explore">
          {PAGES.slice(1).map((p, i) => (
            <li key={p.href}>
              <Link href={p.href} className="s2-card s2-card-link">
                <span className="s2-idx">{String(i + 2).padStart(2, '0')}</span>
                <span className="s2-card-title">{p.label}</span>
                <span className="s2-card-body">{TEASERS[p.href]}</span>
                <span className="s2-card-go" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
          <li>
            <RegisterButton className="s2-card s2-card-link s2-card-cta">
              <span className="s2-idx">Ready?</span>
              <span className="s2-card-title">Register for Season II</span>
              <span className="s2-card-body">Pick a track in week one. The starter kit ships before 16 November.</span>
              <span className="s2-card-go" aria-hidden="true">→</span>
            </RegisterButton>
          </li>
        </ul>
      </Section>
    </>
  )
}
