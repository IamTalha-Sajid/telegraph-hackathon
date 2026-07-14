'use client'

interface Props { onRegister: () => void }

export default function Hero({ onRegister }: Props) {
  return (
    <section className="hero">
      <div className="hero-body">

        <div className="hero-eyebrow">Season I · 2026 · Open to Any Developer</div>

        <h1 className="hero-h1">Wrap any API, model, or service.</h1>

        <div className="hero-prize-badge">
          <span className="hero-prize-badge-label">Prize pool</span>
          <span className="hero-prize-badge-amount">$15,000 <span className="hero-prize-badge-unit">USDC</span></span>
        </div>

        <p className="hero-desc">
          Autonomous agents can't act on raw, unverified API responses — they need verifiable signals they can trust. Submit a Miner (any API, model, dataset, or tool), an evaluation script, or both. Winners decided on real performance against ground truth, not opinions.
        </p>

        <div className="hero-actions">
          <button className="btn-register hero-cta-primary" onClick={onRegister}>Register Now →</button>
          <a href="#how" className="btn-ghost">How It Works</a>
        </div>

        <p className="hero-social-proof">300+ builders have already registered</p>

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

      </div>

      <div className="hero-art" />

      <div className="scroll-hint">
        <div className="scroll-rail" />
        <span className="scroll-label">Scroll</span>
      </div>
    </section>
  )
}
