const HACKATHONS = [
  {
    id: 'H1',
    label: 'Hackathon 1',
    dates: 'Early Aug – Mid Sep 2026',
    duration: '6 weeks',
    prize: '$5K USDC',
    focus: 'Register miners and script authors, build initial models and evaluation scripts, and test the ranking and evaluation flow.',
    muted: false,
    comingSoon: false,
    bootstrapNote: true,
  },
  {
    id: 'H2',
    label: 'Hackathon 2',
    dates: 'Early Oct – Mid Nov 2026',
    duration: '6 weeks',
    prize: '$10K USDC',
    focus: 'Improve on Hackathon 1, attract more participants, and refine models and evaluation scripts.',
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

const TRACKS = ['Miner Track', 'Script Author Track', 'Application Track']

export default function HackathonSeries() {
  return (
    <section className="series-section">
      <img
        src="/Website/telegraph_web_7.png"
        className="series-bg"
        alt=""
        aria-hidden="true"
      />
      <div className="series-inner">
        <div className="sec-label">Season I</div>
        <h2 className="sec-title">A 3-hackathon series.</h2>
        <p className="sec-sub">
          Two USDC rounds to bootstrap and test the system, then a mainnet launch with Machina rewards.
        </p>

        <div className="tracks-grid">
          {HACKATHONS.map((h) => (
            <div
              key={h.id}
              className={`track-card${h.muted ? ' track-card-muted' : ''}`}
            >
              <div className="track-card-num">{h.id}</div>
              <div className="sec-label" style={{ marginBottom: 0 }}>{h.label}</div>
              {h.comingSoon && (
                <span className="track-card-chip">
                  <span className="coming-soon-dot" />
                  Mainnet
                </span>
              )}
              <h3 className="track-card-title">{h.prize}</h3>
              <p className="track-card-body">{h.focus}</p>
              <div className="track-criteria-label">Tracks</div>
              <ul className="track-criteria">
                {TRACKS.map(t => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="track-timing">{h.dates} · {h.duration}</div>
              {h.bootstrapNote && (
                <p className="track-card-footnote">
                  USDC-based to bootstrap and test the system before Machina launch
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
