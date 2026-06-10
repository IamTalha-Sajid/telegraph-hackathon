'use client'
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'

interface Props { onClose: () => void }

type ParticipantType = 'individual' | 'team'
type Level           = 'beginner' | 'intermediate' | 'advanced'

interface FormData {
  name:        string
  email:       string
  type:        ParticipantType
  orgName:     string
  teamSize:    string
  wallet:      string
  twitter:     string
  discord:     string
  level:       Level
  projectName: string
  projectDesc: string
  subnets:     string[]
  github:      string
  techStack:   string
}

type Errors = Partial<Record<keyof FormData | 'discordJoin', string>>

const DISCORD_INVITE = 'https://discord.gg/telegraphprotocol'

const EMPTY: FormData = {
  name: '', email: '', type: 'individual', orgName: '', teamSize: '2 – 5',
  wallet: '', twitter: '', discord: '', level: 'intermediate',
  projectName: '', projectDesc: '', subnets: [], github: '', techStack: '',
}

const SUBNETS = [
  'Financial Data', 'Weather & Climate', 'Social Sentiment',
  'On-chain Analytics', 'AI / LLM Inference', 'Sports & Events',
  'News & Media', 'Custom / Other',
]

const TEAM_SIZES  = ['2 – 5', '6 – 10', '11 – 20', '20+']
const LEVELS: { v: Level; label: string }[] = [
  { v: 'beginner',     label: 'Beginner'     },
  { v: 'intermediate', label: 'Intermediate' },
  { v: 'advanced',     label: 'Advanced'     },
]

/* ── Field wrapper ───────────────────────────── */
function Field({
  label, id, optional, error, children,
}: {
  label: string; id?: string; optional?: boolean; error?: string; children: ReactNode
}) {
  return (
    <div className="mf">
      <label className="mf-label" htmlFor={id}>
        {!optional && <span className="mf-req">* </span>}
        {label}
        {optional && <span className="mf-opt"> · optional</span>}
      </label>
      {children}
      {error && <p className="mf-err">{error}</p>}
    </div>
  )
}

