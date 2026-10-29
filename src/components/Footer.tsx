import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { MEDIA } from "../lib/media"
import { scrollToId } from "../lib/scroll"

gsap.registerPlugin(ScrollTrigger)

export default function Footer({ started }: { started: boolean }) {
  const root = useRef<HTMLElement>(null)
  const btn = useRef<HTMLAnchorElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-rv",
        { y: 70, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      )

      gsap.fromTo(
        ".foot-mark",
        { yPercent: 30 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: ".foot-mark", start: "top bottom", end: "bottom bottom", scrub: 1 },
        }
      )
    }, root)

    /* botão magnético */
    const el = btn.current
    if (el && window.matchMedia("(pointer: fine)").matches) {
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" })
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" })
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35)
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35)
      }
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" })
      }
      el.addEventListener("mousemove", onMove)
      el.addEventListener("mouseleave", onLeave)
      ctx.add(() => {
        el.removeEventListener("mousemove", onMove)
        el.removeEventListener("mouseleave", onLeave)
      })
    }

    return () => ctx.revert()
  }, [])

  /* pausa o vídeo de fundo quando sai de cena */
  useEffect(() => {
    if (!videoRef.current) return
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        const v = videoRef.current
        if (!v) return
        if (self.isActive) v.play().catch(() => {})
        else v.pause()
      },
    })
    return () => st.kill()
  }, [])

  return (
    <footer ref={root} id="contato" className="relative overflow-hidden">
      {/* CTA */}
      <div className="relative flex min-h-[95svh] flex-col items-center justify-center px-6 py-28 text-center md:px-10">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          muted
          loop
          playsInline
          autoPlay={started}
          preload="metadata"
          poster={MEDIA.cta.poster}
        >
          {MEDIA.cta.sources.map((s) => (
            <source key={s} src={s} type="video/mp4" />
          ))}
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />

        <div className="relative z-10 flex flex-col items-center">
          <p className="cta-rv kicker text-accent-text">Atendimento em Altamira-PA e região do Xingu</p>

          <h2 className="mt-8 font-xwide font-black uppercase leading-[0.88] tracking-[-0.03em]">
            <span className="cta-rv block text-[clamp(2.6rem,8vw,8.5rem)]">Vamos entender</span>
            <span className="cta-rv block text-[clamp(2.6rem,8vw,8.5rem)]">
              a sua demanda{" "}
              <em className="font-serif font-medium lowercase italic tracking-normal text-accent-text">técnica.</em>
            </span>
          </h2>

          <a
            ref={btn}
            href="https://wa.me/5593992350737"
            data-cursor="IR"
            className="group mt-14 grid size-36 place-items-center rounded-full border border-bone/30 transition-colors duration-500 hover:border-accent hover:bg-accent md:size-44"
          >
            <span className="flex flex-col items-center gap-2 transition-colors duration-500 group-hover:text-bone">
              <ArrowUpRight className="size-7 transition-transform duration-500 group-hover:rotate-45 md:size-9" />
              <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Conversar no WhatsApp</span>
            </span>
          </a>

          <a
            href="mailto:engkayomoreira@gmail.com"
            className="cta-rv link-line mt-12 font-serif text-2xl italic text-bone/85 md:text-4xl"
          >
            engkayomoreira@gmail.com
          </a>
        </div>
      </div>

      {/* rodapé */}
      <div className="relative border-t border-line bg-ink px-6 pt-16 md:px-10">
        <div className="grid gap-12 pb-20 md:grid-cols-4">
          <div>
            <p className="kicker text-dim">Escritório</p>
            <p className="mt-4 text-sm leading-relaxed text-bone/80">
              Altamira — Pará
              <br />
              Atendimento na região do Xingu
            </p>
          </div>
          <div>
            <p className="kicker text-dim">Contato</p>
            <p className="mt-4 space-y-2 text-sm text-bone/80">
              <a href="mailto:engkayomoreira@gmail.com" className="link-line block w-fit">engkayomoreira@gmail.com</a>
              <a href="https://wa.me/5593992350737" className="link-line block w-fit">WhatsApp · +55 (93) 99235-0737</a>
            </p>
          </div>
          <div>
            <p className="kicker text-dim">Região de atendimento</p>
            <p className="mt-4 space-y-2 text-sm text-bone/80">
              {["Altamira — PA", "Região do Xingu", "Pequenas empresas e obras"].map((s) => (
                <a key={s} href="#" onClick={(e) => e.preventDefault()} className="link-line flex w-fit items-center gap-2">
                  {s}
                  <ArrowUpRight className="size-3.5 text-accent-text" />
                </a>
              ))}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="kicker text-dim">Serviços</p>
              <p className="mt-4 space-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70">
                <span className="block">Regularização de imóveis</span>
                <span className="block">Projetos técnicos</span>
                <span className="block">SST e consultoria</span>
              </p>
            </div>
            <button
              onClick={() => scrollToId("#top")}
              className="group mt-8 flex w-fit items-center gap-3 border border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 hover:border-accent hover:text-accent-text"
            >
              Voltar ao topo
              <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* wordmark gigante */}
        <div className="select-none overflow-hidden pb-2">
          <div className="foot-mark mask-fade-b text-center font-xwide font-black uppercase leading-[0.78] tracking-[-0.03em] will-change-transform">
            <span className="block text-[18.5vw]">
              Titã<sup className="align-super text-[0.18em] text-accent-text">®</sup>
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-line py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-dim md:flex-row md:items-center">
          <span>© 2026 Titã Engenharia</span>
          
          <span>Altamira — Pará · Região do Xingu</span>
        </div>
      </div>
    </footer>
  )
}
