'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Select from './Select'
import { useSearchParams } from 'next/navigation'
import { GROUP_LABEL, INTENTS, type IntentClass, type IntentGroup } from '@/data/season2/intents'
import { TRACKS_BY_INTENT, pad2 } from '@/data/season2/tracks'

const CLASSES: IntentClass[] = ['Deterministic', 'Hybrid', 'Non-deterministic']
const GROUPS: IntentGroup[] = ['priority', 'core']
const CATEGORIES = Array.from(new Set(INTENTS.map(i => i.category))).sort()

const CLASS_HINT: Record<IntentClass, string> = {
  'Deterministic': 'One checkable right answer. Scored by comparing miners against each other.',
  'Hybrid': 'Part fact, part judgment. Scored by a comparator plus an evaluator adapter.',
  'Non-deterministic': 'No single right answer. Scored by an evaluator adapter.',
}

export default function IntentExplorer() {
  const params = useSearchParams()
  const initial = params.get('intent')
  const [q, setQ] = useState('')
  const [cls, setCls] = useState<IntentClass | ''>('')
  const [group, setGroup] = useState<IntentGroup | ''>('')
  const [cat, setCat] = useState('')
  const [inTracks, setInTracks] = useState(false)
  const [open, setOpen] = useState<string | null>(initial)

  useEffect(() => {
    if (!initial) return
    setOpen(initial)
    document.getElementById(`intent-${initial}`)?.scrollIntoView({ block: 'center' })
  }, [initial])

  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    return INTENTS.filter(i =>
      (!cls || i.cls === cls) &&
      (!group || i.group === group) &&
      (!cat || i.category === cat) &&
      (!inTracks || TRACKS_BY_INTENT[i.name]) &&
      words.every(w => [i.name, i.category, i.description, i.source ?? '', i.hubs ?? ''].join(' ').toLowerCase().includes(w)),
    )
  }, [q, cls, group, cat, inTracks])

  return (
    <>
      <section className="s2-page-hero">
        <div className="s2-inner">
          <p className="s2-eyebrow">Reference / Intents</p>
          <h1 className="s2-title">Intent catalogue.</h1>
          <p className="s2-sub">
            Every intent registered on-chain. An intent is one kind of intelligence Telegraph can rank and route. Apps combine several intents into
            one outcome; Miners serve an intent and compete on it; Evaluators decide how miners for an intent are scored.
            Start from a <Link href="/tracks">track</Link> if you want to see intents in context.
          </p>
          <ul className="ix-classes">
            {CLASSES.map(c => (
              <li key={c}><span className={`s2-chip s2-chip-${c.toLowerCase().replace('-', '')}`}>{c}</span>{CLASS_HINT[c]}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="s2-block ix-section">
        <div className="s2-inner">
          <div className="tg-controls">
            <label className="tg-search">
              <span className="visually-hidden">Search intents</span>
              <input type="search" placeholder="Search intents, e.g. sanctions, weather, code" value={q} onChange={e => setQ(e.target.value)} />
            </label>
            <div className="tg-filters">
              <Select
                label="Catalogue group"
                value={group}
                onChange={v => setGroup(v as IntentGroup | '')}
                options={[{ value: '', label: 'All groups' }, ...GROUPS.map(g => ({ value: g, label: GROUP_LABEL[g] }))]}
              />
              <Select
                label="Class"
                value={cls}
                onChange={v => setCls(v as IntentClass | '')}
                options={[{ value: '', label: 'Any class' }, ...CLASSES.map(c => ({ value: c, label: c }))]}
              />
              <Select
                label="Category"
                value={cat}
                onChange={setCat}
                options={[{ value: '', label: 'Any category' }, ...CATEGORIES.map(c => ({ value: c, label: c }))]}
              />
              <button className={`tg-pill${inTracks ? ' is-on' : ''}`} aria-pressed={inTracks} onClick={() => setInTracks(v => !v)}>
                Used in a track
              </button>
            </div>
          </div>

          <p className="ix-count">{list.length} of {INTENTS.length} intents</p>

          {list.length === 0 ? (
            <div className="tg-empty">
              <p>No intents match. Clear a filter or try another word.</p>
              <button className="s2-btn" onClick={() => { setQ(''); setCls(''); setGroup(''); setCat(''); setInTracks(false) }}>Clear filters</button>
            </div>
          ) : (
            <ul className="ix-list">
              {list.map(i => {
                const isOpen = open === i.name
                const tracks = TRACKS_BY_INTENT[i.name] ?? []
                return (
                  <li key={i.name} id={`intent-${i.name}`} className={`ix-row${isOpen ? ' is-open' : ''}`}>
                    <button className="ix-summary" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i.name)}>
                      <code className="ix-name">{i.name}</code>
                      <span className="ix-cat">{i.category}</span>
                      <span className={`s2-chip s2-chip-${i.cls.toLowerCase().replace('-', '')}`}>{i.cls}</span>
                      <span className="ix-tracks">{tracks.length ? `${tracks.length} ${tracks.length === 1 ? 'track' : 'tracks'}` : ''}</span>
                    </button>
                    {isOpen && (
                      <div className="ix-detail">
                        <p className="ix-desc">{i.description}</p>
                        <dl className="ix-facts">
                          {i.why && <div><dt>Why it is {i.cls.toLowerCase()}</dt><dd>{i.why}</dd></div>}
                          <div><dt>How it is scored</dt><dd>{i.scoring}{i.method ? `, ${i.method}` : ''}</dd></div>
                          {i.source && <div><dt>Data source</dt><dd>{i.source}{i.hubs ? `, e.g. ${i.hubs}` : ''}</dd></div>}
                          {i.scale && <div><dt>How miners compete</dt><dd>{i.scale}</dd></div>}
                          {i.latency && <div><dt>Target latency</dt><dd>{i.latency}</dd></div>}
                          <div><dt>Group</dt><dd>{GROUP_LABEL[i.group]}</dd></div>
                          {i.verifyNote && <div className="ix-warn"><dt>Verification caveat</dt><dd>{i.verifyNote}</dd></div>}
                        </dl>
                        {tracks.length > 0 && (
                          <div className="ix-used">
                            <span className="tv-label">Used in</span>
                            <div className="tv-chips">
                              {tracks.map(t => <Link key={t.slug} className="s2-chip" href={`/tracks/${t.slug}`}>{pad2(t.n)} {t.name}</Link>)}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
