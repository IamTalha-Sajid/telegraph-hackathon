import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MissionView from '@/components/s2/MissionView'
import { MISSIONS, MISSION_BY_SLUG, pad2 } from '@/data/season2/missions'

export function generateStaticParams() {
  return MISSIONS.map(t => ({ slug: t.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = MISSION_BY_SLUG[params.slug]
  if (!t) return {}
  const title = `Mission ${pad2(t.n)}: ${t.name} | Telegraph Hackathon Season II`
  return {
    title,
    description: t.summary,
    openGraph: { title, description: t.summary },
    twitter: { title, description: t.summary },
  }
}

export default function MissionPage({ params }: { params: { slug: string } }) {
  if (!MISSION_BY_SLUG[params.slug]) notFound()
  return <MissionView slug={params.slug} />
}
