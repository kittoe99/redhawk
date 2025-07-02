"use client"
import { useEffect } from "react"

export function ForwardScrollToParent() {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only act when at top (scrolling up) or at bottom (scrolling down) so iframe can't scroll further
      const doc = document.documentElement
      const atTop = doc.scrollTop === 0 && e.deltaY < 0
      const atBottom = doc.scrollHeight - doc.scrollTop === doc.clientHeight && e.deltaY > 0
      if (atTop || atBottom) {
        // forward delta to parent window
        window.parent.postMessage({ iframeScrollDelta: e.deltaY }, "*")
      }
    }
    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [])
  return null
}
