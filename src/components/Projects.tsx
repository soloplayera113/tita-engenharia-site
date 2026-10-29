import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { IMG } from "../lib/media"

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: "TITÃ-01",
    name: "Regularização de imóveis",
    tag: "Orientação, documentação e aprovação",
    loc: "Altamira-PA · Região do Xingu",
    year: "Sob demanda",
    area: "Conforme diagnóstico técnico",
    img: IMG.torreMeridiano,
    ratio: "aspect-[4/5]",
  },
  {
    id: "TITÃ-02",
    name: "Projetos arquitetônicos",
    tag: "Desenvolvimento de projetos",
    loc: "Altamira-PA · Região do Xingu",
    year: "Sob demanda",
    area: "Conforme escopo definido",
    img: IMG.quartierOrion,
    ratio: "aspect-[16/11]",
  },
  {
    id: "TITÃ-03",
    name: "Projetos complementares",
    tag: "Estrutura, elétrica e hidrossanitária",
    loc: "Altamira-PA · Região do Xingu",
    year: "Sob demanda",
    area: "Conforme escopo definido",
    img: IMG.residenciaBasalto,
    ratio: "aspect-[4/5]",
  },
  {
    id: "TITÃ-04",
    name: "SST e gestão documental",
    tag: "PGR, LTCAT e eSocial SST",
    loc: "Altamira-PA · Região do Xingu",
    year: "Conforme necessidade",
    area: "Pequenas empresas e obras",
    img: IMG.ponteGuaiuba,
    ratio: "aspect-[16/11]",
  },
  {
    id: "TITÃ-05",
    name: "Consultoria técnica",
    tag: "Análise e orientação técnica",
    loc: "Altamira-PA · Região do Xingu",
    year: "Sob demanda",
    area: "Imóveis e projetos",
    img: IMG.campusVetor,
    ratio: "aspect-[4/5]",
  },
]

export default function Projects() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* parallax interno das imagens */
      gsap.utils.toArray<HTMLElement>(".prj-media img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: "none",
            scrollTrigger: { trigger: img.closest(".prj-media"), start: "top bottom", end: "bottom top", scrub: true },
          }
        )
      })

      /* revelação dos blocos */
      gsap.utils.toArray<HTMLElement>(".prj").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".prj-rv"),
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        )
      })

      gsap.fromTo(
        ".prj-head",
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".prj-title", start: "top 82%" },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="portfolio" className="relative px-6 py-28 md:px-10 md:py-40">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-10">
        <div>
          <p className="prj-head kicker text-dim">Soluções técnicas da Titã — [05]</p>
          <h2 className="prj-title prj-head mt-6 font-xwide text-[clamp(2.6rem,7vw,7rem)] font-black uppercase leading-[0.88] tracking-[-0.02em]">
            Soluções para<br />
            cada <em className="font-serif font-medium lowercase italic tracking-normal text-accent-text">demanda.</em>
          </h2>
        </div>
        <p className="prj-head max-w-xs text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-dim">
          Altamira — PA
          <br />
          Região do Xingu
        </p>
      </div>

      {/* projetos */}
      <div className="flex flex-col gap-24 pt-20 md:gap-36 md:pt-28">
        {PROJECTS.map((p, i) => {
          const even = i % 2 === 1
          return (
            <article key={p.id} className="prj group grid items-end gap-8 md:grid-cols-12">
              {/* imagem */}
              <figure
                data-cursor="SAIBA"
                className={`prj-rv relative overflow-hidden bg-coal ${p.ratio} ${
                  even ? "order-2 md:col-span-8 md:col-start-5" : "md:col-span-8 md:col-start-1"
                }`}
              >
                <div className="prj-media absolute inset-0">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-[118%] w-full scale-100 object-cover grayscale-[35%] will-change-transform transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-30" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/90">
                  <span className="bg-ink/60 px-2 py-1 backdrop-blur-sm">{p.id}</span>
                  <span className="bg-accent px-2 py-1 text-bone opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {p.year}
                  </span>
                </div>
                <ArrowUpRight className="absolute right-4 top-4 size-8 -translate-y-2 translate-x-2 text-accent-text opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </figure>

              {/* info */}
              <div className={even ? "order-1 md:col-span-4 md:col-start-1" : "md:col-span-4 md:col-start-9"}>
                <span className="prj-rv block font-xwide text-[clamp(4rem,6vw,5.5rem)] font-black leading-none text-outline-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="prj-rv mt-4 font-xwide text-[clamp(2rem,3.6vw,3.4rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em]">
                  {p.name}
                </h3>
                <p className="prj-rv mt-3 font-serif text-xl italic text-dim">{p.tag}</p>
                <div className="prj-rv mt-6 space-y-2 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
                  <p className="flex justify-between gap-4">
                    <span>Região</span>
                    <span className="text-bone">{p.loc}</span>
                  </p>
                  <p className="flex justify-between gap-4">
                    <span>Atendimento</span>
                    <span className="text-bone">{p.year}</span>
                  </p>
                  <p className="flex justify-between gap-4">
                    <span>Escopo</span>
                    <span className="text-bone">{p.area}</span>
                  </p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
