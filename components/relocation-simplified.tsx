"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export function RelocationSimplified() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    let rafId: number | null = null

    const handleScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          if (!sectionRef.current) return

          const scrollPosition = window.scrollY
          const sectionTop = sectionRef.current.offsetTop
          const sectionHeight = sectionRef.current.offsetHeight
          const windowHeight = window.innerHeight

          // Calculate how far the section is in the viewport
          const scrollPercentage = (scrollPosition - sectionTop + windowHeight) / (sectionHeight + windowHeight)

          if (scrollPercentage > 0 && scrollPercentage < 1) {
            // Apply parallax effect to different elements
            const circles = sectionRef.current.querySelectorAll(".circle-element")
            circles.forEach((circle, index) => {
              const speed = index % 2 === 0 ? 0.1 : -0.1
              const yValue = scrollPercentage * 100 * speed
              ;(circle as HTMLElement).style.transform = `translateY(${yValue}px)`
            })
          }

          ticking = false
        })

        ticking = true
      }
    }

    // Use passive event listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 relative bg-[#FFF7F7] bg-pattern-mixed relative overflow-hidden">
      {/* Add a subtle texture overlay */}
      <div className="absolute inset-0 bg-pattern-diagonal-lines opacity-30 pointer-events-none"></div>
      {/* Decorative elements */}
      <div className="circle-element absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-50 opacity-60 blur-2xl"></div>
      <div className="circle-element absolute bottom-40 right-10 w-80 h-80 rounded-full bg-blue-50 opacity-60 blur-3xl"></div>
      <div className="circle-element absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-primary-100 opacity-40 blur-2xl"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Main content area with diagonal layout */}
        <div className="relative md:max-w-5xl md:mx-auto">
          {/* First Section - Moving Help Simplified */}
          <div className="relative md:max-w-5xl md:mx-auto">
            {/* Diagonal background shape */}
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-900 to-secondary-950 transform -skew-y-3 rounded-3xl border-2 border-solid border-primary-200 shadow-md overflow-hidden">
              {/* Subtle decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full opacity-30 -translate-y-1/2 translate-x-1/4"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-100 rounded-full opacity-20 translate-y-1/2 -translate-x-1/4"></div>
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-primary-50 to-transparent rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Hawk icon at the top center */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="bg-primary-600 rounded-full p-3 shadow-lg border-2 border-solid border-white">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white">
                  <path
                    d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
                  L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
                  c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
                  c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
                  />
                </svg>
              </div>
            </div>

            <div className="relative p-6 md:p-8 rounded-lg bg-gradient-to-b from-primary-500/90 via-primary-600/90 to-secondary-900/90 text-white border-2 border-solid border-primary-500/70 shadow-lg md:max-w-5xl md:mx-auto overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-secondary-950/30 to-transparent"></div>
              {/* Content area */}
              <div className="relative z-10 max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="mb-8"
                >
                  <h2 className="inline-block text-2xl md:text-3xl font-bold text-white mb-4 relative flex items-center">
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="white"
                      className="mr-2 flex-shrink-0"
                    >
                      <path
                        d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
                      L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
                      c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
                      c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
                      />
                    </svg>
                    Moving Help
                    <span className="text-white/80"> Simplified</span>
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      height="4"
                      viewBox="0 0 200 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 3C50 -1 150 7 200 3" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </h2>

                  <p className="text-white/80 text-sm md:text-base mb-6 max-w-xl">
                    We've reimagined how you find moving help from the ground up. Our platform connects you with
                    independent professionals for a stress-free booking experience—making your transition to a new space
                    seamless.
                  </p>
                </motion.div>

                {/* Benefits with staggered animation */}
                <div className="space-y-4">
                  {[
                    {
                      title: "Easy Booking",
                      desc: "Simple platform to find and book independent moving help",
                    },
                    {
                      title: "Transparent Pricing",
                      desc: "Clear, upfront costs with no hidden fees or surprises",
                    },
                    {
                      title: "Verified Providers",
                      desc: "All moving professionals on our platform are pre-screened",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 h-10 w-10 mr-3 bg-white/20 rounded-full flex items-center justify-center">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white">
                          <path
                            d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
                          L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
                          c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
                          c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white text-base font-semibold mb-0.5">{item.title}</h3>
                        <p className="text-white/70 text-xs md:text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* App Store Download Icons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mt-6 pt-6 border-t border-white/20"
                >
                  <h4 className="text-white text-sm font-medium mb-3 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Download Our App
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#"
                      className="flex-1 group bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-3 flex items-center justify-center transition-all duration-300 hover:scale-105 min-w-[140px]"
                    >
                      <div className="mr-2 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z"></path>
                          <path d="m15 12-5-3v6l5-3z"></path>
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-white/70 text-[10px] leading-none">Download on the</div>
                        <div className="text-white font-semibold text-sm">App Store</div>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-1 group bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-3 flex items-center justify-center transition-all duration-300 hover:scale-105 min-w-[140px]"
                    >
                      <div className="mr-2 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
                          <path d="m13 13 6 6"></path>
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-white/70 text-[10px] leading-none">GET IT ON</div>
                        <div className="text-white font-semibold text-sm">Google Play</div>
                      </div>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
