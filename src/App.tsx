import { useCallback, useState } from 'react'
import Loader           from './components/Loader'
import ParticleCanvas   from './components/ParticleCanvas'
import Nav              from './components/Nav'
import Hero             from './components/Hero'
import Ticker           from './components/Ticker'
import HowItWorks       from './components/HowItWorks'
import ApiSection       from './components/ApiSection'
import Footer           from './components/Footer'
import RegisterModal    from './components/RegisterModal'
import RulesModal       from './components/RulesModal'

export default function App() {
  const [loaded,      setLoaded]      = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showRules,   setShowRules]   = useState(false)

  const onLoaderDone  = useCallback(() => setLoaded(true),         [])
  const openRegister  = useCallback(() => setShowRegister(true),   [])
  const closeRegister = useCallback(() => setShowRegister(false),  [])
  const openRules     = useCallback(() => setShowRules(true),      [])
  const closeRules    = useCallback(() => setShowRules(false),     [])

  return (
    <>
      {!loaded && <Loader onComplete={onLoaderDone} />}

      {/* Sculpture behind particle canvas — z-index 0 keeps it below the canvas layer */}
      <img
        src="/Website/telegraph_web_10.jpg"
        className="hero-sculpture"
        alt=""
        aria-hidden="true"
      />

      {/* Particle canvas always mounted so it's warm when loader exits */}
      <ParticleCanvas />

      <div className="site">
        <Nav   onRegister={openRegister} onRules={openRules} />
        <Hero  onRegister={openRegister} />
        <Ticker />
        <HowItWorks />
        <ApiSection />
        <Footer />
      </div>

      {showRegister && <RegisterModal onClose={closeRegister} />}
      {showRules    && <RulesModal    onClose={closeRules}    />}
    </>
  )
}
