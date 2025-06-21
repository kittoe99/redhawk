"use client"

import { useEffect, useRef } from "react"

export function ScrollProgressBar() {
  const progressBarRef = useRef<HTMLDivElement>(null)
  const hawkIconRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const progressBar = progressBarRef.current
    const hawkIcon = hawkIconRef.current
    const container = containerRef.current

    if (!progressBar || !hawkIcon || !container) return

    // Update scroll progress function
    function updateScrollProgress() {
      // Calculate how far down the page we've scrolled
      const scrollPosition = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const scrollPercentage = (scrollPosition / maxScroll) * 100

      // Update the progress bar height
      progressBar.style.height = scrollPercentage + "%"

      // Update the hawk icon position
      const progressContainerHeight = container.offsetHeight
      const iconPosition = (scrollPercentage / 100) * progressContainerHeight
      hawkIcon.style.top = iconPosition + "px"
    }

    // Initial call to set position
    updateScrollProgress()

    // Listen for scroll events
    window.addEventListener("scroll", updateScrollProgress)
    window.addEventListener("resize", updateScrollProgress)

    // Cleanup event listeners
    return () => {
      window.removeEventListener("scroll", updateScrollProgress)
      window.removeEventListener("resize", updateScrollProgress)
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed top-20 left-0 h-[85vh] w-2 bg-gray-200/50 rounded-r-sm z-50">
      <div
        ref={progressBarRef}
        className="absolute top-0 left-0 w-full bg-primary-600 rounded-r-sm transition-height duration-100"
      ></div>
      <div
        ref={hawkIconRef}
        className="absolute -right-3.5 w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center text-white text-base shadow-md transition-top duration-100"
      >
        <svg className="fill-white w-4.5 h-4.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
            L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
            c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
            c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
          />
        </svg>
      </div>
    </div>
  )
}
