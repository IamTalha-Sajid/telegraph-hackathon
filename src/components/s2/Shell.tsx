'use client'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import AppBackground from '@/components/AppBackground'
import RegisterModal from '@/components/RegisterModal'
import S2Nav from './S2Nav'
import S2Footer from './S2Footer'

const RegisterCtx = createContext<() => void>(() => {})

/** Opens the registration modal. */
export const useRegister = () => useContext(RegisterCtx)

export default function Shell({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const open = useCallback(() => setOpen(true), [])

  return (
    <RegisterCtx.Provider value={open}>
      <div className="s2">
        <AppBackground />
        <S2Nav onRegister={() => open()} />
        <main className="s2-main">{children}</main>
        <S2Footer />
        {isOpen && <RegisterModal onClose={() => setOpen(false)} />}
      </div>
    </RegisterCtx.Provider>
  )
}

export function RegisterButton({ children, className = 's2-btn s2-btn-accent s2-btn-lg' }: {
  children: ReactNode; className?: string
}) {
  const open = useRegister()
  return <button className={className} onClick={open}>{children}</button>
}
