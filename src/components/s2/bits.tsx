'use client'
import Link from 'next/link'
import { INTENT_BY_NAME, intentLabel } from '@/data/season2/intents'
import { TAGS } from '@/data/season2/event'
import type { Tag } from '@/data/season2/missions'

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
