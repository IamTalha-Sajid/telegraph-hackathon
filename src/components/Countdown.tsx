'use client'
import { useEffect, useState } from 'react'

const START  = new Date('2026-08-17T00:00:00Z')
const END    = new Date('2026-09-07T00:00:00Z')

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const UNITS = ['Days', 'Hours', 'Minutes', 'Seconds'] as const

export default function Countdown() {
  const hasStarted = Date.now() >= START.getTime()
  const target = hasStarted ? END : START
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null)

  useEffect(() => {
    setTime(getTimeLeft(target))
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const values = time ? [time.days, time.hours, time.minutes, time.seconds] : [0, 0, 0, 0]

  return (
    <section className="countdown-section">
      <div className="countdown-inner">
        <p className="countdown-label">{hasStarted ? 'Hackathon ends in' : 'Hackathon starts in'}</p>

        <div className="countdown-grid">
          {UNITS.map((label, i) => (
            <div key={label} className="countdown-unit">
              <div className="countdown-val-row">
                <span className="countdown-val">
                  {String(values[i]).padStart(2, '0')}
                </span>
                {i < UNITS.length - 1 && <span className="countdown-sep">:</span>}
              </div>
              <span className="countdown-unit-label">{label}</span>
            </div>
          ))}
        </div>

        <p className="countdown-date">
          {hasStarted ? 'Sep 7, 2026 · Submissions Close' : 'Aug 17, 2026 · Track 1 & 2 Open'}
        </p>
      </div>
    </section>
  )
}