/* ── Modal ───────────────────────────────────── */
export default function RegisterModal({ onClose }: Props) {
  const [step,      setStep]      = useState<1 | 2 | 'done'>(1)
  const [form,      setForm]      = useState<FormData>(EMPTY)
  const [errors,    setErrors]    = useState<Errors>({})
  const [closing,   setClosing]   = useState(false)
  const [submitting,   setSubmitting]   = useState(false)
  const [submitErr,    setSubmitErr]    = useState('')
  const [discordJoined, setDiscordJoined] = useState(false)
  const panelRef                  = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 220)
  }, [onClose])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [close])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => { panelRef.current?.focus() }, [])

  const set = useCallback(<K extends keyof FormData>(k: K, v: FormData[K]) =>
    setForm(f => ({ ...f, [k]: v })), [])

  const toggleSubnet = useCallback((s: string) =>
    setForm(f => ({
      ...f,
      subnets: f.subnets.includes(s)
        ? f.subnets.filter(x => x !== s)
        : [...f.subnets, s],
    })), [])

  const validate1 = () => {
    const e: Errors = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required'
    if (form.type === 'team' && !form.orgName.trim()) e.orgName = 'Required'
    if (!form.discord.trim()) e.discord = 'Required'
    if (!discordJoined) e.discordJoin = 'Please join the Discord server first'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validate2 = () => {
    const e: Errors = {}
    if (!form.projectName.trim()) e.projectName = 'Required'
    if (form.projectDesc.trim().length < 20)
      e.projectDesc = 'Please describe your project (min 20 characters)'
    if (!form.github.trim()) e.github = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = async () => {
    if (step === 1) {
      if (validate1()) { setErrors({}); setStep(2) }
      return
    }
    if (step === 2 && validate2()) {
      setErrors({})
      setSubmitting(true)
      setSubmitErr('')
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        const data = await res.json()
        if (!res.ok) {
          setSubmitErr(data.error ?? 'Something went wrong. Please try again.')
        } else {
          setStep('done')
        }
      } catch {
        setSubmitErr('Network error. Please try again.')
      } finally {
        setSubmitting(false)
      }
    }
  }

  const cls = `modal-panel${closing ? ' modal-panel-out' : ''}`

  return (
    <div
      className={`modal-bd${closing ? ' modal-bd-out' : ''}`}
      onClick={close}
    >
      <div
        className={cls}
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Register for Telegraph Hackathon"
        onClick={e => e.stopPropagation()}
      >

        {/* ── Header ── */}
        <div className="modal-hd">
          <div className="modal-hd-left">
            <img src="/Telegraoh-Logo.png" alt="" className="modal-sigma" aria-hidden="true" />
            <div>
              <p className="modal-hd-title">Register</p>
              {step !== 'done' && (
                <p className="modal-hd-sub">
                  {step === 1 ? 'Step 1 — About you' : 'Step 2 — Your project'}
                </p>
              )}
            </div>
          </div>
          <button className="modal-x" onClick={close} aria-label="Close">✕</button>
        </div>

        {/* ── Step progress ── */}
        {step !== 'done' && (
          <div className="modal-prog">
            <div className={`modal-prog-bar${step >= 1 ? ' on' : ''}`} />
            <div className={`modal-prog-bar${step === 2 ? ' on' : ''}`} />
          </div>
        )}

        {/* ── Body ── */}
        <div className="modal-body">

          {/* Done */}
          {step === 'done' && (
            <div className="modal-done" key="done">
              <img src="/Telegraoh-Logo.png" alt="" className="done-sigma" />
              <p className="done-title">You're registered.</p>
              <p className="done-sub">
                We'll reach out to <strong>{form.email}</strong> with next steps.<br />
                Build something incredible.
              </p>
              <button className="btn-fill" onClick={close}>Close</button>
            </div>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <div className="modal-fields" key="s1">

              <Field label="Full Name" id="r-name" error={errors.name}>
                <input
                  id="r-name"
                  className={`mi${errors.name ? ' mi-e' : ''}`}
                  placeholder="Satoshi Nakamoto"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                />
              </Field>

              <Field label="Email Address" id="r-email" error={errors.email}>
                <input
                  id="r-email"
                  type="email"
                  className={`mi${errors.email ? ' mi-e' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                />
              </Field>

              {/* Type radio */}
              <Field label="Participating as">
                <div className="radio-row">
                  {(['individual', 'team'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      className={`radio-opt${form.type === t ? ' radio-on' : ''}`}
                      onClick={() => set('type', t)}
                    >
                      <span className="radio-pip" />
                      {t === 'individual' ? 'Individual' : 'Organization / Team'}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Conditional team fields */}
              {form.type === 'team' && (
                <div className="two-col">
                  <Field label="Organization / Team Name" id="r-org" error={errors.orgName}>
                    <input
                      id="r-org"
                      className={`mi${errors.orgName ? ' mi-e' : ''}`}
                      placeholder="Acme Labs"
                      value={form.orgName}
                      onChange={e => set('orgName', e.target.value)}
                    />
                  </Field>
                  <Field label="Number of Developers">
                    <div className="chip-row">
                      {TEAM_SIZES.map(s => (
                        <button
                          key={s}
                          type="button"
                          className={`sm-chip${form.teamSize === s ? ' sm-chip-on' : ''}`}
                          onClick={() => set('teamSize', s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              )}

              {/* Experience level */}
              <Field label="Experience Level">
                <div className="radio-row">
                  {LEVELS.map(({ v, label }) => (
                    <button
                      key={v}
                      type="button"
                      className={`radio-opt${form.level === v ? ' radio-on' : ''}`}
                      onClick={() => set('level', v)}
                    >
                      <span className="radio-pip" />
                      {label}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="two-col">
                <Field label="Base Wallet Address" id="r-wallet" optional>
                  <input
                    id="r-wallet"
                    className="mi"
                    placeholder="0x…"
                    value={form.wallet}
                    onChange={e => set('wallet', e.target.value)}
                  />
                </Field>
                <Field label="X / Twitter" id="r-twitter" optional>
                  <input
                    id="r-twitter"
                    className="mi"
                    placeholder="@handle"
                    value={form.twitter}
                    onChange={e => set('twitter', e.target.value)}
                  />
                </Field>
              </div>

              <Field label="Discord Handle" id="r-discord" error={errors.discord}>
                <input
                  id="r-discord"
                  className={`mi${errors.discord ? ' mi-e' : ''}`}
                  placeholder="username"
                  value={form.discord}
                  onChange={e => set('discord', e.target.value)}
                />
              </Field>

              <div className="mf">
                <a
                  href={DISCORD_INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-discord-join${discordJoined ? ' btn-discord-joined' : ''}`}
                  onClick={() => setDiscordJoined(true)}
                >
                  {discordJoined
                    ? '✓ Discord Joined'
                    : '↗ Join Discord Server'}
                </a>
                {errors.discordJoin && <p className="mf-err">{errors.discordJoin}</p>}
              </div>

            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="modal-fields" key="s2">

              <Field label="Project Name" id="r-pname" error={errors.projectName}>
                <input
                  id="r-pname"
                  className={`mi${errors.projectName ? ' mi-e' : ''}`}
                  placeholder="My Intelligence App"
                  value={form.projectName}
                  onChange={e => set('projectName', e.target.value)}
                />
              </Field>

              <Field label="Subnets you plan to use" optional>
                <div className="subnet-grid">
                  {SUBNETS.map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`subnet-chip${form.subnets.includes(s) ? ' subnet-on' : ''}`}
                      onClick={() => toggleSubnet(s)}
                    >
                      <span className="subnet-chk">
                        {form.subnets.includes(s) ? '✓' : ''}
                      </span>
                      {s}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Project Description" id="r-desc" error={errors.projectDesc}>
                <textarea
                  id="r-desc"
                  className={`mi mi-ta${errors.projectDesc ? ' mi-e' : ''}`}
                  placeholder="Describe what you're building and how you'll use Telegraph's verified inference layer…"
                  rows={4}
                  value={form.projectDesc}
                  onChange={e => set('projectDesc', e.target.value)}
                />
              </Field>

              <Field label="Tech Stack" id="r-stack" optional>
                <input
                  id="r-stack"
                  className="mi"
                  placeholder="React, Solidity, Python, Next.js…"
                  value={form.techStack}
                  onChange={e => set('techStack', e.target.value)}
                />
              </Field>

              <Field label="GitHub Repository" id="r-github" error={errors.github}>
                <input
                  id="r-github"
                  className={`mi${errors.github ? ' mi-e' : ''}`}
                  placeholder="github.com/you/repo"
                  value={form.github}
                  onChange={e => set('github', e.target.value)}
                />
              </Field>

            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {step !== 'done' && (
          <div className="modal-ft" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '10px' }}>
            {submitErr && <p className="mf-err" style={{ textAlign: 'center' }}>{submitErr}</p>}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {step === 2
                ? <button className="modal-back" onClick={() => { setErrors({}); setSubmitErr(''); setStep(1) }}>← Back</button>
                : <span />
              }
              <button className="btn-register" onClick={handleNext} disabled={submitting}>
                {submitting ? 'Submitting…' : step === 1 ? 'Continue →' : 'Submit Registration'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
