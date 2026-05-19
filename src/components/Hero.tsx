interface Props { onRegister: () => void }

export default function Hero({ onRegister }: Props) {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="hero-eyebrow">Season I · 2026</div>
        <h1 className="hero-h1">Telegraph</h1>
        <p className="hero-h1-light">Hackathon</p>
        <p className="hero-desc">
          Pick a task. Build a model. Write an evaluation.
          The community decides who wins. USDC prizes across two tracks.
        </p>
        <div className="hero-actions">
          <button className="btn-fill" onClick={onRegister}>Register Now</button>
          <a href="#how" className="btn-ghost">How It Works →</a>
        </div>
        <div className="hero-meta-links">
          <a href="https://telegraph-2.gitbook.io/telegraph" target="_blank" rel="noopener noreferrer" className="hero-protocol-link">Docs ↗</a>
          <a href="https://github.com/telegraphprotocol" target="_blank" rel="noopener noreferrer" className="hero-protocol-link">GitHub ↗</a>
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
