'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

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

const TRACKS = [
  { track: 'Track 1: Miners',        focus: 'Building and running high-quality miners',              dates: 'Aug 17 – Aug 31', duration: '15 days', color: '#86efac' },
  { track: 'Track 2: Script Authors', focus: 'Writing and improving evaluation scripts',              dates: 'Aug 17 – Aug 31', duration: '15 days', color: '#86efac' },
  { track: 'Track 3: Applications',  focus: 'Building real applications and agents using Telegraph',  dates: 'Aug 31 – Sep 7',  duration: '7 days',  color: '#60a5fa' },
  { track: 'Winner Selection',       focus: 'Selecting winners across all 3 tracks',                 dates: 'Sep 8 – Sep 18',  duration: '10 days', color: '#a78bfa' },
  { track: 'Announcement & Prizes',  focus: 'Announce winners and distribute prizes',                dates: 'Sep 19 – Sep 25', duration: '7 days',  color: '#fbbf24' },
]

const MINER_CRITERIA = [
  { pct: 75, label: 'Normalized Performance (within Intent)', desc: 'Your average Canonical Score divided by the highest average score achieved inside your specific Intent. The best miner in every Intent automatically gets full points — ensuring fairness across Intents of different difficulty.' },
  { pct: 25, label: 'Engagement & Updates on X',              desc: 'Quality, consistency, reach, and meaningful engagement of updates posted on X. Tag @Telegraphprotoc in all update posts.' },
]
const SCRIPT_CRITERIA = [
  { pct: 50, label: 'Improvement over Baseline',          desc: 'How accurately and effectively the script evaluates miner outputs vs the current Canonical Script.' },
  { pct: 30, label: 'Robustness & Code Quality',          desc: 'Clean code structure, proper handling of edge cases, and adherence to WASM/sandbox constraints.' },
  { pct: 10, label: 'Engagement & Updates on X',          desc: 'Quality, consistency, reach, and engagement of updates posted on X. Tag @Telegraphprotoc in all update posts.' },
  { pct: 10, label: 'Community Engagement & Adoption',    desc: 'Mentions, feedback, and actual adoption of your script by others.' },
]
const APP_CRITERIA = [
  { pct: 45, label: 'Real Usage & Adoption',                        desc: 'Number of real users + actual volume of Telegraph calls made by your application.' },
  { pct: 25, label: 'Usefulness, Creativity & Depth of Integration', desc: 'How useful and creative the application is, and how deeply it leverages Telegraph\'s intelligence layer (off-chain and on-chain).' },
  { pct: 25, label: 'Engagement & Updates on X',                    desc: 'Quality, reach, and meaningful engagement of updates posted on X. Tag @Telegraphprotoc in all update posts.' },
  { pct: 5,  label: 'Technical Execution & Integration Quality',     desc: 'Cleanliness and reliability of the integration with Telegraph.' },
]

const PRIZES = [
  { track: 'Miner Track',         total: '$2,000', first: '$1,000', second: '$600', third: '$400' },
  { track: 'Script Author Track', total: '$1,000', first: '$500',   second: '$300', third: '$200' },
  { track: 'Application Track',   total: '$2,000', first: '$1,000', second: '$600', third: '$400' },
]

const HOW_STEPS = [
  { n: '01', title: 'Miners Are Ranked, Not Just Listed', body: 'Anyone can bring their model, data source, or specialized system into Telegraph as a miner. Miners are ranked based on performance, domain relevance, and historical quality. Validators continuously evaluate miner outputs against ground truth using evaluation scripts. Higher and more consistent performance leads to a higher rank on the leaderboard.' },
  { n: '02', title: 'Probabilistic Routing Based on Intent', body: 'When an agent needs intelligence, it does not choose a specific miner. Instead, it declares its intent — the domain (e.g. AI detection, weather, finance), a minimum confidence threshold, and a deadline. Telegraph routes probabilistically to the top-ranked miners for that intent. Higher-performing miners receive more traffic and more USDC per query.' },
  { n: '03', title: 'The Quality Flywheel', body: 'Better miners → more routed demand → more real USDC earnings → stronger earnings attract better miners → network compounds in quality, reliability, and coverage. Fundamentally different from simple aggregator models.' },
  { n: '04', title: 'Independent Leaderboards per Intent', body: 'Each intent (e.g. AI text detection) has its own independent leaderboard. Miners are only ranked against others in the same domain. Miners solving completely different tasks do not affect your ranking or routing share. This ensures fair competition within each domain.' },
  { n: '05', title: 'Why This Architecture Matters', body: 'Simple aggregator approaches lack ranking, verification, probabilistic routing, and the incentive flywheel that turns raw model output into reliable, monetizable, machine-grade intelligence. Telegraph is designed to become stronger with real usage, not weaker.' },
]

