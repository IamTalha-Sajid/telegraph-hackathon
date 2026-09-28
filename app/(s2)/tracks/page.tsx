import type { Metadata } from 'next'
import Link from 'next/link'
import { IntentChip } from '@/components/s2/bits'
import { NextPage, PageHero, Section } from '@/components/s2/Page'
import { FLYWHEEL, TRACKS } from '@/data/season2/structure'
import { MISSIONS_BY_INTENT, pad2 } from '@/data/season2/missions'

export const metadata: Metadata = { title: 'Tracks | Telegraph Hackathon Season II' }

const SHARED_INTENT = 'SANCTIONS_SCREENING_MATCH'

export default function TracksPage() {
  const sharedBy = MISSIONS_BY_INTENT[SHARED_INTENT] ?? []
  return (
    <>
      <PageHero
        page="/tracks"
        title="Three tracks. Fifteen commercial missions. One shared Intent network."
        sub="Season II has three competition tracks, the same as Season I. Miners and Evaluators work on the shared Intent catalogue and are not tied to any industry. The fifteen commercial missions give direction to the Apps & Agents track only."
      >
        <ol className="s2-grid s2-grid-3">
          {TRACKS.map((t, i) => (
            <li key={t.key} className={`s2-card${t.key === 'app' ? ' s2-card-accent' : ''}`}>
              <span className="s2-idx">Track {pad2(i + 1)}</span>
              <h3 className="s2-card-title">{t.title}</h3>
              <p className="s2-card-body">{t.body}</p>
              <p className="tr-pick">{t.pick}</p>
              <Link className="s2-link tr-link" href={t.href}>{t.cta} →</Link>
            </li>
          ))}
        </ol>
      </PageHero>

      <Section
        label="The flywheel"
        title="People bring intelligence, people build evaluation, ranking forms, apps consume it."
        sub="The same loop as Season I and the live network. This time the consumption side is pointed at fifteen commercially useful areas."
      >
        <ol className="s2-flow">
          {FLYWHEEL.map(f => <li key={f.title}><strong>{f.title}</strong><span>{f.body}</span></li>)}
        </ol>
      </Section>

      <Section
        label="One Intent, many missions"
        title="There is no Legal sanctions Miner and Exchange sanctions Miner."
        sub="An Intent is global. The same Miners serve it, the same Evaluators score it, and every mission that needs it buys from the same ranking."
      >
        <div className="tr-shared">
          <IntentChip name={SHARED_INTENT} />
          <span className="tr-shared-text">is bought by example builds in {sharedBy.length} missions:</span>
          <div className="s2-chips">
            {sharedBy.map(m => <Link key={m.slug} className="s2-chip" href={`/missions/${m.slug}`}>{pad2(m.n)} {m.name}</Link>)}
          </div>
        </div>
      </Section>

      <NextPage page="/tracks" />
    </>
  )
}
