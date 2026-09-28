import type { Metadata } from 'next'
import MissionGrid from '@/components/s2/MissionGrid'
import { NextPage, PageHero, Section } from '@/components/s2/Page'

export const metadata: Metadata = { title: 'Commercial Missions | Telegraph Hackathon Season II' }

export default function MissionsPage() {
  return (
    <>
      <PageHero
        page="/missions"
        title="Fifteen commercial missions."
        sub="The missions give direction to the Apps & Agents track. Each one is a real industry with a problem solved slowly, expensively, or not at all. Pick one to see the problem, the finished product we want, example builds, and the shared Intents behind them."
      />
      <Section>
        <MissionGrid />
      </Section>
      <NextPage page="/missions" />
    </>
  )
}
