'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
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

type Intent = {
  track: string
  category: string
  name: string
  gt: string
  tier: 'A' | 'B'
  mechanism: string
  useCase: string
}

const INTENTS: Intent[] = [
  { track: '1. Financial & On-Chain', category: 'Financial Data',   name: 'STOCK_PRICE',            gt: 'no deterministic gt',  tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'Trading bots; Portfolio rebalancers' },
  { track: '1. Financial & On-Chain', category: 'Financial Data',   name: 'CRYPTO_PRICE',           gt: 'no deterministic gt',  tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'DeFi agents; Arbitrage bots' },
  { track: '1. Financial & On-Chain', category: 'Financial Data',   name: 'FINANCIAL_DATA',         gt: 'deterministic gt',     tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'Corporate analysis agents' },
  { track: '1. Financial & On-Chain', category: 'Financial Data',   name: 'CURRENCY_EXCHANGE',      gt: 'no deterministic gt',  tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'Cross-border payment bots' },
  { track: '1. Financial & On-Chain', category: 'On-Chain Analytics', name: 'WALLET_BALANCE_CHECK', gt: 'no deterministic gt',  tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'Whale tracking agents' },
  { track: '1. Financial & On-Chain', category: 'On-Chain Analytics', name: 'GAS_PRICE',            gt: 'no deterministic gt',  tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'Transaction optimization bots' },
  { track: '1. Financial & On-Chain', category: 'On-Chain Analytics', name: 'TOKEN_HOLDER_COUNT',   gt: 'no deterministic gt',  tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'Tokenomics analysis agents' },
  { track: '1. Financial & On-Chain', category: 'On-Chain Analytics', name: 'TVL_LOOKUP',           gt: 'no deterministic gt',  tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'DeFi risk assessment bots' },
  { track: '1. Financial & On-Chain', category: 'On-Chain Analytics', name: 'ONCHAIN_TX_LOOKUP',    gt: 'deterministic gt',     tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'Smart contract auditing agents' },
  { track: '2. Real-Time Web & Research', category: 'Weather & Sports', name: 'WEATHER_CHECK',      gt: 'no deterministic gt',  tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'Travel and logistics agents' },
  { track: '2. Real-Time Web & Research', category: 'Weather & Sports', name: 'STORM_ALERT',        gt: 'no deterministic gt',  tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'Risk management agents' },
  { track: '2. Real-Time Web & Research', category: 'Weather & Sports', name: 'WEATHER_FORECAST',   gt: 'no deterministic gt',  tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'Supply chain forecasting bots' },
  { track: '2. Real-Time Web & Research', category: 'Weather & Sports', name: 'SPORTS_SCORE',       gt: 'no deterministic gt',  tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'Sports betting/prediction agents' },
  { track: '2. Real-Time Web & Research', category: 'Weather & Sports', name: 'GAME_RESULT',        gt: 'no deterministic gt',  tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'Sports betting/prediction agents' },
  { track: '2. Real-Time Web & Research', category: 'Utilities & Security', name: 'SSL_VERIFICATION', gt: 'deterministic gt',   tier: 'A', mechanism: 'WASM Exact Match',       useCase: 'Automated infra monitoring' },
  { track: '2. Real-Time Web & Research', category: 'Utilities & Security', name: 'CVE_LOOKUP',       gt: 'no deterministic gt', tier: 'A', mechanism: 'WASM Exact Match',      useCase: 'Security patching agents' },
  { track: '2. Real-Time Web & Research', category: 'Utilities & Security', name: 'IP_GEOLOCATION',   gt: 'no deterministic gt', tier: 'A', mechanism: 'WASM Exact Match',      useCase: 'Traffic routing agents' },
  { track: '2. Real-Time Web & Research', category: 'Utilities & Security', name: 'URL_SCAN',         gt: 'deterministic gt',    tier: 'A', mechanism: 'WASM Exact Match',      useCase: 'Safe browsing bots' },
  { track: '2. Real-Time Web & Research', category: 'Search', name: 'WEB_SEARCH',                   gt: 'no deterministic gt',  tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'General research agents; Scrapers' },
  { track: '2. Real-Time Web & Research', category: 'Search', name: 'NEWS_HEADLINES',                gt: 'no deterministic gt',  tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'News trading algorithms' },
  { track: '2. Real-Time Web & Research', category: 'Search', name: 'NEWS_SEARCH',                   gt: 'no deterministic gt',  tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Due diligence agents' },
  { track: '2. Real-Time Web & Research', category: 'Search', name: 'RESEARCH_SYNTHESIS',            gt: 'no deterministic gt',  tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Academic/Corporate research bots' },
  { track: '2. Real-Time Web & Research', category: 'Search', name: 'RESEARCH_QUERY',                gt: 'no deterministic gt',  tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Deep-dive analysis agents' },
  { track: '2. Real-Time Web & Research', category: 'Search', name: 'ACADEMIC_SEARCH',               gt: 'no deterministic gt',  tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Thesis generating bots' },
  { track: '2. Real-Time Web & Research', category: 'Search', name: 'FACT_CHECK',                    gt: 'no deterministic gt',  tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Misinformation filtering agents' },
  { track: '2. Real-Time Web & Research', category: 'Search', name: 'TWITTER_SEARCH',                gt: 'no deterministic gt',  tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Social sentiment tracking agents' },
  { track: '3. AI Reasoning & Content', category: 'AI / Chat', name: 'LANGUAGE_GENERATION',          gt: 'deterministic gt',     tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Creative writing agents' },
  { track: '3. AI Reasoning & Content', category: 'AI / Chat', name: 'CHAT_COMPLETION',               gt: 'deterministic gt',     tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Customer support bots' },
  { track: '3. AI Reasoning & Content', category: 'AI / Chat', name: 'TEXT_GENERATION',               gt: 'deterministic gt',     tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Automated blogging agents' },
  { track: '3. AI Reasoning & Content', category: 'AI / Chat', name: 'TASK_COMPLETION',               gt: 'deterministic gt',     tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Autonomous personal assistants' },
  { track: '3. AI Reasoning & Content', category: 'AI / Chat', name: 'AGENT_TASK',                    gt: 'no gt',                tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Multi-step autonomous agents' },
  { track: '3. AI Reasoning & Content', category: 'Text Analysis', name: 'SENTIMENT_ANALYSIS',        gt: 'deterministic gt',     tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Brand monitoring bots' },
  { track: '3. AI Reasoning & Content', category: 'Text Analysis', name: 'TEXT_CLASSIFICATION',       gt: 'deterministic gt',     tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Support ticket routing agents' },
  { track: '3. AI Reasoning & Content', category: 'Text Analysis', name: 'CONTENT_MODERATION',        gt: 'deterministic gt',     tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Community safety bots' },
  { track: '3. AI Reasoning & Content', category: 'Text Analysis', name: 'CONTENT_VERIFICATION',      gt: 'deterministic gt',     tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Plagiarism checking agents' },
  { track: '3. AI Reasoning & Content', category: 'Text Analysis', name: 'AI_TEXT_DETECTION',         gt: 'deterministic gt',     tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Academic integrity agents' },
  { track: '3. AI Reasoning & Content', category: 'Text Analysis', name: 'TEXT_AUTHENTICITY_CHECK',   gt: 'deterministic gt',     tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'SEO quality control bots' },
  { track: '3. AI Reasoning & Content', category: 'Text Analysis', name: 'CONTENT_EXTRACTION',        gt: 'deterministic gt',     tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Data ingestion pipelines' },
  { track: '3. AI Reasoning & Content', category: 'Text Analysis', name: 'LANGUAGE_TRANSLATION',      gt: 'deterministic gt',     tier: 'B', mechanism: 'LLM Context + WASM',      useCase: 'Real-time localization agents' },
  { track: 'Other', category: 'Risk & Trust', name: 'FRAUD_DETECTION',                                gt: 'unspecified',          tier: 'B', mechanism: 'unspecified',              useCase: 'Risk & trust agents' },
]

const TRACKS = ['All', ...Array.from(new Set(INTENTS.map(i => i.track)))]

const TRACK_COLOR: Record<string, string> = {
  '1. Financial & On-Chain': '#86efac',
  '2. Real-Time Web & Research': '#60a5fa',
  '3. AI Reasoning & Content': '#a78bfa',
  'Other': '#fbbf24',
}

function IntentCard({ intent, delay }: { intent: Intent; delay: number }) {
  const color = TRACK_COLOR[intent.track] ?? '#fbbf24'
  return (
    <Reveal delay={delay} className="intent-card-wrap">
      <div className="intent-card" style={{ ['--intent-color' as any]: color }}>
        <div className="intent-card-top">
          <span className="intent-card-tier" data-tier={intent.tier}>Tier {intent.tier}</span>
          <span className="intent-card-cat">{intent.category}</span>
        </div>
        <h3 className="intent-card-name">{intent.name}</h3>
        <p className="intent-card-use">{intent.useCase}</p>
        <div className="intent-card-foot">
          <span className="intent-card-mech">{intent.mechanism}</span>
          <span className={`intent-card-gt${intent.gt.startsWith('deterministic') ? ' intent-card-gt-on' : ''}`}>
            {intent.gt === 'unspecified' ? 'GT: TBD' : intent.gt === 'no gt' ? 'No GT' : intent.gt.replace(' gt', '')}
          </span>
        </div>
      </div>
    </Reveal>
  )
}

export default function SupportedIntentsPage() {
  const [track, setTrack] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return INTENTS.filter(i => {
      const matchesTrack = track === 'All' || i.track === track
      const matchesQuery = !q ||
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.useCase.toLowerCase().includes(q)
      return matchesTrack && matchesQuery
    })
  }, [track, query])

  const grouped = useMemo(() => {
    const map = new Map<string, Intent[]>()
    for (const i of filtered) {
      const key = i.category
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(i)
    }
    return Array.from(map.entries())
  }, [filtered])

  const tierACount = INTENTS.filter(i => i.tier === 'A').length
  const tierBCount = INTENTS.filter(i => i.tier === 'B').length

  return (
    <div className="rules-page">

      <nav className="rules-nav">
        <Link href="/" className="rules-nav-logo">
          <img src="/Telegraoh-Logo.png" alt="" className="nav-logo-img" />
          <span className="nav-logo-text">TELEGRAPH</span>
        </Link>
        <span className="nav-badge">Hackathon</span>
        <div style={{ flex: 1 }} />
        <Link href="/rules" className="rules-nav-back">Rules</Link>
        <Link href="/" className="rules-nav-back">← Back to site</Link>
      </nav>

      <header className="rules-hero">
        <Reveal>
          <p className="rules-eyebrow">Intent Catalog</p>
          <h1 className="rules-h1">Supported<br />Intents</h1>
          <p className="rules-hero-sub">
            {INTENTS.length} intents across three tracks — the intelligence domains Miners can serve and applications can request.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="intents-stat-row">
            <div className="intents-stat">
              <span className="intents-stat-val">{INTENTS.length}</span>
              <span className="intents-stat-label">Total Intents</span>
            </div>
            <div className="intents-stat">
              <span className="intents-stat-val" style={{ color: 'rgba(134,239,172,0.9)' }}>{tierACount}</span>
              <span className="intents-stat-label">Tier A · Deterministic</span>
            </div>
            <div className="intents-stat">
              <span className="intents-stat-val" style={{ color: 'rgba(96,165,250,0.9)' }}>{tierBCount}</span>
              <span className="intents-stat-label">Tier B · LLM-Judge</span>
            </div>
          </div>
        </Reveal>
      </header>

      <div className="rules-content">

        <section className="rules-section" style={{ borderTop: 'none', paddingTop: 0 }}>
          <Reveal>
            <div className="intents-controls">
              <input
                className="intents-search"
                type="text"
                placeholder="Search intents, categories, use cases…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <div className="track-tabs" style={{ margin: 0 }}>
                {TRACKS.map(t => (
                  <button
                    key={t}
                    className={`track-tab${track === t ? ' track-tab-on' : ''}`}
                    onClick={() => setTrack(t)}
                  >
                    {t === 'All' ? 'All Tracks' : t}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {grouped.length === 0 && (
            <Reveal delay={100}>
              <p className="rules-body" style={{ marginTop: '32px' }}>No intents match your search.</p>
            </Reveal>
          )}

          {grouped.map(([category, items], gi) => (
            <div key={category} className="intents-group">
              <Reveal delay={gi * 40}>
                <div className="intents-group-head">
                  <h2 className="intents-group-title">{category}</h2>
                  <span className="intents-group-count">{items.length}</span>
                </div>
              </Reveal>
              <div className="intent-grid">
                {items.map((i, idx) => (
                  <IntentCard key={i.name} intent={i} delay={idx * 40} />
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="rules-section rules-final">
          <Reveal>
            <p className="rules-final-text">
              Building a Miner or an application around one of these intents? Check the hackathon rules to see how it fits into the tracks and prize pools.
            </p>
            <Link href="/rules" className="btn-register" style={{ display: 'inline-block', marginTop: '32px', textDecoration: 'none' }}>
              View Hackathon Rules
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
