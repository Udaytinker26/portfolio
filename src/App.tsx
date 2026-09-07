import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import EngineeringFocus from './components/EngineeringFocus'
import SkillsMatrix from './components/SkillsMatrix'
import Experience from './components/Experience'
import Projects from './components/Projects'
import ArchitectureSection from './components/ArchitectureSection'
import Stats from './components/Stats'
import Education from './components/Education'
import Certifications from './components/Certifications'
import EngineeringToolbox from './components/EngineeringToolbox'
import CurrentFocus from './components/CurrentFocus'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AnimatedGrid from './components/AnimatedGrid'
import Spotlight from './components/Spotlight'
import { useReducedMotion } from './hooks/useReducedMotion'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })

    let frame: number
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [reducedMotion])

  return (
    <div className="relative min-h-screen bg-bg">
      <Preloader onFinish={() => setLoading(false)} />
      <AnimatedGrid />
      <div className="noise-layer" aria-hidden="true" />
      <CustomCursor />
      <ScrollProgress />

      {!loading && (
        <Spotlight>
          <>
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <About />
            <EngineeringFocus />
            <SkillsMatrix />
            <Experience />
            <Projects />
            <ArchitectureSection />
            <Stats />
            <Education />
            <Certifications />
            <EngineeringToolbox />
            <CurrentFocus />
            <Contact />
          </main>
          <Footer />
          </>
        </Spotlight>
      )}
    </div>
  )
}

export default App
