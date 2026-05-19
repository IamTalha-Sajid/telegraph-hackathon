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
            <div className="sec-label">Model Track</div>
            <h2 className="sec-title">Build the best model.</h2>
            <p className="sec-sub">
              Pick a task and submit a model that solves it. Every model in the competition
              gets scored by every evaluation script. The one that scores highest overall wins.
            </p>
            <div className="coming-soon">
              <span className="coming-soon-dot" />
              Allowed tasks dropping soon
            </div>
          </div>

          <div className="api-spacer" />

          <div className="api-panel">
            <div className="sec-label">Evaluation Track</div>
            <h2 className="sec-title">Write the best eval.</h2>
            <p className="sec-sub">
              Submit a script that scores models on your chosen task. The best eval scripts
              correctly rank good models above bad ones and are hard to game. This track
              has its own prize — separate from the model track.
            </p>
            <div className="coming-soon">
              <span className="coming-soon-dot" />
              Submission format dropping soon
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
