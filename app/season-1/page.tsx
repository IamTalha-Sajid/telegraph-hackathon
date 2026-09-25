'use client'

import { useCallback, useState } from 'react'
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
  const [showRegister, setShowRegister] = useState(false)

  const openRegister  = useCallback(() => setShowRegister(true),  [])
  const closeRegister = useCallback(() => setShowRegister(false), [])

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

      <a
        href="/"
        style={{
          position: 'fixed', left: 16, right: 16, bottom: 16, zIndex: 60, maxWidth: 560, margin: '0 auto',
          padding: '12px 16px', background: '#fff', color: '#000', textDecoration: 'none',
          fontSize: 13, textAlign: 'center',
        }}
      >
        You are viewing the Season I archive. Season II runs 16 Nov to 16 Dec 2026. See Season II
      </a>

      {showRegister && <RegisterModal onClose={closeRegister} />}
    </>
  )
}
