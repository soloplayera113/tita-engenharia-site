import { useCallback, useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

import { scrollCtl } from "./lib/scroll"
import { MEDIA } from "./lib/media"

import Preloader from "./components/Preloader"
import Cursor from "./components/Cursor"
import Nav from "./components/Nav"
import Hero from "./components/Hero"
import Marquee from "./components/Marquee"
import ScrubAct, { type ActChapter } from "./components/ScrubAct"
import Manifesto from "./components/Manifesto"
import Projects from "./components/Projects"
import Stats from "./components/Stats"
import Process from "./components/Process"
import Footer from "./components/Footer"

gsap.registerPlugin(ScrollTrigger)

const ACT1_CHAPTERS: ActChapter[] = [
  {
    kicker: "Capítulo 01 — Diagnóstico",
    title: (
      <>
        Cada caso começa<br />
        com uma boa{" "}
        <em className="font-serif font-medium lowercase italic tracking-normal text-accent-text">análise.</em>
      </>
    ),
    body: "Entendemos a necessidade e avaliamos a situação do imóvel ou projeto para orientar os próximos passos com clareza técnica.",
  },
  {
    kicker: "Capítulo 02 — Projetos",
    title: (
      <>
        Arquitetura, estrutura<br />e{" "}
        <em className="font-serif font-medium lowercase italic tracking-normal text-accent-text">integração.</em>
      </>
    ),
    body: "Elaboramos projetos arquitetônicos e complementares, incluindo estrutura, elétrica e hidrossanitária, conforme o escopo definido para cada demanda.",
  },
  {
    kicker: "Capítulo 03 — Acompanhamento",
    title: (
      <>
        Da orientação<br />
        à entrega{" "}
        <em className="font-serif font-medium lowercase italic tracking-normal text-accent-text">técnica.</em>
      </>
    ),
    body: "Quando aplicável, organizamos a documentação para protocolo e acompanhamos a análise e eventuais solicitações dos órgãos competentes.",
  },
]

const ACT2_CHAPTERS: ActChapter[] = [
  {
    kicker: "Ato II — Segurança e consultoria",
    title: (
      <>
        <span className="text-outline-accent">SST</span>
      </>
    ),
    body: "Apoio a pequenas empresas e obras com PGR, LTCAT, eSocial SST e organização documental, de acordo com a necessidade e o escopo contratado.",
  },
  {
    kicker: "Consultoria — Orientação técnica",
    title: (
      <>
        Decisões com<br />mais{" "}
        <em className="font-serif font-medium lowercase italic tracking-normal text-accent-text">clareza.</em>
      </>
    ),
    body: "Analisamos demandas relacionadas a imóveis e projetos e orientamos a organização dos próximos passos técnicos.",
  },
]

export default function App() {
  const [started, setStarted] = useState(false)
  const onDone = useCallback(() => setStarted(true), [])
  const topBar = useRef<HTMLSpanElement>(null)

  /* Lenis + GSAP em perfeita sincronia */
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    scrollCtl.lenis = lenis
    lenis.stop()

    lenis.on("scroll", ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      scrollCtl.lenis = null
    }
  }, [])

  useEffect(() => {
    if (!started) return
    scrollCtl.lenis?.start()
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => clearTimeout(t)
  }, [started])

  /* barra de progresso global */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(topBar.current, { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Preloader onDone={onDone} />
      <Cursor />

      {/* progresso global */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px]">
        <span ref={topBar} className="block h-full w-full origin-left scale-x-0 bg-accent" />
      </div>

      <Nav started={started} />

      <main className="relative">
        <Hero started={started} />
        <Marquee />

        <ScrubAct
          id="obra"
          roman="I"
          label="Ato I — Soluções técnicas"
          vh={560}
          videoA={MEDIA.act1a}
          videoB={MEDIA.act1b}
          chapters={ACT1_CHAPTERS}
        />

        <Manifesto />
        <Projects />
        <Stats />

        <ScrubAct
          roman="II"
          label="Ato II — Segurança e consultoria"
          vh={440}
          videoA={MEDIA.act2}
          chapters={ACT2_CHAPTERS}
        />

        <Process />
        <Footer started={started} />
      </main>

      <div className="grain" aria-hidden />
    </>
  )
}
