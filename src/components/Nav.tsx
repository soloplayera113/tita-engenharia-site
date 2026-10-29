import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { scrollCtl, scrollToId } from "../lib/scroll"

const LINKS = [
  { n: "01", label: "Serviços", href: "#obra" },
  { n: "02", label: "Soluções", href: "#portfolio" },
  { n: "03", label: "Atuação", href: "#numeros" },
  { n: "04", label: "Etapas", href: "#processo" },
  { n: "05", label: "Contato", href: "#contato" },
]

export default function Nav({ started }: { started: boolean }) {
  const bar = useRef<HTMLElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)

  /* entrada do nav após o preloader */
  useEffect(() => {
    if (!started) return
    gsap.fromTo(
      bar.current,
      { yPercent: -110, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    )
  }, [started])

  /* esconde ao descer, revela ao subir */
  useEffect(() => {
    let last = 0
    let hidden = false
    const onScroll = () => {
      const y = window.scrollY
      const goingDown = y > last && y > 160
      if (goingDown !== hidden && !openRef.current) {
        hidden = goingDown
        gsap.to(bar.current, { yPercent: hidden ? -110 : 0, duration: 0.6, ease: "power3.out" })
      }
      last = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* menu overlay */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(overlay.current, { clipPath: "circle(0% at 94% 6%)" })
    }, overlay)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    openRef.current = open
    const tl = gsap.timeline()
    if (open) {
      tl.to(overlay.current, { clipPath: "circle(150% at 94% 6%)", duration: 1, ease: "power4.inOut" })
        .fromTo(
          ".nav-link",
          { y: 90, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07, ease: "power3.out" },
          0.35
        )
        .fromTo(".nav-meta", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.8)
      gsap.to(bar.current, { yPercent: 0, duration: 0.4 })
      scrollCtl.lenis?.stop()
    } else {
      tl.to(overlay.current, { clipPath: "circle(0% at 94% 6%)", duration: 0.8, ease: "power4.inOut" }, 0.2)
      scrollCtl.lenis?.start()
    }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    setTimeout(() => scrollToId(href), open ? 350 : 0)
  }

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-[70] px-6 py-5 md:px-10" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => go("#top")}
            className="group flex items-baseline gap-1 font-xwide text-xl font-black uppercase leading-none tracking-tight mix-blend-difference"
            aria-label="Titã Engenharia — voltar ao topo"
          >
            <svg
              viewBox="0 0 100 100"
              className="size-3.5 text-accent-text transition-transform duration-500 group-hover:-rotate-90"
              aria-hidden
            >
              <path d="M50 8 94 92H6Z" fill="currentColor" />
            </svg>
            Titã<sup className="text-[0.5em] text-accent-text">®</sup>
          </button>

          <div className="hidden items-center gap-10 md:flex">
            <span className="kicker text-dim mix-blend-difference">Titã Engenharia — Altamira-PA</span>
            <span className="kicker text-dim mix-blend-difference">Região do Xingu</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => go("#contato")}
              className="link-line hidden border border-bone/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-500 hover:border-accent hover:text-accent-text md:block"
            >
              Fale com a Titã
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="group relative grid size-12 place-items-center rounded-full border border-bone/25 mix-blend-difference"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-bone transition-all duration-500 ${
                    open ? "top-1/2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-bone transition-all duration-500 ${
                    open ? "bottom-1/2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* overlay */}
      <div ref={overlay} className="fixed inset-0 z-[65] bg-coal" style={{ clipPath: "circle(0% at 94% 6%)" }}>
        <div className="flex h-full flex-col justify-between px-6 pb-8 pt-28 md:px-10">
          <nav className="flex flex-col">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="nav-link group flex items-baseline gap-4 border-b border-line py-4 text-left md:py-6"
              >
                <span className="font-mono text-xs text-accent-text">{l.n}</span>
                <span className="font-xwide text-[clamp(2.2rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] transition-all duration-500 group-hover:translate-x-4 group-hover:text-accent-text">
                  {l.label}
                </span>
                <span className="ml-auto hidden font-serif text-xl italic text-dim opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block">
                  explorar
                </span>
              </button>
            ))}
          </nav>

          <div className="nav-meta flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="kicker text-dim">Contato técnico</p>
              <a href="mailto:engkayomoreira@gmail.com" className="link-line mt-2 block font-serif text-2xl italic md:text-3xl">
                engkayomoreira@gmail.com
              </a>
            </div>
            <p className="kicker text-dim">Altamira — PA · Região do Xingu</p>
          </div>
        </div>
      </div>
    </>
  )
}

