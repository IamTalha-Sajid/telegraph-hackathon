'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { INTENT_BY_NAME, intentLabel } from '@/data/season2/intents'
import { TAGS } from '@/data/season2/event'
import type { Tag } from '@/data/season2/tracks'

export function TagBadge({ tag }: { tag: Tag }) {
  return (
    <span className={`s2-tag s2-tag-${tag.toLowerCase()}`} title={TAGS[tag]}>[ {tag} ]</span>
  )
}

export function IntentChip({ name }: { name: string }) {
  const intent = INTENT_BY_NAME[name]
  return (
    <Link
      href={`/intents?intent=${name}`}
      className={`s2-chip s2-chip-${intent?.cls.toLowerCase().replace('-', '') ?? 'x'}`}
      title={intent ? `${intentLabel(name)}: ${intent.description}` : name}
    >
      {name}
    </Link>
  )
}

function left(target: Date) {
  const d = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(d / 86_400_000),
    hours: Math.floor((d / 3_600_000) % 24),
    minutes: Math.floor((d / 60_000) % 60),
  }
}

/** Counts down to the start, then to the end. Renders nothing until mounted to avoid a hydration mismatch. */
export function Countdown({ start, end }: { start: Date; end: Date }) {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(id)
  }, [])
  if (now === null) return <span className="s2-count" aria-hidden="true">&nbsp;</span>
  if (now > end.getTime()) return <span className="s2-count">Season II has ended</span>
  const started = now >= start.getTime()
  const t = left(started ? end : start)
  return (
    <span className="s2-count">
      {started ? 'Submissions close in' : 'Starts in'}{' '}
      <strong>{t.days}d {t.hours}h {t.minutes}m</strong>
    </span>
  )
}
