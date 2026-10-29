import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MoveRight } from "lucide-react"
import { IMG } from "../lib/media"

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico",
    body: "Entendemos a necessidade e avaliamos o cenário técnico para orientar os próximos passos e estimar o custo dos serviços.",
    meta: ["Necessidade", "Cenário técnico", "Estimativa de custo"],
    img: IMG.processoConcepcao,
  },
  {
    n: "02",
    title: "Levantamento",
    body: "Reunimos as informações e a documentação necessárias para analisar a demanda e definir o escopo do trabalho.",
    meta: ["Informações", "Documentação", "Escopo"],
    img: IMG.processoFundacao,
  },
  {
    n: "03",
    title: "Projeto e documentos",
    body: "Elaboramos projetos e documentos técnicos de acordo com o escopo definido para o imóvel, a obra ou o negócio.",
    meta: ["Arquitetura", "Projetos complementares", "SST"],
    img: IMG.processoEstrutura,
  },
  {
    n: "04",
    title: "Protocolo e acompanhamento",
    body: "Quando aplicável, encaminhamos a documentação aos órgãos competentes e acompanhamos a análise e eventuais solicitações.",
    meta: ["Protocolo quando aplicável", "Análise", "Acompanhamento"],
    img: IMG.processoEnvelope,
  },
  {
    n: "05",
    title: "Entrega técnica",
    body: "Concluímos o escopo contratado e organizamos a entrega da documentação técnica correspondente ao serviço.",
    meta: ["Escopo contratado", "Documentos técnicos", "Entrega organizada"],
    img: IMG.processoEntrega,
  },
]

export default function Process() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const getX = () =>
        -(track.current!.scrollWidth - window.innerWidth + (window.innerWidth >= 768 ? 88 : 24))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(track.current, { x: getX, ease: "none" }, 0)
      tl.fromTo(fill.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0)

      gsap.fromTo(
        ".proc-intro",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 60%" },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="processo" className="relative" style={{ height: "420vh" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* trilho horizontal */}
        <div ref={track} className="flex w-max items-stretch gap-8 pl-6 pr-6 will-change-transform md:gap-14 md:pl-10">
          {/* painel introdutório */}
          <div className="flex w-[82vw] shrink-0 flex-col justify-center md:w-[34vw]">
            <p className="proc-intro kicker text-dim">Método Titã — orientação técnica</p>
            <h2 className="proc-intro mt-6 font-xwide text-[clamp(2.6rem,6vw,5.4rem)] font-black uppercase leading-[0.88] tracking-[-0.02em]">
              Do diagnóstico<br />
              <em className="font-serif font-medium lowercase italic tracking-normal text-accent-text">à entrega.</em>
            </h2>
            <p className="proc-intro mt-6 max-w-xs text-base leading-relaxed text-dim">
              Um percurso claro para conduzir cada demanda. As etapas e os prazos variam conforme o escopo e a análise dos órgãos competentes.
            </p>
            <div className="proc-intro mt-10 flex items-center gap-3 text-accent-text">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em]">Continue explorando</span>
              <MoveRight className="size-5 animate-pulse" />
            </div>
          </div>

          {/* fases */}
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="group relative flex h-[62vh] w-[82vw] shrink-0 flex-col border border-line bg-coal/60 md:h-[68vh] md:w-[46vw] lg:w-[40vw]"
            >
              <div className="relative h-[46%] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[45%] transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
                />
                <span className="absolute left-4 top-4 bg-ink/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.3em] text-accent-text backdrop-blur-sm">
                  FASE {s.n}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                <div>
                  <h3 className="font-xwide text-[clamp(1.5rem,2.6vw,2.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.01em]">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-dim md:text-base">{s.body}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5">
                  {s.meta.map((m) => (
                    <span key={m} className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/70">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* painel final */}
          <div className="flex w-[70vw] shrink-0 flex-col items-start justify-center md:w-[30vw]">
            <span className="font-xwide text-[clamp(4rem,8vw,8rem)] font-black leading-none text-outline-dim">FIM</span>
            <p className="mt-4 max-w-[22rem] font-serif text-2xl italic text-dim">
              orientação técnica em cada etapa.
            </p>
          </div>
        </div>

        {/* barra de progresso */}
        <div className="absolute inset-x-6 bottom-10 md:inset-x-10">
          <div className="flex justify-between pb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
            <span>Etapas do atendimento</span>
            <span className="text-accent-text">Acompanhe o processo</span>
          </div>
          <div className="relative h-px w-full bg-line">
            <span ref={fill} className="absolute inset-0 origin-left scale-x-0 bg-accent" />
          </div>
        </div>
      </div>
    </section>
  )
}
