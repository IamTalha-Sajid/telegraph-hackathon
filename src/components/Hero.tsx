interface Props { onRegister: () => void }

export default function Hero({ onRegister }: Props) {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="hero-eyebrow">Season I · 2026</div>
        <h1 className="hero-h1">Telegraph</h1>
        <p className="hero-h1-light">Hackathon</p>
        <p className="hero-desc">
          Plug into Telegraph's verified AI inference subnets, pay via x402,
          and build real applications on the machine intelligence protocol.
          The best products win.
        </p>
        <div className="hero-actions">
          <button className="btn-fill" onClick={onRegister}>Start Building</button>
          <button className="btn-ghost">Explore APIs →</button>
        </div>
        <a
          href="https://telegraphprotocol.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-protocol-link"
        >
          telegraphprotocol.com ↗
        </a>
      </div>

      <div className="hero-art" />

      <div className="scroll-hint">
        <div className="scroll-rail" />
        <span className="scroll-label">Scroll</span>
      </div>
    </section>
  )
}
