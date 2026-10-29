import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MEDIA } from "../lib/media"

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ started }: { started: boolean }) {
  const root = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const fade = useRef<HTMLDivElement>(null)

  /* estado inicial antes do preloader terminar */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-line", { yPercent: 120 })
      gsap.set(".hero-in", { autoAlpha: 0, y: 26 })
      gsap.set(media.current, { scale: 1.25 })
    }, root)
    return () => ctx.revert()
  }, [])

  /* introdução cinematográfica */
  useEffect(() => {
    if (!started) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
      tl.to(media.current, { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
        .to(".hero-line", { yPercent: 0, duration: 1.5, stagger: 0.1 }, 0.15)
        .to(".hero-in", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.09, ease: "power3.out" }, 0.8)
    }, root)
    return () => ctx.revert()
  }, [started])

  /* parallax + transição do vídeo para o próximo bloco */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true }
      gsap.to(media.current, { yPercent: 14, scale: 1.12, ease: "none", scrollTrigger: st })
      gsap.to(fade.current, { opacity: 0.92, ease: "none", scrollTrigger: st })
      gsap.to(content.current, { yPercent: -24, autoAlpha: 0, ease: "none", scrollTrigger: st })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="inicio" className="relative h-[100svh] overflow-hidden">
      <div ref={media} className="absolute inset-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={MEDIA.hero.poster}
        >
          {MEDIA.hero.sources.map((s) => (
            <source key={s} src={s} type="video/mp4" />
          ))}
        </video>
        <div className="hero-mask absolute inset-0" />
        <div ref={fade} className="absolute inset-0 bg-ink opacity-0" />
      </div>

      <div ref={content} className="absolute inset-0 flex flex-col justify-end px-6 pb-24 md:px-10 md:pb-14">
        <div className="hero-in mb-6 flex items-center gap-4">
          <span className="h-px w-12 bg-accent" />
          <span className="kicker text-bone/80">Titã Engenharia · Altamira-PA · Região do Xingu</span>
        </div>

        <h1 className="font-xwide font-black uppercase leading-[0.82] tracking-[-0.03em]">
          <span className="block overflow-hidden pb-1">
            <span className="hero-line block text-[clamp(3.4rem,12.5vw,13rem)] will-change-transform">
              Engenharia
            </span>
          </span>
          <span className="block overflow-hidden pb-3">
            <span className="hero-line block text-[clamp(3.4rem,12.5vw,13rem)] will-change-transform">
              com{" "}
              <em className="font-serif font-medium lowercase italic tracking-normal text-accent-text">clareza.</em>
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="hero-in max-w-md text-base leading-relaxed text-bone/75 md:text-lg">
            Regularização de imóveis, projetos técnicos, segurança do trabalho e consultoria em Altamira-PA e na região do Xingu.
          </p>

          <div className="hero-in flex items-center gap-10">
            <div className="text-right">
              <p className="font-xwide text-3xl font-bold leading-none">04</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-dim">frentes de atuação</p>
            </div>
            <div className="h-10 w-px bg-line" />
            <div className="text-right">
              <p className="font-xwide text-3xl font-bold leading-none">06</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-dim">etapas de atendimento</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-in absolute bottom-6 left-6 flex items-center gap-3 md:left-10">
        <span className="relative block h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrolldot_1.8s_ease-in-out_infinite] bg-accent" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-dim">Role para explorar</span>
      </div>

      <div className="hero-in absolute bottom-6 right-6 hidden font-mono text-[10px] uppercase tracking-[0.35em] text-dim md:right-10 md:block">
        Altamira — PA / Região do Xingu
      </div>

      <style>{`
        @keyframes scrolldot {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(220%); }
        }
      `}</style>
    </section>
  )
}
