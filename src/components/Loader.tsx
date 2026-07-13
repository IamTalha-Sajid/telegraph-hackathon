'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Props {
  onComplete: () => void
}

export default function Loader({ onComplete }: Props) {
  const [progress, setProgress]   = useState(0)
  const [exiting, setExiting]     = useState(false)
  const calledRef                 = useRef(false)

  const finish = useCallback(() => {
    if (calledRef.current) return
    calledRef.current = true
    onComplete()
  }, [onComplete])

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 640px)').matches
    const DURATION = isMobile ? 450 : 1000
    const EXIT_DELAY = isMobile ? 550 : 1200
    const FINISH_DELAY = isMobile ? 800 : 1750

    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const p = Math.min(100, Math.floor(((now - start) / DURATION) * 100))
      setProgress(p)
      if (p < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const t1 = setTimeout(() => setExiting(true), EXIT_DELAY)
    const t2 = setTimeout(finish, FINISH_DELAY)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [finish])

  return (
    <div className={`loader${exiting ? ' loader-out' : ''}`}>
      {/* Corner brackets */}
      <span className="lc lc-tl" />
      <span className="lc lc-tr" />
      <span className="lc lc-bl" />
      <span className="lc lc-br" />

      {/* Scan line */}
      <div className="loader-scan" />

      <div className="loader-inner">

        {/* Logo + rotating ring */}
        <div className="loader-logo-wrap">
          <svg className="loader-ring-svg" viewBox="0 0 160 160" aria-hidden="true">
            {/* Outer faint track */}
            <circle cx="80" cy="80" r="72" className="lr-track" />
            {/* Spinning arc — short 25 % sweep */}
            <circle cx="80" cy="80" r="72" className="lr-arc lr-arc-a" />
            {/* Inner faint track */}
            <circle cx="80" cy="80" r="60" className="lr-track" />
            {/* Inner counter-spinning arc */}
            <circle cx="80" cy="80" r="60" className="lr-arc lr-arc-b" />
          </svg>
          <img
            src="/Telegraoh-Logo.png"
            alt="Telegraph"
            className="loader-logo-img"
          />
        </div>

        {/* Name */}
        <p className="loader-title">TELEGRAPH</p>
        <p className="loader-tagline">Machine Intelligence Protocol</p>

        {/* Progress */}
        <div className="loader-prog-row">
          <span className="loader-status">
            Initializing<span className="loader-blink">_</span>
          </span>
          <span className="loader-pct">
            {String(progress).padStart(3, '0')}%
          </span>
        </div>
        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
