import { PHASES } from '@/data/season2/event'

export default function Timeline() {
  return (
    <ol className="s2-timeline">
      {PHASES.map((p, i) => (
        <li key={p.title} className="s2-phase">
          <span className="s2-idx">{String(i + 1).padStart(2, '0')}</span>
          <span className="s2-phase-dates">{p.dates}</span>
          <h3 className="s2-card-title">{p.title}</h3>
          <p className="s2-card-body">{p.body}</p>
        </li>
      ))}
    </ol>
  )
}
