'use client'

interface Props { onRegister: () => void }

export default function Hero({ onRegister }: Props) {
  return (
    <section className="hero">
      <div className="hero-body">

        <div className="hero-eyebrow">Season I · 2026</div>

        <h1 className="hero-h1">Telegraph</h1>
        <p className="hero-h1-light">Hackathon</p>

        <p className="hero-desc">
          Mine inference. Rank quality. Build applications.
          Three tracks. One ecosystem. Real demand decides who wins.
        </p>

        <div className="hero-series-badge">
          <span className="hero-series-dot" />
          3-Hackathon Series — Up to $15K+ USDC &amp; Machina Rewards
        </div>

        <div className="hero-actions">
          <button className="btn-fill" onClick={onRegister}>Register Now</button>
          <a href="#how" className="btn-ghost">How It Works →</a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-val">3</span>
            <span className="hero-stat-label">Tracks</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-val">3</span>
            <span className="hero-stat-label">Rounds</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-val">Open</span>
            <span className="hero-stat-label">Eligibility</span>
          </div>
        </div>

        <div className="hero-meta-links">
          <a href="https://docs.telegraphprotocol.com/" target="_blank" rel="noopener noreferrer" className="hero-protocol-link">Docs ↗</a>
          <a href="https://github.com/telegraphprotocol/telegraph-usecases" target="_blank" rel="noopener noreferrer" className="hero-protocol-link">GitHub ↗</a>
          <a href="https://telegraphprotocol.com/" target="_blank" rel="noopener noreferrer" className="hero-protocol-link">telegraphprotocol.com ↗</a>
        </div>
      </div>

      <div className="hero-art" />

      <div className="scroll-hint">
        <div className="scroll-rail" />
        <span className="scroll-label">Scroll</span>
      </div>
    </section>
  )
}
