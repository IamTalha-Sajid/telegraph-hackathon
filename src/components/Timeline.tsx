'use client'

const PHASE1_START = new Date('2026-08-17T00:00:00Z').getTime()
const PHASE1_END   = new Date('2026-08-31T00:00:00Z').getTime()
const PHASE2_END   = new Date('2026-09-07T00:00:00Z').getTime()

export default function Timeline() {
  const now = Date.now()

  // Remaining duration of each phase from "now" — phases already fully in
  // the past collapse to 0 and are dropped so their labels/segments/date
  // markers don't render and overlap the next phase's.
  const regMs    = Math.max(PHASE1_START - now, 0)
  const track1Ms = Math.max(PHASE1_END - Math.max(PHASE1_START, now), 0)
  const track2Ms = Math.max(PHASE2_END - Math.max(PHASE1_END, now), 0)
  const total    = regMs + track1Ms + track2Ms

  const regWidth    = (regMs    / total) * 100
  const track1Width = (track1Ms / total) * 100
  const track2Width = (track2Ms / total) * 100

  // progress node always sits at "today" — the start of the remaining bar
  const nodeLeft = 'calc(0% - 7px)'

  const showReg    = regMs > 0
  const showTrack1 = track1Ms > 0
  const showTrack2 = track2Ms > 0

  return (
    <section className="timeline-section">
      <div className="timeline-inner">
        <div className="sec-label">Schedule</div>
        <h2 className="sec-title">When to build.</h2>

        <div className="tl-wrap">

          {/* Labels row */}
          <div className="tl-labels">
            {showReg && (
              <div className="tl-label-phase" style={{ flex: regWidth }}>
                <span className="tl-tag">Registration</span>
                <span className="tl-name">Open Now</span>
              </div>
            )}
            {showTrack1 && (
              <div className="tl-label-phase" style={{ flex: track1Width }}>
                <span className="tl-tag">Track 1 &amp; 2</span>
                <span className="tl-name">Miners &amp; Scripts</span>
              </div>
            )}
            {showTrack2 && (
              <div className="tl-label-phase tl-label-phase--dim" style={{ flex: track2Width }}>
                <span className="tl-tag">Track 3</span>
                <span className="tl-name">Apps &amp; Agents</span>
              </div>
            )}
          </div>

          {/* Bar */}
          <div className="tl-bar-outer">
            {showReg    && <div className="tl-segment tl-segment--green" style={{ flex: regWidth }} />}
            {showTrack1 && <div className="tl-segment tl-segment--amber" style={{ flex: track1Width }} />}
            {showTrack2 && <div className="tl-segment tl-segment--dim"   style={{ flex: track2Width }} />}
            <div className="tl-progress-node" style={{ left: nodeLeft }} />
          </div>

          {/* Date markers */}
          <div className="tl-date-row">
            <span className="tl-date">Today</span>
            {showReg && (
              <span className="tl-date" style={{ position: 'absolute', left: `${regWidth}%`, transform: 'translateX(-50%)' }}>
                Aug 17
              </span>
            )}
            {showTrack1 && (
              <span className="tl-date" style={{ position: 'absolute', left: `${regWidth + track1Width}%`, transform: 'translateX(-50%)' }}>
                Aug 31
              </span>
            )}
            {showTrack2 && <span className="tl-date">Sep 7</span>}
          </div>


        </div>
      </div>
    </section>
  )
}
