import { useEffect, useRef } from "react"
import gsap from "gsap"

const BRAND = "TITÃ".split("")

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const num = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { v: 0 }
      const tl = gsap.timeline()

      tl.fromTo(
        ".pl-char",
        { yPercent: 130 },
        { yPercent: 0, duration: 1.1, stagger: 0.055, ease: "power4.out" },
        0.25
      )
        .to(
          counter,
          {
            v: 100,
            duration: 2.3,
            ease: "power2.inOut",
            onUpdate: () => {
              if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, "0")
            },
          },
          0.35
        )
        .fromTo(".pl-line span", { scaleX: 0 }, { scaleX: 1, duration: 2.3, ease: "power2.inOut" }, 0.35)
        .fromTo(".pl-meta", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 }, 0.7)
        .to(".pl-char", { yPercent: -130, duration: 0.65, stagger: 0.04, ease: "power3.in" }, 2.85)
        .to(".pl-meta", { autoAlpha: 0, y: -12, duration: 0.4, ease: "power2.in" }, 2.85)
        .to(num.current, { autoAlpha: 0, y: -20, duration: 0.4, ease: "power2.in" }, 2.85)
        .to(
          root.current,
          {
            yPercent: -100,
            duration: 1.05,
            ease: "power4.inOut",
            onStart: () => onDone(),
          },
          3.45
        )
        .set(root.current, { display: "none" })
    }, root)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-6 md:px-10 md:py-8">
      {/* top line */}
      <div className="pl-line absolute inset-x-0 top-0 h-px bg-line">
        <span className="block h-full w-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
      </div>

      <div className="pl-meta flex items-center justify-between pt-2">
        <span className="kicker text-dim">TITÃ ENGENHARIA</span>
        <span className="kicker text-dim">ALTAMIRA — PA / XINGU</span>
      </div>

      <div className="flex items-center justify-center">
        <h1 className="flex overflow-hidden font-xwide text-[clamp(3rem,10vw,9rem)] font-black uppercase leading-none tracking-[-0.02em]">
          {BRAND.map((c, i) => (
            <span key={i} className="pl-char inline-block will-change-transform">
              {c}
            </span>
          ))}
          <span className="pl-char inline-block align-super text-[0.3em] text-accent-text">®</span>
        </h1>
      </div>

      <div className="flex items-end justify-between">
        <div className="pl-meta max-w-[16rem]">
          <p className="font-serif text-lg italic leading-snug text-dim md:text-xl">
            Orientação técnica para imóveis, projetos e negócios.
          </p>
        </div>
        <div className="flex items-start font-xwide font-black leading-none">
          <span ref={num} className="text-[clamp(4.5rem,14vw,11rem)] tabular-nums tracking-[-0.04em]">
            000
          </span>
          <span className="mt-2 text-[1.2rem] text-accent-text md:mt-4">%</span>
        </div>
      </div>
    </div>
  )
}
