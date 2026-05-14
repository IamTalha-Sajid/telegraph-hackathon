const STEPS = [
  {
    num: '01',
    title: 'Choose a Subnet',
    body: "Browse Telegraph's available inference subnets. Each subnet is a verified, payable intelligence feed — from weather signals to financial data and beyond.",
  },
  {
    num: '02',
    title: 'Pay via x402',
    body: 'Request inference and pay in USDC using the x402 HTTP standard. No blockchain expertise required — integrate it exactly like any Web2 API.',
  },
  {
    num: '03',
    title: 'Ship Your Product',
    body: 'Build any application on top of cryptographically verified intelligence. Autonomous agents, dashboards, trading bots, prediction markets — anything goes.',
  },
]

export default function HowItWorks() {
  return (
    <section className="how-section" id="how">
      <img
        src="/Website/telegraph_web_2.png"
        className="how-bg"
        alt=""
        aria-hidden="true"
      />

      <div className="how-inner">
        <div className="sec-label">How it works</div>
        <h2 className="sec-title">Build in three steps.</h2>
        <p className="sec-sub">Access verified intelligence, pay with USDC, ship a real product.</p>

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
