import type { Metadata } from 'next'
import TrackGrid from '@/components/s2/TrackGrid'
import { NextPage, PageHero, Section } from '@/components/s2/Page'

export const metadata: Metadata = { title: 'Tracks | Telegraph Hackathon Season II' }

export default function TracksPage() {
  return (
    <>
      <PageHero
        page="/tracks"
        title="Fifteen commercial tracks."
        sub="Each track is a real industry with a problem solved slowly, expensively, or not at all. Pick one to see the problem, the finished product we want, example builds, and the intelligence behind them."
      />
      <Section>
        <TrackGrid />
      </Section>
      <NextPage page="/tracks" />
    </>
  )
}
