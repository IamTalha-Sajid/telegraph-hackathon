const STEPS = [
  {
    num: '01',
    title: 'Miners & Scripts Build First',
    body: 'Track 1 (Miners) and Track 2 (Script Authors) open in August. Miners wrap any API, model, dataset, or tool and integrate it into Telegraph. Script authors write evaluation scripts that score and rank them. Telegraph automatically runs the ranking.',
  },
  {
    num: '02',
    title: 'Applications Build on Top',
    body: 'Once Track 1 & 2 close, Track 3 opens. Application builders use live Telegraph Miners to build products, agents, automations, and workflows. Real Miners. Real answers. Real use cases.',
  },
  {
    num: '03',
    title: 'Demand Feeds Back to Miners',
    body: 'Miners are judged not just on benchmark performance, but on actual demand — which Miners are applications building with? The more useful your Miner, the more it gets consumed, and the better you rank.',
  },
]

export default function HowItWorks() {
  return (
    <section className="feature-section" id="how">
      <img
        src="/Website/telegraph_web_2.png"
        className="feature-bg feature-bg--how"
        alt=""
        aria-hidden="true"
      />

      <div className="feature-inner">
        <div className="sec-label">How it works</div>
        <h2 className="sec-title">A complete ecosystem.</h2>
        <p className="sec-sub">Not just infrastructure. A full cycle from Miner to application to demand.</p>

        <div className="card-grid">
          {STEPS.map(step => (
            <div key={step.num} className="card">
              <div className="card-idx">{step.num}</div>
              <div className="card-title">{step.title}</div>
              <div className="card-body">{step.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
