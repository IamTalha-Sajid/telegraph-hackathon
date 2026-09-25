'use client'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import AppBackground from '@/components/AppBackground'
import RegisterModal from '@/components/RegisterModal'
import S2Nav from './S2Nav'
import S2Footer from './S2Footer'

const RegisterCtx = createContext<(track?: string) => void>(() => {})

/** Opens the registration modal, optionally with a track preselected. */
export const useRegister = () => useContext(RegisterCtx)

export default function Shell({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<string | null>(null)
  const open = useCallback((t?: string) => setTrack(t ?? ''), [])

  return (
    <RegisterCtx.Provider value={open}>
      <div className="s2">
        <AppBackground />
        <S2Nav onRegister={() => open()} />
        <main className="s2-main">{children}</main>
        <S2Footer />
        {track !== null && <RegisterModal onClose={() => setTrack(null)} initialTrack={track} />}
      </div>
    </RegisterCtx.Provider>
  )
}

export function RegisterButton({ track, children, className = 's2-btn s2-btn-accent s2-btn-lg' }: {
  track?: string; children: ReactNode; className?: string
}) {
  const open = useRegister()
  return <button className={className} onClick={() => open(track)}>{children}</button>
}
