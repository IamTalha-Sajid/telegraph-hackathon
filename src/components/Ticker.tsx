const ITEMS = [
  'Telegraph Protocol',
  'Built on Base',
  'Verified AI Inference',
  'x402 Payments',
  'Machina Token',
  'Permissionless',
  'zkTLS Proof of Truth',
  'Machine Intelligence Marketplace',
  'Open Source',
  'BFT Consensus',
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
