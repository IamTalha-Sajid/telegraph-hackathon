'use client'
import { useState } from 'react'
import Link from 'next/link'
import Anatomy from './Anatomy'
import { useRegister } from './Shell'
import { IntentChip, TagBadge } from './bits'
import {
  TRACKS, TRACK_BY_SLUG, buyerLabel, pad2, trackExamples, trackIntents,
} from '@/data/season2/tracks'
import { INTENT_BY_NAME } from '@/data/season2/intents'
import { ROLES } from '@/data/season2/event'

const INTENT_PREVIEW = 6

export default function TrackView({ slug }: { slug: string }) {
  const t = TRACK_BY_SLUG[slug]
  const register = useRegister()
  const [buyerIdx, setBuyerIdx] = useState(0)
  const [openFlow, setOpenFlow] = useState<string | null>(t.buyers[0].examples[0].title)
  const [allIntents, setAllIntents] = useState(false)

  const buyer = t.buyers[buyerIdx]
  const intents = trackIntents(t)
  const examples = trackExamples(t)
  const judgmentIntents = intents.filter(i => INTENT_BY_NAME[i]?.cls !== 'Deterministic')
  const prev = TRACKS[(t.n + TRACKS.length - 2) % TRACKS.length]
  const next = TRACKS[t.n % TRACKS.length]
  const shownIntents = allIntents ? intents : intents.slice(0, INTENT_PREVIEW)
  const usage = (name: string) => examples.filter(e => e.intents.includes(name)).length

  const pickBuyer = (i: number) => {
    setBuyerIdx(i)
    setOpenFlow(t.buyers[i].examples[0].title)
  }

  return (
    <>
      <section className="s2-page-hero">
        <div className="s2-inner">
          <nav className="tv-crumbs" aria-label="Breadcrumb">
            <Link href="/tracks">All tracks</Link>
            <span aria-hidden="true">/</span>
            <span>Track {pad2(t.n)}</span>
          </nav>
          <div className="tv-title">
            <span className="tv-n" aria-hidden="true">{pad2(t.n)}</span>
            <div>
              <h1 className="s2-title">{t.name}</h1>
              <p className="s2-eyebrow tv-sector">{t.sector}</p>
            </div>
          </div>
          <div className="s2-grid s2-grid-2">
            <div className="s2-card">
              <span className="s2-idx">The problem</span>
              <p className="tv-brief">{t.problem}</p>
            </div>
            <div className="s2-card s2-card-accent">
              <span className="s2-idx">What we want built</span>
              <p className="tv-brief">{t.outcome}</p>
            </div>
          </div>
          {t.context && <p className="s2-note">{t.context}</p>}
        </div>
      </section>

      <section className="s2-block" aria-labelledby="builds">
        <div className="s2-inner">
          <p className="s2-eyebrow">Example builds</p>
          <h2 id="builds" className="s2-h2">What the end result could look like.</h2>
          <p className="s2-sub">
            {t.buyers.length > 1
              ? `This track has ${t.buyers.length} buyers, each with its own three examples. One winner for the track, runners-up named per buyer.`
              : 'Build one of these, or your own answer to the same problem.'}
          </p>

          {t.buyers.length > 1 && (
            <div className="tv-buyers" role="tablist" aria-label="Buyers">
              {t.buyers.map((b, i) => (
                <button
                  key={b.generic}
                  role="tab"
                  aria-selected={i === buyerIdx}
                  className={`tv-buyer${i === buyerIdx ? ' is-on' : ''}`}
                  onClick={() => pickBuyer(i)}
                >
                  <span className="tv-buyer-name">{buyerLabel(b)}</span>
                  {buyerLabel(b) !== b.generic && <span className="tv-buyer-generic">{b.generic}</span>}
                </button>
              ))}
            </div>
          )}

          <div className="tv-buyer-intro" role={t.buyers.length > 1 ? 'tabpanel' : undefined}>
            {t.buyers.length === 1 && (
              <p className="tv-for">
                Built for <strong>{buyerLabel(buyer)}</strong>
                {buyerLabel(buyer) !== buyer.generic && <span> ({buyer.generic})</span>}
              </p>
            )}
            {buyer.context && <p className="s2-note">{buyer.context}</p>}
          </div>

          <ol className="tv-examples">
            {buyer.examples.map((e, i) => {
              const isOpen = openFlow === e.title
              return (
                <li key={e.title} className={`s2-card tv-ex${isOpen ? ' is-open' : ''}`}>
                  <div className="tv-ex-top">
                    <span className="s2-idx">{pad2(i + 1)}</span>
                    <TagBadge tag={e.tag} />
                  </div>
                  <h3 className="tv-ex-title">{e.title}</h3>
                  <p className="tv-ex-output"><span>End result</span>{e.output}</p>
                  <p className="tv-ex-body">{e.body}</p>
                  <div className="tv-ex-intel">
                    <span className="tv-label">Intents it buys</span>
                    <div className="s2-chips">{e.intents.map(n => <IntentChip key={n} name={n} />)}</div>
                  </div>
                  <button className="s2-btn" aria-expanded={isOpen} onClick={() => setOpenFlow(isOpen ? null : e.title)}>
                    {isOpen ? 'Hide the flow' : 'See how it flows'}
                  </button>
                  {isOpen && (
                    <div className="tv-flow">
                      <Anatomy goal={e.title} intents={e.intents} output={e.output} withSteps={false} />
                    </div>
                  )}
                </li>
              )
            })}
          </ol>

          {t.buildNote && <p className="tv-note"><strong>Build note.</strong> {t.buildNote}</p>}
        </div>
      </section>

      <section className="s2-block" aria-labelledby="intel">
        <div className="s2-inner">
          <p className="s2-eyebrow">Intelligence</p>
          <h2 id="intel" className="s2-h2">Available from Telegraph.</h2>
          <p className="s2-sub">The intents this track&apos;s examples buy. Each one is ranked separately, so your app can combine several into one outcome.</p>
          <ul className="s2-grid s2-grid-3 tv-intents">
            {shownIntents.map(name => {
              const it = INTENT_BY_NAME[name]
              return (
                <li key={name}>
                  <Link href={`/intents?intent=${name}`} className="s2-card s2-card-link">
                    <code className="tv-intent-name">{name}</code>
                    <span className="s2-card-body">{it.description}</span>
                    <span className="tv-intent-meta">
                      {it.cls}{it.latency ? `, target ${it.latency}` : ''}, used by {usage(name)} {usage(name) === 1 ? 'example' : 'examples'}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          {intents.length > INTENT_PREVIEW && (
            <button className="s2-btn tv-more" aria-expanded={allIntents} onClick={() => setAllIntents(v => !v)}>
              {allIntents ? 'Show fewer' : `Show all ${intents.length} intents`}
            </button>
          )}
        </div>
      </section>

      <section className="s2-block" aria-labelledby="roles">
        <div className="s2-inner">
          <p className="s2-eyebrow">Three ways in</p>
          <h2 id="roles" className="s2-h2">Pick your side of the network.</h2>
          <ul className="s2-grid s2-grid-3">
            {ROLES.map((r, i) => (
              <li key={r.key} className="s2-card">
                <span className="s2-idx">{pad2(i + 1)}</span>
                <h3 className="s2-card-title">{r.title}</h3>
                {r.key === 'app' && (
                  <p className="s2-card-body">Build the end-user agent: one of the {examples.length} examples on this page, or your own answer to the same problem.</p>
                )}
                {r.key === 'miner' && (
                  <p className="s2-card-body">
                    Serve an intent these apps buy, such as{' '}
                    {intents.slice(0, 3).map((n, k) => <span key={n}>{k > 0 && ', '}<code>{n}</code></span>)}.
                  </p>
                )}
                {r.key === 'evaluator' && (
                  <p className="s2-card-body">
                    {judgmentIntents.length > 0
                      ? <>Improve how miners are scored where the answer involves judgment, such as {judgmentIntents.slice(0, 3).map((n, k) => <span key={n}>{k > 0 && ', '}<code>{n}</code></span>)}.</>
                      : <>Tighten the comparators that score this track&apos;s deterministic intents, so ranking rewards the answers that were right.</>}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="s2-block s2-cta">
        <div className="s2-inner">
          <h2 className="s2-h2">Build for {t.name}.</h2>
          <p className="s2-sub">Register now and pick this track in week one. The starter kit ships before 16 November.</p>
          <div className="s2-actions">
            <button className="s2-btn s2-btn-accent s2-btn-lg" onClick={() => register(t.slug)}>Register for this track</button>
            <Link className="s2-btn s2-btn-lg" href="/rules">Read the rules</Link>
          </div>
        </div>
      </section>

      <nav className="s2-inner s2-next" aria-label="Other tracks">
        <Link href={`/tracks/${prev.slug}`} className="s2-next-prev"><span>Previous track</span>{pad2(prev.n)} {prev.name}</Link>
        <Link href={`/tracks/${next.slug}`} className="s2-next-link"><span>Next track</span>{pad2(next.n)} {next.name} →</Link>
      </nav>
    </>
  )
}
