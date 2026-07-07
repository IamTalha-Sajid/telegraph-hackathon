const TRACKS = [
  {
    num: '01',
    label: 'Miner Track',
    title: 'Provide inference.',
    sub: 'Build and integrate models into Telegraph. You\'re the intelligence layer. Miners serve inference to the network and to applications built on top.',
    criteria: [
      'Telegraph ranking & performance',
      'Number of applications built on your miner',
      'Total inference consumed',
      'Progress updates posted on X',
      'Engagement & reach on those posts',
    ],
    timing: 'Aug 17 – Aug 31, 2026 · 15 days',
  },
  {
    num: '02',
    label: 'Script Author Track',
    title: 'Rank quality.',
    sub: 'Write evaluation scripts that score and rank miners. You define what "good" looks like. Your script becomes part of the protocol\'s quality layer.',
    criteria: [
      'Telegraph\'s automated eval of your script',
      'Accuracy of miner rankings produced',
      'Resistance to gaming',
      'Progress updates posted on X',
      'Community engagement & visibility',
    ],
    timing: 'Aug 17 – Aug 31, 2026 · 15 days',
  },
  {
    num: '03',
    label: 'Application Track',
    title: 'Drive demand.',
    sub: 'Build products, agents, automations, and workflows on top of Telegraph. Use live miners. Ship something real. This track only opens after miners and scripts are live.',
    criteria: [
      'Users acquired & activity',
      'Usage and adoption',
      'Creativity and usefulness',
      'Must use Telegraph miners',
      'Engagement on posts showcasing the project',
    ],
    timing: 'Aug 31 – Sep 7, 2026 · 7 days',
  },
]

export default function ApiSection() {
  return (
    <section className="feature-section" id="apis">
      <img
        src="/Website/telegraph_web_6.png"
        className="feature-bg feature-bg--api"
        alt=""
        aria-hidden="true"
      />

      <div className="feature-inner">
        <div className="sec-label">Tracks</div>
        <h2 className="sec-title">Three tracks. One ecosystem.</h2>
        <p className="sec-sub">
          Miners provide intelligence. Scripts rank quality. Applications drive demand and feed back into how miners are judged.
        </p>

        <div className="card-grid">
          {TRACKS.map((t) => (
            <div key={t.num} className="card card--detailed">
              <div className="card-idx">{t.num}</div>
              <div className="card-label">{t.label}</div>
              <div className="card-title">{t.title}</div>
              <div className="card-body">{t.sub}</div>
              <div className="card-meta">Judging criteria</div>
              <ul className="card-list">
                {t.criteria.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
