const HACKATHONS = [
  {
    id: 'H1',
    label: 'Hackathon 1',
    dates: 'Early Aug – Mid Sep 2026',
    duration: '6 weeks',
    prize: '$5K USDC',
    prizeNote: 'USDC',
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
    prizeNote: 'USDC',
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
    prizeNote: 'Machina',
    focus: 'Full mainnet launch with real agent consumption and Machina incentives. Details announced closer to launch.',
    muted: true,
    comingSoon: true,
    bootstrapNote: false,
  },
]

const TRACKS = ['Model Track', 'Evaluation Track']

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

        <div className="series-grid">
          {HACKATHONS.map((h, i) => (
            <div
              key={h.id}
              className={`series-card${h.muted ? ' series-card-muted' : ''}`}
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              <div className="series-card-top">
                <span className="series-id">{h.id}</span>
                {h.comingSoon && (
                  <span className="series-coming-soon">
                    <span className="coming-soon-dot" />
                    Mainnet
                  </span>
                )}
              </div>

              <div className="series-label">{h.label}</div>

              <div className="series-prize-row">
                <div className="series-prize">{h.prize}</div>
                <span className="series-prize-tip" aria-label="Prize pool can be changed anytime before the hackathon begins">
                  ℹ
                  <span className="series-prize-tip-text">Prize pool can be changed anytime before the hackathon begins</span>
                </span>
              </div>
              <div className="series-prize-note">{h.prizeNote} prizes</div>

              <div className="series-dates">
                <span className="series-dates-val">{h.dates}</span>
                <span className="series-duration">· {h.duration}</span>
              </div>

              <div className="series-tracks">
                {TRACKS.map(t => (
                  <span key={t} className="series-track-pill">{t}</span>
                ))}
              </div>

              <div className="series-focus">{h.focus}</div>

              {h.bootstrapNote && (
                <div className="series-bootstrap-note">
                  USDC-based to bootstrap and test the system before Machina launch
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
