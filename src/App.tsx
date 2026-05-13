import { useCallback, useState } from 'react'
import Loader           from './components/Loader'
import ParticleCanvas   from './components/ParticleCanvas'
import Nav              from './components/Nav'
import Hero             from './components/Hero'
import Ticker           from './components/Ticker'
import HowItWorks       from './components/HowItWorks'
import ApiSection       from './components/ApiSection'
import PrizesSection    from './components/PrizesSection'
import Footer           from './components/Footer'
import RegisterModal    from './components/RegisterModal'

export default function App() {
  const [loaded,       setLoaded]       = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const onLoaderDone   = useCallback(() => setLoaded(true),        [])
  const openRegister   = useCallback(() => setShowRegister(true),  [])
  const closeRegister  = useCallback(() => setShowRegister(false), [])

  return (
    <>
      {!loaded && <Loader onComplete={onLoaderDone} />}

      {/* Particle canvas always mounted so it's warm when loader exits */}
      <ParticleCanvas />

      <div className="site">
        <Nav   onRegister={openRegister} />
        <Hero  onRegister={openRegister} />
        <Ticker />
        <HowItWorks />
        <div className="rule" />
        <ApiSection />
        <div className="rule" />
        <PrizesSection />
        <Footer />
      </div>

      {showRegister && <RegisterModal onClose={closeRegister} />}
    </>
  )
}
