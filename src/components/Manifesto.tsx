import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Asterisk } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

type Word = { t: string; serif?: boolean }

const PHRASE: Word[] = [
  { t: "Engenharia" },
  { t: "próxima" },
  { t: "de" },
  { t: "você." },
  { t: "Regularização," },
  { t: "projetos" },
  { t: "e" },
  { t: "segurança" },
  { t: "do" },
  { t: "trabalho,", serif: true },
  { t: "com" },
  { t: "orientação" },
  { t: "técnica" },
  { t: "em" },
  { t: "cada" },
  { t: "etapa." },
  { t: "Atuação" },
  { t: "em" },
  { t: "Altamira" },
  { t: "e" },
  { t: "na" },
  { t: "região" },
  { t: "do" },
  { t: "Xingu.", serif: true },
]

export default function Manifesto() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mani-word",
        { opacity: 0.13 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 65%",
            scrub: 0.8,
          },
        }
      )
      gsap.fromTo(
        ".mani-head",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-5xl">
        <div className="mani-head flex items-center gap-4">
          <Asterisk className="spin-slow size-6 text-accent-text" strokeWidth={1.5} />
          <span className="kicker text-dim">Titã Engenharia — Atuação</span>
        </div>

        <p className="mt-10 font-wide text-[clamp(1.9rem,4.4vw,4rem)] font-semibold leading-[1.15] tracking-[-0.01em]">
          {PHRASE.map((w, i) => (
            <span
              key={i}
              className={`mani-word inline-block will-change-[opacity] ${
                w.serif ? "font-serif font-medium italic tracking-normal text-accent-text" : ""
              }`}
            >
              {w.t}
              {"\u00A0"}
            </span>
          ))}
        </p>

        <div className="mani-head mt-14 flex items-center gap-4">
          <span className="h-px w-16 bg-line" />
          <span className="font-serif text-lg italic text-dim">Titã Engenharia · Altamira-PA</span>
        </div>
      </div>
    </section>
  )
}
