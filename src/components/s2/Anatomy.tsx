'use client'
import { useEffect, useRef, useState } from 'react'
import Sigma from './Sigma'
import { ANATOMY_STEPS } from '@/data/season2/event'
import { intentLabel } from '@/data/season2/intents'

interface Props {
  goal: string
  intents: string[]
  output: string
  /** Show the numbered step list beside the diagram. */
  withSteps?: boolean
}

const STEP_MS = 2600

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}
const hex = (n: number, len: number) => n.toString(16).padStart(8, '0').slice(0, len)

/** Stable placeholder miners, ranks and receipts per intent, so the diagram never shifts between renders. */
function rowData(intent: string) {
  const h = hash(intent)
  const scores = [0, 1, 2].map(i => 55 + ((h >> (i * 5)) % 40)).sort((a, b) => b - a)
  return {
    miners: scores.map((score, i) => ({ id: `m-${hex(hash(intent + i), 3)}`, score })),
    receipt: `0x${hex(h, 4)}…${hex(hash(intent + 'r'), 4)}`,
  }
}

export default function Anatomy({ goal, intents, output, withSteps = true }: Props) {
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setAuto(false); setStep(3) }
  }, [])

  useEffect(() => {
    if (!auto || !visible) return
    const id = setInterval(() => setStep(s => (s + 1) % 4), STEP_MS)
    return () => clearInterval(id)
  }, [auto, visible])

  const pick = (i: number) => { setAuto(false); setStep(i) }
  const verification = `0x${hex(hash(goal + output), 8)}${hex(hash(output), 8)}`

  return (
    <div className={`an${withSteps ? '' : ' an-compact'}`} ref={ref} data-step={step}>
      {withSteps && (
        <ol className="an-steps">
          {ANATOMY_STEPS.map((s, i) => (
            <li key={s.title}>
              <button className={`an-step${i === step ? ' is-on' : ''}${i < step ? ' is-past' : ''}`} onClick={() => pick(i)}>
                <span className="an-step-n">{i + 1}</span>
                <span className="an-step-text">
                  <span className="an-step-title">{s.title}</span>
                  <span className="an-step-body">{s.body}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      )}

      <div className="an-stage">
        <div className="an-agent">
          <span className="an-kicker">Agent goal</span>
          <span className="an-goal">{goal}</span>
        </div>

        <span className="an-link an-link-in" aria-hidden="true">
          <Sigma className="an-hub-mark" />
        </span>

        <ul className="an-rows" style={{ ['--n' as string]: intents.length }}>
          {intents.map((name, r) => {
            const d = rowData(name)
            return (
              <li className="an-row" key={name} style={{ ['--r' as string]: r }}>
                <span className="an-wire an-wire-in" aria-hidden="true" />
                <div className="an-intent">
                  <code className="an-intent-name" title={intentLabel(name)}>{name}</code>
                  <div className="an-miners">
                    {d.miners.map((m, i) => (
                      <span key={m.id} className={`an-miner${i === 0 ? ' is-top' : ''}`}>
                        <span className="an-miner-id">{m.id}</span>
                        <span className="an-bar"><span style={{ ['--w' as string]: `${m.score}%` }} /></span>
                      </span>
                    ))}
                  </div>
                  <span className="an-receipt">receipt {d.receipt}</span>
                </div>
                <span className="an-wire an-wire-out" aria-hidden="true" />
              </li>
            )
          })}
        </ul>

        <span className="an-link an-link-out" aria-hidden="true" />

        <div className="an-out">
          <span className="an-kicker">Outcome</span>
          <span className="an-goal">{output}</span>
          <span className="an-cost">
            {intents.length} paid requests<br />
            {intents.length} receipts<br />
            verified {verification.slice(0, 10)}…
          </span>
        </div>
      </div>

      <div className="an-foot">
        <p className="an-note">Illustration. Miner IDs, ranks and hashes are placeholders; a real build shows them in the spend panel.</p>
        {!auto && (
          <button className="an-replay" onClick={() => { setStep(0); setAuto(true) }}>Play again</button>
        )}
      </div>
    </div>
  )
}
