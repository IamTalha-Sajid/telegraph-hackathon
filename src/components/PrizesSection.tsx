const PRIZES = [
  {
    round: 'Round 1',
    dates: 'Early Aug – Mid Sep 2026',
    amount: '$5K USD',
    note: 'Miner, Script Author & Application tracks',
  },
  {
    round: 'Round 2',
    dates: 'Early Oct – Mid Nov 2026',
    amount: '$10K USD',
    note: 'Miner, Script Author & Application tracks',
  },
  {
    round: 'Round 3',
    dates: 'December 2026+',
    amount: 'TBD',
    note: 'Full mainnet launch — details announced closer to launch',
    muted: true,
  },
]

export default function PrizesSection() {
  return (
    <section className="section" id="prizes">
      <div className="sec-label">Prizes</div>
      <h2 className="sec-title">Three rounds. Real rewards.</h2>
      <p className="sec-sub">
        Two USD rounds to bootstrap the system, then a mainnet launch with rewards TBD.
        Submit a Miner (any API, model, dataset, or tool), an evaluation script, or both — you can win across tracks.
      </p>

      <div className="prizes-grid">
        {PRIZES.map((p) => (
          <div key={p.round} className={`prize-card${p.muted ? ' card-muted' : ''}`}>
            <div className="prize-round">{p.round}</div>
            <div className="prize-amount">{p.amount}</div>
            <div className="prize-note">{p.note}</div>
            <div className="prize-dates">{p.dates}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
