'use client'
import { useEffect, useState } from 'react'
import { PHASES } from '@/data/season2/event'

function phaseState(from: string | null, to: string, today: string) {
  if (today > to) return 'done'
  if (!from || today >= from) return 'now'
  return 'next'
}

export default function Timeline() {
  // Resolved after mount so the static page never disagrees with the visitor's date.
  const [today, setToday] = useState<string | null>(null)
  useEffect(() => { setToday(new Date().toISOString().slice(0, 10)) }, [])

  return (
    <ol className="s2-timeline">
      {PHASES.map((p, i) => (
        <li key={p.title} className={`s2-phase${today ? ` is-${phaseState(p.from, p.to, today)}` : ''}`}>
          <span className="s2-idx">{String(i + 1).padStart(2, '0')}</span>
          <span className="s2-phase-dates">{p.dates}</span>
          <h3 className="s2-card-title">{p.title}</h3>
          <p className="s2-card-body">{p.body}</p>
        </li>
      ))}
    </ol>
  )
}
