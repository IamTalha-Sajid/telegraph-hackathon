'use client'
import { useEffect, useState } from 'react'

const HACKATHON_START = new Date('2026-08-17T12:00:00Z').getTime()
const PHASE1_END      = new Date('2026-08-31T12:00:00Z').getTime()
const PHASE2_END      = new Date('2026-09-07T12:00:00Z').getTime()

function getTimeLeft() {
  const diff = HACKATHON_START - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const UNITS = ['Days', 'Hours', 'Minutes', 'Seconds'] as const

export default function ScheduleSection() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const values = [time.days, time.hours, time.minutes, time.seconds]

  const now          = Date.now()

  const regFlex    = Math.max(HACKATHON_START - now, 0)
  const track1Flex = PHASE1_END - HACKATHON_START
  const track2Flex = PHASE2_END - PHASE1_END
  const knownFlex  = regFlex + track1Flex + track2Flex
  // TBA phases together = last 20% of bar → each = knownFlex / 8
  const tbaFlex    = knownFlex / 8

  const totalFlex  = knownFlex + tbaFlex * 2

  const regPct    = (regFlex    / totalFlex) * 100
  const track1Pct = (track1Flex / totalFlex) * 100
  const track2Pct = (track2Flex / totalFlex) * 100

  const progress  = Math.min(Math.max(((now - now) / totalFlex) * 100, 0), 100)
  const nodeLeft  = `calc(${progress}% - 7px)`

  return (
    <section className="schedule-section">
      <div className="schedule-inner">

        {/* Countdown */}
        <div className="schedule-countdown">
          <p className="countdown-label">Hackathon starts in</p>
          <div className="countdown-grid">
            {UNITS.map((label, i) => (
              <div key={label} className="countdown-unit">
                <div className="countdown-val-row">
                  <span className="countdown-val">{String(values[i]).padStart(2, '0')}</span>
                  {i < UNITS.length - 1 && <span className="countdown-sep">:</span>}
                </div>
                <span className="countdown-unit-label">{label}</span>
              </div>
            ))}
          </div>
          <p className="countdown-date">Aug 17, 2026 · 12:00 UTC · Track 1 &amp; 2 Open</p>
        </div>

        <div className="schedule-divider" />

        {/* Timeline */}
        <div className="schedule-timeline">
          <p className="countdown-label">When to build</p>

          <div className="tl-wrap">

            {/* Labels */}
            <div className="tl-labels">
              <div className="tl-label-phase" style={{ flex: regFlex }}>
                <span className="tl-tag tl-tag--green">Registration</span>
                <span className="tl-name tl-name--green">Open Now</span>
              </div>
              <div className="tl-label-phase" style={{ flex: track1Flex }}>
                <span className="tl-tag">Track 1 &amp; 2</span>
                <span className="tl-name">Miners &amp; Scripts</span>
              </div>
              <div className="tl-label-phase" style={{ flex: track2Flex }}>
                <span className="tl-tag tl-tag--blue">Track 3</span>
                <span className="tl-name tl-name--blue">Apps &amp; Agents</span>
              </div>
              <div className="tl-label-phase tl-label-phase--dim" style={{ flex: tbaFlex }}>
                <span className="tl-tag">Evaluation</span>
                <span className="tl-name">Results</span>
              </div>
              <div className="tl-label-phase tl-label-phase--dim" style={{ flex: tbaFlex }}>
                <span className="tl-tag">Winners</span>
                <span className="tl-name">Announced</span>
              </div>
            </div>

            {/* Bar */}
            <div className="tl-bar-outer">
              <div className="tl-segment tl-segment--green"  style={{ flex: regFlex }} />
              <div className="tl-segment tl-segment--amber"  style={{ flex: track1Flex }} />
              <div className="tl-segment tl-segment--blue"   style={{ flex: track2Flex }} />
              <div className="tl-segment tl-segment--tba"    style={{ flex: tbaFlex }} />
              <div className="tl-segment tl-segment--tba"    style={{ flex: tbaFlex }} />
              <div className="tl-progress-node" style={{ left: nodeLeft }} />
            </div>

            {/* Dates */}
            <div className="tl-date-row">
              <span className="tl-date">Today</span>
              <span className="tl-date" style={{ position: 'absolute', left: `${regPct}%`, transform: 'translateX(-50%)' }}>Aug 17</span>
              <span className="tl-date" style={{ position: 'absolute', left: `${regPct + track1Pct}%`, transform: 'translateX(-50%)' }}>Aug 31</span>
              <span className="tl-date" style={{ position: 'absolute', left: `${regPct + track1Pct + track2Pct}%`, transform: 'translateX(-50%)' }}>Sep 7</span>
              <span className="tl-date tl-date--tba">TBA</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
