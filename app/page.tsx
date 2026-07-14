'use client'

import { useCallback, useEffect, useState } from 'react'
import AppBackground      from '@/components/AppBackground'
import Nav                from '@/components/Nav'
import Hero               from '@/components/Hero'
import ScheduleSection    from '@/components/ScheduleSection'
import WhyRegisterEarly   from '@/components/WhyRegisterEarly'
import HackathonSeries    from '@/components/HackathonSeries'
import HowItWorks         from '@/components/HowItWorks'
import ApiSection         from '@/components/ApiSection'
import Footer             from '@/components/Footer'
import RegisterModal      from '@/components/RegisterModal'
import WelcomeModal       from '@/components/WelcomeModal'

export default function Home() {
  const [showRegister, setShowRegister] = useState(false)
  const [showWelcome,  setShowWelcome]  = useState(false)

  useEffect(() => {
    if (window.innerWidth > 900) setShowWelcome(true)
  }, [])

  const openRegister  = useCallback(() => setShowRegister(true),  [])
  const closeRegister = useCallback(() => setShowRegister(false), [])
  const closeWelcome  = useCallback(() => setShowWelcome(false),  [])

  return (
    <>
      <img
        src="/Website/telegraph_web_10.jpg"
        className="hero-sculpture"
        alt=""
        aria-hidden="true"
      />

      <AppBackground />

      <div className="site">
        <Nav  onRegister={openRegister} />
        <Hero onRegister={openRegister} />
        <ScheduleSection />
        <WhyRegisterEarly />
        <HackathonSeries />
        <HowItWorks />
        <ApiSection />
        <Footer />
      </div>

      {showRegister && <RegisterModal onClose={closeRegister} />}
      {showWelcome && !showRegister && (
        <WelcomeModal onClose={closeWelcome} onRegister={openRegister} />
      )}
    </>
  )
}
