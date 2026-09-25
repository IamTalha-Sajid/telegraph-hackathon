import type { Metadata } from 'next'
import { TagBadge } from '@/components/s2/bits'
import { NextPage, PageHero, Section } from '@/components/s2/Page'
import { RULES, TAGS } from '@/data/season2/event'

export const metadata: Metadata = { title: 'Rules | Telegraph Hackathon Season II' }

export default function RulesPage() {
  return (
    <>
      <PageHero
        page="/rules"
        title="Three rules."
        sub="Every submission in every track meets all three. A build that misses one does not score, however good it looks."
      >
        <ol className="s2-grid s2-grid-3">
          {RULES.map((r, i) => (
            <li key={r.title} className="s2-card">
              <span className="s2-idx">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="s2-card-title">{r.title}</h3>
              <p className="s2-card-body">{r.body}</p>
            </li>
          ))}
        </ol>
      </PageHero>

      <Section
        label="The testnet standard"
        title="Real routing, real settlement. Only the denomination stands in."
        sub="What is real on testnet: the routing, competing miners on the leaderboard, the verification proof, and settlement on every request. Every example build is tagged with one of two scenarios."
      >
        <div className="s2-grid s2-grid-2">
          {(['Full', 'Mechanism'] as const).map(t => (
            <div key={t} className="s2-card">
              <TagBadge tag={t} />
              <p className="s2-card-body">{TAGS[t]}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Hard lines">
        <ul className="s2-lines">
          <li>A demo that cannot flip to mainnet by changing config has failed the brief. Chain ID, token address and price source are configuration values, not code.</li>
          <li>Every demo states the testnet boundary on screen, unprompted.</li>
          <li>A Mechanism build is not penalised against a Full one. Presenting a Mechanism build as a finished result disqualifies it.</li>
          <li>Checkpoint at the end of week two: one settled transaction on the board, or the team is cut from prize eligibility.</li>
        </ul>
      </Section>

      <NextPage page="/rules" />
    </>
  )
}
