import type { Metadata } from 'next'
import Timeline from '@/components/s2/Timeline'
import { Countdown } from '@/components/s2/bits'
import { NextPage, PageHero, Section } from '@/components/s2/Page'
import { END, START } from '@/data/season2/event'

export const metadata: Metadata = { title: 'Timeline | Telegraph Hackathon Season II' }

export default function TimelinePage() {
  return (
    <>
      <PageHero
        page="/timeline"
        title="The thirty days."
        sub="16 November to 16 December 2026. One gate in the middle stops the usual pattern of everything being faked in the last forty-eight hours."
      >
        <Countdown start={START} end={END} />
      </PageHero>
      <Section>
        <Timeline />
      </Section>
      <NextPage page="/timeline" />
    </>
  )
}
