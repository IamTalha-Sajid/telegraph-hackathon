const RULES = [
  {
    num: '01',
    title: 'Open to Everyone',
    body: 'Anyone can participate — no experience requirements, no geographic restrictions. Solo or team, it does not matter. There is no limit on team size.',
  },
  {
    num: '02',
    title: 'Use Telegraph APIs',
    body: 'Your submission must integrate at least one Telegraph Miner API. The protocol is the foundation — build on top of it.',
  },
  {
    num: '03',
    title: 'Original Ideas Only',
    body: 'Do not copy or closely replicate the sample project. Your implementation must be your own original work.',
  },
  {
    num: '04',
    title: 'Public Repository',
    body: 'All code must be pushed to a public GitHub repository before the submission deadline. Private repos will not be considered.',
  },
]

export default function RulesSection() {
  return (
    <section className="rules-section" id="rules">
      <div className="rules-inner">
        <div className="sec-label">Rules</div>
        <h2 className="sec-title">Before you build.</h2>
        <p className="sec-sub">Four rules. Read them once, then go build something great.</p>

        <div className="card-grid rules-grid">
          {RULES.map(rule => (
            <div key={rule.num} className="card">
              <div className="card-idx">{rule.num}</div>
              <div className="card-title">{rule.title}</div>
              <div className="card-body">{rule.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
