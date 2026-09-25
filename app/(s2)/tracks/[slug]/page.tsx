import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TrackView from '@/components/s2/TrackView'
import { TRACKS, TRACK_BY_SLUG, pad2 } from '@/data/season2/tracks'

export function generateStaticParams() {
  return TRACKS.map(t => ({ slug: t.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = TRACK_BY_SLUG[params.slug]
  if (!t) return {}
  const title = `Track ${pad2(t.n)}: ${t.name} | Telegraph Hackathon Season II`
  return {
    title,
    description: t.summary,
    openGraph: { title, description: t.summary },
    twitter: { title, description: t.summary },
  }
}

export default function TrackPage({ params }: { params: { slug: string } }) {
  if (!TRACK_BY_SLUG[params.slug]) notFound()
  return <TrackView slug={params.slug} />
}
