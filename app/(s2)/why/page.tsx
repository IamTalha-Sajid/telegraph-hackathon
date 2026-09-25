import type { Metadata } from 'next'
import { NextPage, PageHero, Section } from '@/components/s2/Page'
import { GET, WHY } from '@/data/season2/event'

export const metadata: Metadata = { title: 'Why | Telegraph Hackathon Season II' }

export default function WhyPage() {
  return (
    <>
      <PageHero
        page="/why"
        title="Why this hackathon exists."
        sub="Mainnet goes live between December 2026 and January 2027. Season II is how the network arrives with real products, real demand and real miners already on it."
      >
        <ul className="s2-grid s2-grid-3">
          {WHY.map((w, i) => (
            <li key={w.title} className="s2-card">
              <span className="s2-idx">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="s2-card-title">{w.title}</h3>
              <p className="s2-card-body">{w.body}</p>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section
        label="What you get"
        title="Most hackathons end at demo day."
        sub="This one prepares you to sell what you build, or to buy the most competitive intelligence on the market, the day Telegraph hits mainnet."
      >
        <ul className="s2-grid s2-grid-4">
          {GET.map(g => (
            <li key={g.title} className="s2-card">
              <h3 className="s2-card-title">{g.title}</h3>
              <p className="s2-card-body">{g.body}</p>
            </li>
          ))}
        </ul>
        <p className="s2-note">One winner per track, with runners-up named per use case. $15,000 USD prize pool.</p>
      </Section>

      <NextPage page="/why" />
    </>
  )
}