const FOCUS_AREAS = [
  { title: 'On-Chain & Blockchain Intelligence Pipelines',   body: 'Build agents that consume verified intelligence and directly trigger on-chain actions — trading, liquidations, arbitrage, compliance checks, treasury management. One of the highest-value use cases.' },
  { title: 'Autonomous Agents & Workflows',                   body: 'Build agents that subscribe to real-time signals and take automated actions without human intervention.' },
  { title: 'Multi-Intent & Cross-Domain Intelligence',        body: 'Combine signals from multiple intents to create more powerful decision-making systems.' },
  { title: 'Confidence Thresholds & Routing Behavior',        body: 'Experiment with different confidence levels and understand how routing changes based on requirements.' },
  { title: 'Signal Quality & Verification',                   body: 'Deeply understand how validators score outputs and how this affects reliability for downstream applications.' },
  { title: 'Real-Time Streaming & Persistent Intelligence',   body: 'Move beyond one-off queries and build systems that continuously consume and act on live intelligence feeds.' },
]

const RULES = [
  'Applications in Track 3 must use real Telegraph miners. Simulated or mocked data is not allowed.',
  'Miners and Script Authors must remain live and operational throughout Track 3.',
  'All updates used for judging must be publicly posted on X and properly tagged.',
  'Artificial inflation of metrics or gaming the system will result in disqualification.',
  'Each intent operates with its own independent leaderboard. You only compete with miners in the same domain for Normalized Performance scoring. Cash prizes are awarded to the Top 3 miners with the highest overall normalized scores across all intents.',
  'All participants must join the official Hackathon Discord. Important discussions, announcements, and support will happen there. Staying active in the Discord is expected.',
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
        <div className="criteria-fill" style={{ width: vis ? `${pct}%` : '0%' }} />
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

      <nav className="rules-nav">
        <Link href="/" className="rules-nav-logo">
          <img src="/Telegraoh-Logo.png" alt="" className="nav-logo-img" />
          <span className="nav-logo-text">TELEGRAPH</span>
        </Link>
        <span className="nav-badge">Hackathon</span>
        <div style={{ flex: 1 }} />
        <Link href="/" className="rules-nav-back">← Back to site</Link>
      </nav>

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
            <p className="rules-body">The main objective is to prove that Telegraph's intelligence layer and quality flywheel work in real conditions.</p>
          </Reveal>
          <div className="purpose-list">
            {[
              'Miners can be properly ranked based on real performance.',
              'Real demand from applications gets routed to better miners through probabilistic routing.',
              'This ranking and routing system creates a self-reinforcing loop where quality compounds over time.',
              'The result is a competitive, high-quality intelligence layer that gets stronger with usage.',
            ].map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="purpose-item">
                  <span className="purpose-check">✓</span>
                  <p>{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="rules-body" style={{ marginTop: '24px' }}>
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

          {/* What is an Intent */}
          <Reveal delay={80}>
            <div className="intent-box">
              <p className="intent-box-label">What is an Intent?</p>
              <p className="intent-box-body">
                An Intent is a specific category of intelligence that applications can request — for example, AI text detection, weather data, financial signals, or logistics information. Each intent operates with its own independent leaderboard. You only compete with miners in the same domain for Normalized Performance scoring.
              </p>
            </div>
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
            <p className="rules-body">Surface-level integrations will not stand out. The strongest submissions come from teams that deeply understand and leverage Telegraph's full capability as an intelligence layer — not just an API.</p>
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

          {/* Track 1 winner selection */}
          {activeTrack === 0 && (
            <Reveal delay={200}>
              <div className="rules-info-box" style={{ marginTop: '32px' }}>
                <strong>How Miner Track Winners Are Selected</strong>
                <p style={{ marginTop: '10px' }}>Winners are determined using <em>Intradomain Normalization</em> to ensure fairness across intents of different difficulty and volume.</p>
                <p style={{ marginTop: '8px' }}>Every miner is scored out of 100 points:</p>
                <ul className="info-box-list">
                  <li><strong>75 points</strong> — Normalized Performance (your score relative to the best miner in your specific Intent)</li>
                  <li><strong>25 points</strong> — X Engagement & Transparency</li>
                </ul>
                <p style={{ marginTop: '10px', color: 'rgba(251,191,36,0.7)', fontSize: '12px' }}>
                  Guardrail: An Intent must have at least 3 active miners and receive at least 100 real requests from Track 3 applications to be eligible for global cash prizes.
                </p>
                <p style={{ marginTop: '10px' }}>The Top 3 miners with the highest total normalized scores across all intents win cash prizes. This ensures the best miner in every intent has a fair chance to win, regardless of how strict or easy their intent's Canonical Script is.</p>
              </div>
            </Reveal>
          )}

          {/* Track 2 canonical script explainer */}
          {activeTrack === 1 && (
            <Reveal delay={200}>
              <div className="rules-info-box" style={{ marginTop: '32px' }}>
                <strong>What is the Canonical Script?</strong>
                <p style={{ marginTop: '10px' }}>For each Intent, the protocol has one official evaluation script called the Canonical Script. This is the current benchmark used to score miner responses for that Intent.</p>
                <p style={{ marginTop: '8px' }}>In Track 2, participants submit improved evaluation scripts, reviewed against the current Canonical Script to measure improvement in accuracy, robustness, and code quality.</p>
                <p style={{ marginTop: '8px', color: 'rgba(134,239,172,0.7)', fontSize: '12px' }}>The current Canonical Script for each participating Intent will be shared in the official hackathon repository before the hackathon starts.</p>
                <p style={{ marginTop: '10px' }}>The Top 3 scripts with the highest overall scores win the global cash prizes ($500 / $300 / $200). Winners are determined through a focused manual review by the core team.</p>
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
