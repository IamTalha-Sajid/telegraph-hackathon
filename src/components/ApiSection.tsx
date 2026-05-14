export default function ApiSection() {
  return (
    <section className="api-section" id="apis">
      <img
        src="/Website/telegraph_web_6.png"
        className="api-bg"
        alt=""
        aria-hidden="true"
      />

      <div className="api-inner">
        <div className="api-panels">

          <div className="api-panel">
            <div className="sec-label">Available Subnets</div>
            <h2 className="sec-title">The signal you need.</h2>
            <p className="sec-sub">
              All subnets are live, verified, and ready to query via a single endpoint.
              Integration details and full documentation are coming soon.
            </p>
            <div className="coming-soon">
              <span className="coming-soon-dot" />
              Subnet docs dropping soon
            </div>
          </div>

          <div className="api-spacer" />

          <div className="api-panel">
            <div className="sec-label">Prizes</div>
            <h2 className="sec-title">Win for building real things.</h2>
            <p className="sec-sub">
              Prize pool and judging criteria to be announced. We reward products that
              genuinely use Telegraph's verified inference layer to ship real things.
            </p>
            <div className="coming-soon">
              <span className="coming-soon-dot" />
              Prize pool to be announced
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
