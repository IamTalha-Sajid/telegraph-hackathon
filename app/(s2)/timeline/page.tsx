import type { Metadata } from 'next'
import Timeline from '@/components/s2/Timeline'
import { NextPage, PageHero, Section } from '@/components/s2/Page'

export const metadata: Metadata = { title: 'Timeline | Telegraph Hackathon Season II' }

export default function TimelinePage() {
  return (
    <>
      <PageHero
        page="/timeline"
        title="The thirty days."
        sub="November to December 2026, with exact dates to be announced. One gate in the middle stops the usual pattern of everything being faked in the last forty-eight hours."
      />
      <Section>
        <Timeline />
      </Section>
      <NextPage page="/timeline" />
    </>
  )
}
