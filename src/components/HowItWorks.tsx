const STEPS = [
  {
    num: '01',
    title: 'Choose Your Task',
    body: 'Pick a problem you want to solve — forecasting, anomaly detection, prediction, or anything within the allowed use cases. Use the reference dataset to get oriented and start building.',
  },
  {
    num: '02',
    title: 'Submit Your Work',
    body: 'Submit a model that tackles your task, an evaluation script that scores it, or both. Each track is judged independently — you can win one, the other, or both.',
  },
  {
    num: '03',
    title: 'Community Decides',
    body: 'Every model is tested against every evaluation script. The model that scores best across all evals wins the Model Track. The eval script that most accurately ranks models wins the Eval Track.',
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
        <h2 className="sec-title">Simple as three steps.</h2>
        <p className="sec-sub">Choose a task, submit your work, let the community decide who wins.</p>

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
