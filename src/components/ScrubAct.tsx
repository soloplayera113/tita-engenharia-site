import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { ReactNode } from "react"

gsap.registerPlugin(ScrollTrigger)

export interface ActChapter {
  kicker: string
  title: ReactNode
  body: string
}

interface Props {
  id?: string
  roman: string
  label: string
  vh?: number
  videoA: { sources: string[]; poster?: string }
  videoB?: { sources: string[]; poster?: string }
  chapters: ActChapter[]
}

export default function ScrubAct({ id, roman, label, vh = 520, videoA, videoB, chapters }: Props) {
  const root = useRef<HTMLElement>(null)
  const va = useRef<HTMLVideoElement>(null)
  const vb = useRef<HTMLVideoElement>(null)
  const idx = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLSpanElement>(null)
  const chLabel = useRef<HTMLSpanElement>(null)
  const progress = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chEls = gsap.utils.toArray<HTMLElement>(".act-ch", root.current!)
      const barT = root.current!.querySelector(".act-bar-t")
      const barB = root.current!.querySelector(".act-bar-b")

      gsap.set(chEls, { autoAlpha: 0 })
      if (vb.current) gsap.set(vb.current, { autoAlpha: 0 })

      const n = chapters.length
      const seg = 2
      const len = n * seg + 1

      const setFill = gsap.quickSetter(fill.current, "scaleY")

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            progress.current = self.progress
            setFill(self.progress)
            if (chLabel.current) {
              const cur = Math.min(n, Math.floor(self.progress * 0.999 * n) + 1)
              chLabel.current.textContent = `${String(cur).padStart(2, "0")} / ${String(n).padStart(2, "0")}`
            }
          },
        },
      })

      /* barras de cinema entram */
      tl.fromTo(barT, { scaleY: 0 }, { scaleY: 1, transformOrigin: "top center", duration: 0.4, ease: "power2.out" }, 0)
      tl.fromTo(barB, { scaleY: 0 }, { scaleY: 1, transformOrigin: "bottom center", duration: 0.4, ease: "power2.out" }, 0)

      /* capítulos */
      chEls.forEach((el, i) => {
        const at = 0.55 + i * seg
        tl.fromTo(
          el,
          { autoAlpha: 0, y: 90, filter: "blur(12px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" },
          at
        )
        tl.to(el, { autoAlpha: 0, y: -90, filter: "blur(10px)", duration: 0.5, ease: "power2.in" }, at + 1.15)
      })

      /* crossfade para o segundo vídeo */
      if (vb.current) {
        tl.to(vb.current, { autoAlpha: 1, duration: 1.4, ease: "power2.inOut" }, n * seg * 0.46)
      }

      /* numeral gigante de fundo com parallax */
      tl.fromTo(idx.current, { yPercent: -14 }, { yPercent: 14, ease: "none", duration: len }, 0)

      /* push-in cinematográfico nos vídeos */
      tl.fromTo(va.current, { scale: 1 }, { scale: 1.1, ease: "none", duration: len }, 0)
      if (vb.current) {
        tl.fromTo(vb.current, { scale: 1.14 }, { scale: 1.02, ease: "none", duration: len }, 0)
      }

      /* barras de cinema saem */
      tl.to(barT, { scaleY: 0, transformOrigin: "top center", duration: 0.35, ease: "power2.in" }, len - 0.35)
      tl.to(barB, { scaleY: 0, transformOrigin: "bottom center", duration: 0.35, ease: "power2.in" }, len - 0.35)
      tl.to({}, { duration: 0.01 }, len)
    }, root)

    /* scrub suave do vídeo (lerp no currentTime) */
    const tick = () => {
      const p = progress.current
      if (p <= 0 || p >= 1) return
      const list: (HTMLVideoElement | null)[] = [va.current, vb.current]
      for (const v of list) {
        if (!v) continue
        const d = v.duration
        if (!d || Number.isNaN(d)) continue
        const target = p * d
        const diff = target - v.currentTime
        if (Math.abs(diff) > 0.0005) {
          v.currentTime = Math.min(Math.max(v.currentTime + diff * 0.14, 0), Math.max(d - 0.02, 0))
        }
      }
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      ctx.revert()
    }
  }, [chapters])

  return (
    <section ref={root} id={id} className="relative" style={{ height: `${vh}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        {/* vídeo A */}
        <video
          ref={va}
          className="absolute inset-0 h-full w-full object-cover brightness-[0.82] saturate-[1.05]"
          muted
          playsInline
          preload="auto"
          poster={videoA.poster}
          disablePictureInPicture
        >
          {videoA.sources.map((s) => (
            <source key={s} src={s} type="video/mp4" />
          ))}
        </video>

        {/* vídeo B (crossfade) */}
        {videoB && (
          <video
            ref={vb}
            className="absolute inset-0 h-full w-full object-cover brightness-[0.82] saturate-[1.05]"
            muted
            playsInline
            preload="auto"
            poster={videoB.poster}
            disablePictureInPicture
          >
            {videoB.sources.map((s) => (
              <source key={s} src={s} type="video/mp4" />
            ))}
          </video>
        )}

        {/* vinhetas para legibilidade */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

        {/* barras de letterbox */}
        <div className="act-bar-t absolute inset-x-0 top-0 z-20 h-[7vh] origin-top bg-ink" />
        <div className="act-bar-b absolute inset-x-0 bottom-0 z-20 h-[7vh] origin-bottom bg-ink" />

        {/* numeral de fundo */}
        <div
          ref={idx}
          aria-hidden
          className="text-outline pointer-events-none absolute right-[2vw] top-1/2 z-10 -translate-y-1/2 select-none font-xwide text-[38vw] font-black leading-none opacity-20 md:opacity-25"
        >
          {roman}
        </div>

        {/* rótulo do ato */}
        <div className="absolute left-6 top-[10vh] z-30 flex items-center gap-3 md:left-10">
          <span className="size-1.5 animate-pulse rounded-full bg-accent" />
          <span className="kicker text-bone/80">{label}</span>
        </div>

        {/* progresso vertical */}
        <div className="absolute right-6 top-1/2 z-30 -translate-y-1/2 md:right-10">
          <div className="relative h-[36vh] w-px bg-bone/15">
            <span ref={fill} className="absolute inset-0 origin-top scale-y-0 bg-accent" />
          </div>
          <span
            ref={chLabel}
            className="mt-4 block -translate-x-1/2 rotate-90 font-mono text-[10px] tracking-[0.3em] text-dim"
            style={{ transformOrigin: "left center" }}
          >
            01 / {String(chapters.length).padStart(2, "0")}
          </span>
        </div>

        {/* capítulos */}
        {chapters.map((c, i) => (
          <div
            key={i}
            className="act-ch absolute bottom-[13vh] left-6 right-14 z-30 will-change-[transform,opacity] md:left-14 md:right-auto md:max-w-[46rem]"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent-text">{c.kicker}</span>
              <span className="h-px w-10 bg-accent/70" />
            </div>
            <h3 className="mt-5 font-xwide text-[clamp(2.3rem,6.4vw,5.8rem)] font-black uppercase leading-[0.88] tracking-[-0.02em]">
              {c.title}
            </h3>
            <p className="mt-6 max-w-md text-base leading-relaxed text-bone/70 md:text-lg">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
