import type Lenis from "lenis"

export const scrollCtl: { lenis: Lenis | null } = { lenis: null }

export function scrollToId(id: string) {
  const lenis = scrollCtl.lenis
  if (!lenis) return
  if (id === "#top") {
    lenis.scrollTo(0, { duration: 1.6 })
    return
  }
  const el = document.querySelector(id)
  if (el) lenis.scrollTo(el as HTMLElement, { duration: 1.9, offset: 0 })
}
