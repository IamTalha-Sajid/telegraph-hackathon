interface Props { onRegister: () => void }

export default function FinalCta({ onRegister }: Props) {
  return (
    <section className="feature-section feature-section--cta">
      <div className="feature-inner feature-inner--cta">
        <h2 className="sec-title">Ready to build?</h2>
        <p className="sec-sub">Pick a track, submit your entry, and compete for $15,000 USD.</p>
        <button className="btn-register" onClick={onRegister}>Register Now</button>
      </div>
    </section>
  )
}
