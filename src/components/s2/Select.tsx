'use client'
import { useEffect, useId, useRef, useState } from 'react'

export interface Option { value: string; label: string }

/** Themed replacement for a native <select>: button + listbox, with keyboard support. */
export default function Select({ value, onChange, options, label }: {
  value: string
  onChange: (value: string) => void
  options: Option[]
  /** Accessible name, e.g. "Filter by intelligence category". */
  label: string
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const id = useId()
  const selected = options.find(o => o.value === value) ?? options[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  useEffect(() => {
    if (open) list.current?.children[active]?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  const show = () => { setActive(Math.max(0, options.findIndex(o => o.value === value))); setOpen(true) }
  const pick = (i: number) => { onChange(options[i].value); setOpen(false) }

  const onKey = (e: React.KeyboardEvent) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); show() }
      return
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(options.length - 1, a + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(0, a - 1)) }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0) }
    else if (e.key === 'End') { e.preventDefault(); setActive(options.length - 1) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(active) }
    else if (e.key === 'Escape' || e.key === 'Tab') setOpen(false)
  }

  return (
    <div className={`s2-select${open ? ' is-open' : ''}${value ? ' has-value' : ''}`} ref={root}>
      <button
        type="button"
        className="s2-select-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${label}: ${selected.label}`}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
      >
        <span className="s2-select-value">{selected.label}</span>
        <svg className="s2-select-chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
      </button>
      {open && (
        <ul className="s2-select-list" role="listbox" id={id} aria-label={label} ref={list}>
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`${i === active ? 'is-active' : ''}${o.value === value ? ' is-selected' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseDown={e => { e.preventDefault(); pick(i) }}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
