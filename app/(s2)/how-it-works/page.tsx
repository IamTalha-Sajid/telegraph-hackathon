import type { Metadata } from 'next'
import Link from 'next/link'
import Anatomy from '@/components/s2/Anatomy'
import { IntentChip } from '@/components/s2/bits'
import { NextPage, PageHero, Section } from '@/components/s2/Page'
import { ROLES } from '@/data/season2/event'
import { TRACK_BY_SLUG } from '@/data/season2/tracks'

export const metadata: Metadata = { title: 'How it works | Telegraph Hackathon Season II' }

const LISTING_DESK = TRACK_BY_SLUG.exchange.buyers[0].examples[0]

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        page="/how-it-works"
        title="Anatomy of a build."
        sub="You are not building another chatbot with a payment bolted on. Your app has a goal, needs several pieces of intelligence to reach it, and buys each one through Telegraph while it works."
      />

      <Section
        label="Worked example, Track 01"
        title="The autonomous listings desk."
        sub="A token listing application arrives. An agent has ninety seconds to say whether the venue should touch it."
      >
        <Anatomy goal="Should we list this token?" intents={LISTING_DESK.intents} output={LISTING_DESK.output} />
      </Section>

      <Section label="Intents" title="What an intent is.">
        <div className="s2-split">
          <div>
            <p className="s2-prose">
              An intent is one kind of intelligence Telegraph can rank and route, like <code>SMART_CONTRACT_AUDIT</code>,{' '}
              <code>SANCTIONS_SCREENING_MATCH</code> or <code>WEATHER_FORECAST_VERIFY</code>. It is not the product.
            </p>
            <p className="s2-prose">
              Your app combines several intents into one outcome, and Telegraph ranks the miners for each intent
              separately. The listing desk above buys four:
            </p>
            <div className="s2-chips">{LISTING_DESK.intents.map(i => <IntentChip key={i} name={i} />)}</div>
            <Link className="s2-link" href="/intents">Browse the full intent catalogue →</Link>
          </div>
          <ol className="s2-flow">
            <li><strong>Goal</strong><span>The app or agent has something to decide or do.</span></li>
            <li><strong>Intelligence</strong><span>It needs several pieces of intelligence, each one an intent.</span></li>
            <li><strong>Route</strong><span>Each request goes through Telegraph to a miner ranked for that intent.</span></li>
            <li><strong>Receipt</strong><span>Every answer comes back with a receipt and a settled payment.</span></li>
            <li><strong>Outcome</strong><span>The app combines the answers into a finished result.</span></li>
          </ol>
        </div>
      </Section>

      <Section
        label="Three ways in"
        title="Every track is open to all three sides of the network."
        sub="The commercial track is the top-level category. These are the ways you can take part inside it."
      >
        <ul className="s2-grid s2-grid-3">
          {ROLES.map((r, i) => (
            <li key={r.key} className="s2-card">
              <span className="s2-idx">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="s2-card-title">{r.title}</h3>
              <p className="s2-card-body">{r.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <NextPage page="/how-it-works" />
    </>
  )
}
