const HACKATHONS = [
  {
    id: 'H1',
    label: 'Hackathon 1',
    dates: 'Aug 17 – Sep 7, 2026',
    duration: '21 days',
    prize: '$5K USDC',
    focus: 'Register Miners and Script Authors, build initial APIs, models, and evaluation scripts, and test the ranking and evaluation flow.',
    muted: false,
    comingSoon: false,
    bootstrapNote: true,
  },
  {
    id: 'H2',
    label: 'Hackathon 2',
    dates: 'Mid October 2026',
    duration: '',
    prize: '$10K USDC',
    focus: 'Improve on Hackathon 1, attract more participants, and refine Miners and evaluation scripts.',
    muted: false,
    comingSoon: false,
    bootstrapNote: true,
  },
  {
    id: 'H3',
    label: 'Hackathon 3',
    dates: 'December 2026 onwards',
    duration: 'Mainnet',
    prize: '$Machina TBD',
    focus: 'Full mainnet launch with real agent consumption and Machina incentives. Details announced closer to launch.',
    muted: true,
    comingSoon: true,
    bootstrapNote: false,
  },
]

export default function HackathonSeries() {
  return (
    <section className="feature-section">
      <img
        src="/Website/telegraph_web_7.png"
        className="feature-bg feature-bg--series"
        alt=""
        aria-hidden="true"
      />
      <div className="feature-inner">
        <div className="sec-label">Season I</div>
        <h2 className="sec-title">A 3-hackathon series.</h2>
        <p className="sec-sub">
          Two USDC rounds to bootstrap and test the system, then a mainnet launch with Machina rewards.
        </p>

        <div className="card-grid">
          {HACKATHONS.map((h) => (
            <div
              key={h.id}
              className={`card card--detailed${h.muted ? ' card-muted' : ''}`}
            >
              <div className="card-idx">{h.id}</div>
              <div className="card-label">{h.label}</div>
              {h.comingSoon && (
                <span className="card-chip">
                  <span className="coming-soon-dot" />
                  Mainnet
                </span>
              )}
              <div className="card-title">{h.prize}</div>
              <div className="card-body">{h.focus}</div>
              <div className="card-foot">{h.dates}{h.duration ? ` · ${h.duration}` : ''}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
