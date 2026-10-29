import { Asterisk } from "lucide-react"

const WORDS_A = ["Regularização de imóveis", "Projetos técnicos", "Segurança do trabalho"]
const WORDS_B = ["PGR", "LTCAT", "eSocial SST", "Consultoria técnica"]

function Row({ words, reverse }: { words: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <div className={`flex w-max items-center gap-10 whitespace-nowrap pr-10 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={`font-xwide uppercase leading-none ${
                reverse
                  ? "text-outline-dim text-[clamp(1.6rem,4vw,3.4rem)] font-bold"
                  : "text-[clamp(2.2rem,5.5vw,4.8rem)] font-black tracking-[-0.02em]"
              }`}
            >
              {w}
            </span>
            <Asterisk
              strokeWidth={1.25}
              className={reverse ? "size-8 text-dim/50" : "size-10 text-accent-text md:size-12"}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="relative border-y border-line bg-ink py-8 md:py-12">
      <Row words={WORDS_A} />
      <div className="mt-5">
        <Row words={WORDS_B} reverse />
      </div>
    </section>
  )
}
