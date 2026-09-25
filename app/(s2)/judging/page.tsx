import type { Metadata } from 'next'
import { NextPage, PageHero, Section } from '@/components/s2/Page'
import { JUDGING, PRIZES, SHIP } from '@/data/season2/event'

export const metadata: Metadata = { title: 'Judging | Telegraph Hackathon Season II' }

export default function JudgingPage() {
  return (
    <>
      <PageHero
        page="/judging"
        title="Judging."
        sub="Optimise for mainnet readiness. A build that does not convert to mainnet will not qualify, and after that, what matters most is whether someone would buy it."
      >
        <ul className="s2-weights">
          {JUDGING.map(j => (
            <li key={j.title}>
              <span className="s2-weight-n">{j.weight}%</span>
              <span className="s2-weight-bar"><span style={{ width: `${(j.weight / JUDGING[0].weight) * 100}%` }} /></span>
              <span className="s2-weight-text"><strong>{j.title}</strong><span>{j.body}</span></span>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section
        label="What you ship"
        title="Five things with every submission."
        sub="Your video may be used in Telegraph's paid ads on X to showcase your build."
      >
        <ol className="s2-grid s2-grid-5">
          {SHIP.map((s, i) => (
            <li key={s.title} className="s2-card">
              <span className="s2-idx">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="s2-card-title">{s.title}</h3>
              <p className="s2-card-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        label="Prizes"
        title="Fifteen track winners, not one grand prize."
        sub="Prize pool to be announced, split across the fifteen tracks."
      >
        <ul className="s2-grid s2-grid-4">
          {PRIZES.map(p => (
            <li key={p.title} className="s2-card">
              <h3 className="s2-card-title">{p.title}</h3>
              <p className="s2-card-body">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <NextPage page="/judging" />
    </>
  )
}
