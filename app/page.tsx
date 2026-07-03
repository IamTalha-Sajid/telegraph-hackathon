'use client'

import { useCallback, useState } from 'react'
import Loader             from '@/components/Loader'
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

export default function Home() {
  const [loaded,       setLoaded]       = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const onLoaderDone  = useCallback(() => setLoaded(true),        [])
  const openRegister  = useCallback(() => setShowRegister(true),  [])
  const closeRegister = useCallback(() => setShowRegister(false), [])

  return (
    <>
      {!loaded && <Loader onComplete={onLoaderDone} />}

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
    </>
  )
}
