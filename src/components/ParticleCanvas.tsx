'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
  phase: number   // unique phase offset for wave
}

interface TrailPoint {
  x: number
  y: number
  life: number
  r: number
}

/* ── Config ──────────────────────────────────── */
const MOUSE_R     = 120
const MAX_DIST    = 150
const REPEL_STR   = 0.44
const DAMPEN      = 0.962
const BASE_SPD    = 0.48
const WAVE_STR    = 0.007   // strength of sinusoidal auto-movement
const TRAIL_DECAY = 0.068
const CURSOR_R    = 10      // ring radius
const SIGMA       = 'Σ'

export default function ParticleCanvas() {
  const bgRef = useRef<HTMLCanvasElement>(null)   // particles — behind content
  const fgRef = useRef<HTMLCanvasElement>(null)   // trail + cursor — above content

  useEffect(() => {
    const bg = bgRef.current
    const fg = fgRef.current
    if (!bg || !fg) return
    const bgCtx = bg.getContext('2d')
    const fgCtx = fg.getContext('2d')
    if (!bgCtx || !fgCtx) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches

    let W = 0
    let H = 0
    const mouse = { x: -999, y: -999, px: -999, py: -999 }
    let particles: Particle[] = []
    let trail: TrailPoint[]   = []
    let rafId        = 0
    let cursorAngle  = 0
    let cursorScale  = 1.0
    let cursorTarget = 1.0

    const buildParticles = () => {
      const count = Math.min(220, Math.round((W * H) / 5500))
      particles = Array.from({ length: count }, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        vx:    (Math.random() - 0.5) * BASE_SPD,
        vy:    (Math.random() - 0.5) * BASE_SPD,
        r:     Math.random() * 1.3 + 0.35,
        a:     Math.random() * 0.42 + 0.13,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      W = bg.width = fg.width   = window.innerWidth
      H = bg.height = fg.height = window.innerHeight
      buildParticles()
    }

    /* ── Physics ─────────────────────────────── */
    const step = () => {
      const now = performance.now() * 0.001
      cursorAngle  += 0.009
      cursorScale  += (cursorTarget - cursorScale) * 0.16

      for (const p of particles) {
        /* --- wave auto-motion (sinusoidal field) --- */
        p.vx += Math.sin(now * 0.38 + p.phase + p.y * 0.006) * WAVE_STR
        p.vy += Math.cos(now * 0.29 + p.phase + p.x * 0.006) * WAVE_STR

        /* --- mouse repulsion --- */
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < MOUSE_R * MOUSE_R && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const f = ((MOUSE_R - d) / MOUSE_R) * REPEL_STR
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }

        p.vx *= DAMPEN
        p.vy *= DAMPEN
        p.x  += p.vx
        p.y  += p.vy

        if (p.x < -4)    p.x = W + 4
        if (p.x > W + 4) p.x = -4
        if (p.y < -4)    p.y = H + 4
        if (p.y > H + 4) p.y = -4
      }

      /* --- trail spawning --- */
      if (mouse.x > -900) {
        const dx   = mouse.x - mouse.px
        const dy   = mouse.y - mouse.py
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 3.5) {
          const steps = Math.min(Math.ceil(dist / 5), 6)
          for (let s = 1; s <= steps; s++) {
            trail.push({
              x:    mouse.px + (dx / steps) * s,
              y:    mouse.py + (dy / steps) * s,
              life: 1.0,
              r:    Math.random() * 2.0 + 0.6,
            })
          }
          mouse.px = mouse.x
          mouse.py = mouse.y
          if (trail.length > 90) trail.splice(0, trail.length - 90)
        }
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].life -= TRAIL_DECAY
        if (trail[i].life <= 0) trail.splice(i, 1)
      }
    }

    /* ── Render ──────────────────────────────── */
    const render = () => {
      bgCtx.clearRect(0, 0, W, H)
      fgCtx.clearRect(0, 0, W, H)

      /* — BG: cursor area glow — */
      if (mouse.x > -900) {
        const g = bgCtx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200)
        g.addColorStop(0, 'rgba(255,255,255,0.04)')
        g.addColorStop(1, 'rgba(255,255,255,0)')
        bgCtx.fillStyle = g
        bgCtx.fillRect(0, 0, W, H)
      }

      /* — BG: connection lines — */
      const n = particles.length
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < MAX_DIST * MAX_DIST) {
            const d = Math.sqrt(d2)
            const t = 1 - d / MAX_DIST
            bgCtx.beginPath()
            bgCtx.moveTo(particles[i].x, particles[i].y)
            bgCtx.lineTo(particles[j].x, particles[j].y)
            bgCtx.strokeStyle = `rgba(255,255,255,${t * t * 0.11})`
            bgCtx.lineWidth   = 0.55
            bgCtx.stroke()
          }
        }
      }

      /* — BG: particle dots — */
      for (const p of particles) {
        const dx   = p.x - mouse.x
        const dy   = p.y - mouse.y
        const d    = Math.sqrt(dx * dx + dy * dy)
        const prox = d < MOUSE_R ? (1 - d / MOUSE_R) : 0

        bgCtx.beginPath()
        bgCtx.arc(p.x, p.y, p.r + prox * 2.4, 0, Math.PI * 2)
        bgCtx.fillStyle = `rgba(255,255,255,${Math.min(1, p.a + prox * 0.7)})`
        bgCtx.fill()
      }

      /* — FG: mouse trail — */
      for (const t of trail) {
        const a  = t.life
        /* soft glow halo */
        const tg = fgCtx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.r * 5)
        tg.addColorStop(0, `rgba(255,255,255,${a * 0.15})`)
        tg.addColorStop(1, 'rgba(255,255,255,0)')
        fgCtx.fillStyle = tg
        fgCtx.fillRect(t.x - t.r * 5, t.y - t.r * 5, t.r * 10, t.r * 10)
        /* core dot */
        fgCtx.beginPath()
        fgCtx.arc(t.x, t.y, t.r * a, 0, Math.PI * 2)
        fgCtx.fillStyle = `rgba(255,255,255,${a * 0.6})`
        fgCtx.fill()
      }

    }

    const frame = () => {
      step()
      render()
      rafId = requestAnimationFrame(frame)
    }

    /* ── Event handlers ──────────────────────── */
    const onMouseMove  = (e: MouseEvent) => {
      if (mouse.x === -999) { mouse.px = e.clientX; mouse.py = e.clientY }
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onMouseLeave = ()              => { mouse.x = -999; mouse.y = -999 }
    const onMouseDown  = ()              => { cursorTarget = 0.55 }
    const onMouseUp    = ()              => { cursorTarget = 1.0 }
    const onTouchMove  = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX
        mouse.y = e.touches[0].clientY
      }
    }
    const onTouchEnd = () => { mouse.x = -999; mouse.y = -999 }

    window.addEventListener('resize',     resize)
    window.addEventListener('mousemove',  onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('mousedown',  onMouseDown)
    window.addEventListener('mouseup',    onMouseUp)
    window.addEventListener('touchmove',  onTouchMove, { passive: true })
    window.addEventListener('touchend',   onTouchEnd)

    resize()
    frame()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize',     resize)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('mousedown',  onMouseDown)
      window.removeEventListener('mouseup',    onMouseUp)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [])

  const base: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  }

  return (
    <>
      <canvas ref={bgRef} style={{ ...base, zIndex: 1 }} />
      <canvas ref={fgRef} style={{ ...base, zIndex: 1001 }} />
    </>
  )
}
