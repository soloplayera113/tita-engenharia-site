import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { v: 4, label: "Frentes de atuação", prefix: "", dec: 0 },
  { v: 6, label: "Etapas de atendimento", prefix: "", dec: 0 },
  { v: 4, label: "Disciplinas de projeto", prefix: "", dec: 0 },
  { v: 3, label: "Serviços de SST listados", prefix: "", dec: 0 },
]

export default function Stats() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-n").forEach((el) => {
        const end = parseFloat(el.dataset.v || "0")
        const dec = parseInt(el.dataset.d || "0", 10)
        const o = { v: 0 }
        gsap.to(o, {
          v: end,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = o.v.toFixed(dec).replace(".", ",")
          },
        })
      })

      gsap.fromTo(
        ".stat-cell",
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      )

      gsap.utils.toArray<HTMLElement>(".stat-bar").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.6,
            ease: "power4.inOut",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="numeros" className="relative border-y border-line">
      <div className="flex flex-wrap items-end justify-between gap-6 px-6 pb-14 pt-24 md:px-10">
        <p className="kicker text-dim">A Titã — em dados</p>
        <p className="max-w-md font-serif text-xl italic leading-snug text-dim md:text-2xl">
          Clareza técnica para cada etapa do seu imóvel, projeto ou negócio.
        </p>
      </div>

      <div className="grid md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={i}
            className={`stat-cell relative px-6 py-12 md:px-10 md:py-16 ${
              i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""
            }`}
          >
            <span className="stat-bar absolute left-6 right-6 top-0 block h-[3px] origin-left bg-accent md:left-10 md:right-10" />
            <div className="flex items-start font-xwide font-black leading-none tracking-[-0.03em]">
              {s.prefix && <span className="mr-1 text-[clamp(1.6rem,3vw,2.6rem)] text-accent-text">{s.prefix}</span>}
              <span
                className="stat-n text-[clamp(4.5rem,9vw,8.5rem)] tabular-nums"
                data-v={s.v}
                data-d={s.dec}
              >
                0
              </span>
            </div>
            <p className="mt-5 kicker text-dim">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
