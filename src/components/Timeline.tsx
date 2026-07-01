'use client'

const PHASE1_START = new Date('2026-08-17T00:00:00Z').getTime()
const PHASE1_END   = new Date('2026-08-31T00:00:00Z').getTime()
const PHASE2_END   = new Date('2026-09-07T00:00:00Z').getTime()

export default function Timeline() {
  const now      = Date.now()
  const regStart = now // registration opens from the day user visits

  const total      = PHASE2_END - regStart
  const regWidth   = Math.max(((PHASE1_START - regStart) / total) * 100, 0)
  const track1Width = ((PHASE1_END - PHASE1_START) / total) * 100
  const track2Width = ((PHASE2_END - PHASE1_END)   / total) * 100

  // progress node position across the full bar
  const progress   = Math.min(Math.max(((now - regStart) / total) * 100, 0), 100)
  const nodeLeft   = `calc(${progress}% - 7px)`

  const regDays    = Math.ceil((PHASE1_START - now) / (1000 * 60 * 60 * 24))

  return (
    <section className="timeline-section">
      <div className="timeline-inner">
        <div className="sec-label">Schedule</div>
        <h2 className="sec-title">When to build.</h2>

        <div className="tl-wrap">

          {/* Labels row */}
          <div className="tl-labels">
            <div className="tl-label-phase" style={{ flex: regWidth }}>
              <span className="tl-tag">Registration</span>
              <span className="tl-name">Open Now</span>
            </div>
            <div className="tl-label-phase" style={{ flex: track1Width }}>
              <span className="tl-tag">Track 1 &amp; 2</span>
              <span className="tl-name">Miners &amp; Scripts</span>
            </div>
            <div className="tl-label-phase tl-label-phase--dim" style={{ flex: track2Width }}>
              <span className="tl-tag">Track 3</span>
              <span className="tl-name">Apps &amp; Agents</span>
            </div>
          </div>

          {/* Bar */}
          <div className="tl-bar-outer">
            <div className="tl-segment tl-segment--green"  style={{ flex: regWidth }} />
            <div className="tl-segment tl-segment--amber"  style={{ flex: track1Width }} />
            <div className="tl-segment tl-segment--dim"    style={{ flex: track2Width }} />
            <div className="tl-progress-node" style={{ left: nodeLeft }} />
          </div>

          {/* Date markers */}
          <div className="tl-date-row">
            <span className="tl-date">Today</span>
            <span className="tl-date" style={{ position: 'absolute', left: `${regWidth}%`, transform: 'translateX(-50%)' }}>
              Aug 17
            </span>
            <span className="tl-date" style={{ position: 'absolute', left: `${regWidth + track1Width}%`, transform: 'translateX(-50%)' }}>
              Aug 31
            </span>
            <span className="tl-date">Sep 7</span>
          </div>


        </div>
      </div>
    </section>
  )
}
