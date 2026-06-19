const ITEMS = [
  'Telegraph Hackathon Season I',
  '3-Hackathon Series',
  'Aug – Sep 2026',
  'Oct – Nov 2026',
  'Mainnet Dec 2026',
  '$5K – $7K USDC',
  '$10K USDC',
  'Machina Rewards',
  'ML Engineers & Quants',
  'Model Track',
  'Evaluation Track',
  'Community Judging',
  'Signal Intelligence',
  'Anomaly Detection',
  'Price Prediction',
  'Weather Forecasting',
  'Submit Model + Eval Script',
  'Built on Telegraph Protocol',
]

function Segment({ id }: { id: number }) {
  return (
    <span className="ticker-seg" aria-hidden={id > 0}>
      {ITEMS.map((item, i) => (
        <span key={i}>
          {item}
          <span className="ticker-dot">·</span>
        </span>
      ))}
    </span>
  )
}

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        <Segment id={0} />
        <Segment id={1} />
      </div>
    </div>
  )
}
