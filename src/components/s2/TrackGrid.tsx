'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import Select from './Select'
import { TRACKS, buyerLabel, pad2, trackExamples, type Tag, type Track } from '@/data/season2/tracks'
import { INTENT_BY_NAME } from '@/data/season2/intents'

type TagFilter = 'all' | Tag

const CATEGORIES = Array.from(new Set(
  TRACKS.flatMap(t => trackExamples(t).flatMap(e => e.intents.map(i => INTENT_BY_NAME[i]?.category))).filter(Boolean) as string[],
)).sort()

/** Searchable text per example, including its track and buyer so "legal" or a company name finds every build under it. */
function buildIndex(t: Track) {
  return t.buyers.flatMap(b => b.examples.map(e => ({
    e,
    text: [
      t.name, t.sector, buyerLabel(b), b.generic,
      e.title, e.body, e.output, ...e.intents, ...(e.needs ?? []),
    ].join(' ').toLowerCase(),
  })))
}

export default function TrackGrid() {
  const [q, setQ] = useState('')
  const [tag, setTag] = useState<TagFilter>('all')
  const [cat, setCat] = useState('')

  const index = useMemo(() => TRACKS.map(t => ({ t, builds: buildIndex(t) })), [])

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    return index.flatMap(({ t, builds }) => {
      const examples = builds
        .filter(({ e, text }) =>
          words.every(w => text.includes(w)) &&
          (tag === 'all' || e.tag === tag) &&
          (!cat || e.intents.some(i => INTENT_BY_NAME[i]?.category === cat)))
        .map(({ e }) => e)
      return examples.length ? [{ t, examples }] : []
    })
  }, [index, q, tag, cat])

  const filtering = q.trim() !== '' || tag !== 'all' || cat !== ''

  return (
    <div className="tg">
      <div className="tg-controls">
        <label className="tg-search">
          <span className="visually-hidden">Search tracks</span>
          <input
            type="search"
            placeholder="Search a company, problem or intent, e.g. sanctions, robot, refund"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </label>
        <div className="tg-filters" role="group" aria-label="Filter by scenario tag">
          {(['all', 'Full', 'Mechanism'] as const).map(v => (
            <button key={v} className={`tg-pill${tag === v ? ' is-on' : ''}`} aria-pressed={tag === v} onClick={() => setTag(v)}>
              {v === 'all' ? 'All builds' : `[ ${v} ]`}
            </button>
          ))}
          <Select
            label="Filter by intelligence category"
            value={cat}
            onChange={setCat}
            options={[{ value: '', label: 'Any intelligence' }, ...CATEGORIES.map(c => ({ value: c, label: c }))]}
          />
        </div>
      </div>

      {results.length === 0 ? (
        <div className="tg-empty">
          <p>No builds match that. Try a broader word, or clear the filters.</p>
          <button className="s2-btn" onClick={() => { setQ(''); setTag('all'); setCat('') }}>Clear filters</button>
        </div>
      ) : (
        <ul className="tg-grid">
          {results.map(({ t, examples }) => (
            <li key={t.slug}>
              <Link href={`/tracks/${t.slug}`} className="tg-card">
                <span className="tg-n">{pad2(t.n)}</span>
                <span className="tg-name">{t.name}</span>
                <span className="tg-sector">{t.sector}</span>
                {filtering ? (
                  <ul className="tg-matches">
                    {examples.slice(0, 3).map(e => <li key={e.title}>{e.title}</li>)}
                    {examples.length > 3 && <li className="tg-more">and {examples.length - 3} more</li>}
                  </ul>
                ) : (
                  <span className="tg-summary">{t.summary}</span>
                )}
                <span className="tg-meta">
                  {trackExamples(t).length} example builds{t.buyers.length > 1 ? `, ${t.buyers.length} buyers` : ''}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
