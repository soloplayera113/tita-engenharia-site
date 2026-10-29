import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    document.documentElement.classList.add("has-cursor")
    gsap.set([dot.current, ring.current], { x: -120, y: -120 })

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power2.out" })
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power2.out" })
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3.out" })
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3.out" })

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const labelled = t.closest<HTMLElement>("[data-cursor]")
      const interactive = t.closest("a, button")

      if (labelled) {
        gsap.to(ring.current, { scale: 3.4, duration: 0.4, ease: "power3.out" })
        gsap.to(dot.current, { scale: 0, duration: 0.3 })
        if (label.current) {
          label.current.textContent = labelled.dataset.cursor || ""
          gsap.to(label.current, { opacity: 1, duration: 0.3 })
        }
      } else if (interactive) {
        gsap.to(ring.current, { scale: 1.7, duration: 0.3, ease: "power3.out" })
        gsap.to(dot.current, { scale: 0.4, duration: 0.3 })
        gsap.to(label.current, { opacity: 0, duration: 0.2 })
      } else {
        gsap.to(ring.current, { scale: 1, duration: 0.4, ease: "power3.out" })
        gsap.to(dot.current, { scale: 1, duration: 0.3 })
        gsap.to(label.current, { opacity: 0, duration: 0.2 })
      }
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      document.documentElement.classList.remove("has-cursor")
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden>
      <div
        ref={ring}
        className="absolute -left-6 -top-6 grid size-12 place-items-center rounded-full border border-bone/50 mix-blend-difference"
      >
        <span ref={label} className="font-mono text-[6px] font-semibold uppercase tracking-[0.2em] text-bone opacity-0" />
      </div>
      <div ref={dot} className="absolute -left-1 -top-1 size-2 rounded-full bg-bone mix-blend-difference" />
    </div>
  )
}
