'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* ── Intersection observer hook for scroll-in animations ── */
function useInView(threshold = 0.15) {
  const ref  = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, vis } = useInView()
  return (
    <div
      ref={ref}
      className={`rules-reveal${vis ? ' rules-reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ── Track table ── */
const TRACKS = [
  { track: 'Track 1: Miners',       focus: 'Building and running high-quality miners',         dates: 'Aug 17 – Aug 31', duration: '15 days', color: '#86efac' },
  { track: 'Track 2: Script Authors', focus: 'Writing and improving evaluation scripts',       dates: 'Aug 17 – Aug 31', duration: '15 days', color: '#86efac' },
  { track: 'Track 3: Applications', focus: 'Building real applications and agents using Telegraph', dates: 'Aug 31 – Sep 7',  duration: '7 days',  color: '#60a5fa' },
  { track: 'Winner Selection',      focus: 'Selecting winners across all 3 tracks',            dates: 'Sep 8 – Sep 18',  duration: '10 days', color: '#a78bfa' },
  { track: 'Announcement & Prizes', focus: 'Announce winners and distribute prizes',           dates: 'Sep 19 – Sep 25', duration: '7 days',  color: '#fbbf24' },
]

/* ── Judging criteria ── */
const MINER_CRITERIA = [
  { pct: 50, label: 'Telegraph Internal Ranking & Performance', desc: 'Canonical Score, consistency, and spot check performance during the hackathon.' },
  { pct: 25, label: 'Actual Usage by Applications',            desc: 'Total inference calls received + number of Track 3 applications actively using your miner. Judged within each intent separately.' },
  { pct: 25, label: 'Engagement & Updates on X',               desc: 'Quality, consistency, reach, and meaningful engagement of updates posted on X. Tag @Telegraphprotoc on X in all update posts.' },
]
const SCRIPT_CRITERIA = [
  { pct: 75, label: 'Actual Performance of the Script', desc: 'How accurately and effectively the script evaluates miner outputs vs the current Canonical Script.' },
  { pct: 15, label: 'Engagement & Updates on X',        desc: 'Quality, consistency, reach, and engagement of updates posted on X. Tag @Telegraphprotoc on X in all update posts.' },
  { pct: 10, label: 'Community Engagement & Adoption',  desc: 'Mentions, feedback, and actual adoption of your script by others.' },
]
const APP_CRITERIA = [
  { pct: 45, label: 'Real Usage & Adoption',                       desc: 'Number of real users + actual volume of Telegraph calls made by your application.' },
  { pct: 25, label: 'Usefulness, Creativity & Depth of Integration', desc: 'How useful and creative the application is, and how deeply it leverages Telegraph\'s intelligence layer (off-chain and on-chain).' },
  { pct: 25, label: 'Engagement & Updates on X',                   desc: 'Quality, reach, and meaningful engagement of updates posted on X. Tag @Telegraphprotoc on X in all update posts.' },
  { pct: 5,  label: 'Technical Execution & Integration Quality',    desc: 'Cleanliness and reliability of the integration with Telegraph.' },
]

/* ── Prizes ── */
const PRIZES = [
  { track: 'Miner Track',        total: '$2,000', first: '$1,000', second: '$600', third: '$400' },
  { track: 'Script Author Track', total: '$1,000', first: '$500',  second: '$300', third: '$200' },
  { track: 'Application Track',  total: '$2,000', first: '$1,000', second: '$600', third: '$400' },
]

/* ── How it works steps ── */
const HOW_STEPS = [
  { n: '01', title: 'Miners Are Ranked, Not Just Listed', body: 'Anyone can bring their model, data source, or specialized system into Telegraph as a miner. Miners are ranked based on performance, domain relevance, and historical quality. Validators continuously evaluate outputs against ground truth. Higher consistency → higher rank.' },
  { n: '02', title: 'Probabilistic Routing Based on Intent', body: 'Agents declare intent — domain, minimum confidence threshold, deadline. Telegraph routes probabilistically to top-ranked miners for that intent. Higher-performing miners receive more traffic and more USDC per query.' },
  { n: '03', title: 'The Quality Flywheel', body: 'Better miners → more routed demand → more real USDC earnings → stronger earnings attract better miners → network compounds in quality, reliability, and coverage. Fundamentally different from aggregators.' },
  { n: '04', title: 'Independent Leaderboards per Intent', body: 'Each intent (e.g. AI text detection) has its own leaderboard. Miners are only ranked against others in the same domain. Completely different tasks do not affect your ranking or routing share.' },
]

/* ── Focus areas ── */
const FOCUS_AREAS = [
  { title: 'On-Chain & Blockchain Intelligence Pipelines',  body: 'Build agents that consume verified intelligence and directly trigger on-chain actions — trading, liquidations, arbitrage, compliance, treasury management.' },
  { title: 'Autonomous Agents & Workflows',                  body: 'Build agents that subscribe to real-time signals and take automated actions without human intervention.' },
  { title: 'Multi-Intent & Cross-Domain Intelligence',       body: 'Combine signals from multiple intents to create more powerful decision-making systems.' },
  { title: 'Confidence Thresholds & Routing Behavior',       body: 'Experiment with different confidence levels and understand how routing changes based on requirements.' },
  { title: 'Signal Quality & Verification',                  body: 'Deeply understand how validators score outputs and how this affects reliability for downstream applications.' },
  { title: 'Real-Time Streaming & Persistent Intelligence',  body: 'Move beyond one-off queries and build systems that continuously consume and act on live intelligence feeds.' },
]

/* ── Rules list ── */
const RULES = [
  'Applications in Track 3 must use real Telegraph miners. Simulated or mocked data is not allowed.',
  'Miners and Script Authors must remain live and operational throughout Track 3.',
  'All updates used for judging must be publicly posted on X and properly tagged.',
  'Artificial inflation of metrics or gaming the system will result in disqualification.',
  'Each intent operates with its own independent leaderboard. Cash prizes are awarded only to the Top 3 miners with the highest overall scores across all intents.',
  'All participants must join the official Hackathon Discord. Important discussions, announcements, and support will happen there.',
]

function CriteriaBar({ pct, label, desc, delay }: { pct: number; label: string; desc: string; delay: number }) {
  const { ref, vis } = useInView(0.1)
  return (
    <div ref={ref} className="criteria-row" style={{ transitionDelay: `${delay}ms` }}>
      <div className="criteria-header">
        <span className="criteria-pct">{pct}%</span>
        <span className="criteria-label">{label}</span>
      </div>
      <div className="criteria-track">
        <div
          className="criteria-fill"
          style={{ width: vis ? `${pct}%` : '0%' }}
        />
      </div>
      <p className="criteria-desc">{desc}</p>
    </div>
  )
}

export default function RulesPage() {
  const [activeTrack, setActiveTrack] = useState<0|1|2>(0)

  const TRACK_CRITERIA = [MINER_CRITERIA, SCRIPT_CRITERIA, APP_CRITERIA]
  const TRACK_LABELS   = ['Track 1: Miners', 'Track 2: Script Authors', 'Track 3: Applications']

  return (
    <div className="rules-page">

      {/* Nav bar */}
      <nav className="rules-nav">
        <Link href="/" className="rules-nav-logo">
          <img src="/Telegraoh-Logo.png" alt="" className="nav-logo-img" />
          <span className="nav-logo-text">TELEGRAPH</span>
        </Link>
        <span className="nav-badge">Hackathon</span>
        <div style={{ flex: 1 }} />
        <Link href="/" className="rules-nav-back">← Back to site</Link>
      </nav>

      {/* Hero */}
      <header className="rules-hero">
        <Reveal>
          <p className="rules-eyebrow">Rules & Guidelines</p>
          <h1 className="rules-h1">Hackathon<br />Winner Criteria</h1>
          <p className="rules-hero-sub">
            We are not looking for the best demo.<br />
            We are looking for real evidence that the quality flywheel works.
          </p>
        </Reveal>
      </header>

      <div className="rules-content">

        {/* Purpose */}
        <section className="rules-section">
          <Reveal>
            <p className="rules-section-eyebrow">Why this exists</p>
            <h2 className="rules-section-h2">Purpose of This Hackathon</h2>
            <p className="rules-body">
              The main objective is to prove that Telegraph's intelligence layer and quality flywheel work in real conditions. We want to demonstrate that miners can be properly ranked, real demand gets routed to better miners, and this creates a self-reinforcing loop where quality compounds over time.
            </p>
            <p className="rules-body" style={{ marginTop: '12px' }}>
              We are testing whether Telegraph's core mechanism — ranking + probabilistic routing + real economic incentives — produces a stronger intelligence layer for machines.
            </p>
          </Reveal>
        </section>

        {/* How Telegraph Works */}
        <section className="rules-section">
          <Reveal>
            <p className="rules-section-eyebrow">Critical to understand</p>
            <h2 className="rules-section-h2">How Telegraph Works</h2>
          </Reveal>
          <div className="how-steps">
            {HOW_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="how-step">
                  <div className="how-step-num">{s.n}</div>
                  <div className="how-step-body">
                    <h3 className="how-step-title">{s.title}</h3>
                    <p className="how-step-desc">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Focus Areas */}
        <section className="rules-section">
          <Reveal>
            <p className="rules-section-eyebrow">Maximize your chances</p>
            <h2 className="rules-section-h2">High-Value Areas to Explore</h2>
            <p className="rules-body">Surface-level integrations will not stand out. The strongest submissions will come from teams that deeply understand and use the following areas.</p>
          </Reveal>
          <div className="focus-grid">
            {FOCUS_AREAS.map((f, i) => (
              <Reveal key={f.title} delay={i * 60}>
                <div className="focus-card">
                  <h3 className="focus-card-title">{f.title}</h3>
                  <p className="focus-card-body">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Schedule */}
        <section className="rules-section">
          <Reveal>
            <p className="rules-section-eyebrow">Timeline</p>
            <h2 className="rules-section-h2">Hackathon Structure</h2>
            <p className="rules-body">One hackathon, three interconnected tracks. Track 3 starts only after Track 1 and 2 close. Winners are announced once, after all tracks end.</p>
          </Reveal>
          <div className="track-table">
            {TRACKS.map((t, i) => (
              <Reveal key={t.track} delay={i * 60}>
                <div className="track-row">
                  <div className="track-row-dot" style={{ background: t.color }} />
                  <div className="track-row-name">{t.track}</div>
                  <div className="track-row-focus">{t.focus}</div>
                  <div className="track-row-dates">{t.dates}</div>
                  <div className="track-row-dur">{t.duration}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Judging */}
        <section className="rules-section">
          <Reveal>
            <p className="rules-section-eyebrow">How winners are chosen</p>
            <h2 className="rules-section-h2">Judging Criteria</h2>
          </Reveal>

          {/* Track tabs */}
          <Reveal>
            <div className="track-tabs">
              {TRACK_LABELS.map((l, i) => (
                <button
                  key={l}
                  className={`track-tab${activeTrack === i ? ' track-tab-on' : ''}`}
                  onClick={() => setActiveTrack(i as 0|1|2)}
                >
                  {l}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="criteria-list">
            {TRACK_CRITERIA[activeTrack].map((c, i) => (
              <CriteriaBar key={c.label} pct={c.pct} label={c.label} desc={c.desc} delay={i * 80} />
            ))}
          </div>

          {activeTrack === 0 && (
            <Reveal delay={200}>
              <div className="rules-info-box">
                <strong>How Miner Track Winners Are Selected</strong><br />
                Only the Top 3 miners overall (across all intents) will receive cash prizes from the $2,000 Miner Track pool. Actual Usage (25%) is scored per intent — miners are only ranked against others in the same domain on this metric.
              </div>
            </Reveal>
          )}
        </section>

        {/* Rules */}
        <section className="rules-section">
          <Reveal>
            <p className="rules-section-eyebrow">Non-negotiable</p>
            <h2 className="rules-section-h2">Important Rules</h2>
          </Reveal>
          <div className="rules-list">
            {RULES.map((r, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="rules-item">
                  <span className="rules-item-num">{String(i + 1).padStart(2, '0')}</span>
                  <p className="rules-item-text">{r}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Prizes */}
        <section className="rules-section">
          <Reveal>
            <p className="rules-section-eyebrow">What you can win</p>
            <h2 className="rules-section-h2">Prize Distribution</h2>
            <p className="rules-body">All prizes paid in USDC after final results are announced.</p>
          </Reveal>
          <div className="prizes-grid">
            {PRIZES.map((p, i) => (
              <Reveal key={p.track} delay={i * 80}>
                <div className="prize-card">
                  <p className="prize-track">{p.track}</p>
                  <p className="prize-total">{p.total}</p>
                  <div className="prize-places">
                    <div className="prize-place">
                      <span className="prize-medal prize-gold">1st</span>
                      <span className="prize-amount">{p.first}</span>
                    </div>
                    <div className="prize-place">
                      <span className="prize-medal prize-silver">2nd</span>
                      <span className="prize-amount">{p.second}</span>
                    </div>
                    <div className="prize-place">
                      <span className="prize-medal prize-bronze">3rd</span>
                      <span className="prize-amount">{p.third}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="prize-total-row">
              <span className="prize-total-label">Total Prize Pool</span>
              <span className="prize-total-val">$5,000 USDC</span>
            </div>
          </Reveal>
        </section>

        {/* Final note */}
        <section className="rules-section rules-final">
          <Reveal>
            <p className="rules-final-text">
              This hackathon is designed to test and prove Telegraph's core value proposition: a ranked, verified, and economically incentivized intelligence layer that gets stronger with real usage.
            </p>
            <p className="rules-final-text" style={{ marginTop: '16px', color: 'rgba(251,191,36,0.9)' }}>
              If you understand and believe in building a competitive intelligence layer for machines rather than another aggregator, we welcome you to participate.
            </p>
            <p className="rules-final-text" style={{ marginTop: '24px', fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
              Good luck.
            </p>
            <Link href="/" className="btn-register" style={{ display: 'inline-block', marginTop: '32px', textDecoration: 'none' }}>
              Register Now
            </Link>
          </Reveal>
        </section>

      </div>

      <footer className="rules-footer">
        <p>© 2026 Telegraph Protocol. All rights reserved.</p>
      </footer>

    </div>
  )
}
