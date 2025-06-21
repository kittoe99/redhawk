"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useLoader } from "@/contexts/loader-context"

export function PageTransitionLoader() {
  const { showLoader, hideLoader } = useLoader()
  const pathname = usePathname()
  const initialLoadDone = useRef(false)
  const prevPathname = useRef(pathname)

  // Show loader only on initial page load
  useEffect(() => {
    if (!initialLoadDone.current) {
      showLoader()
      const timer = setTimeout(() => {
        hideLoader()
        initialLoadDone.current = true
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [showLoader, hideLoader])

  // Show loader only on actual navigation between pages
  useEffect(() => {
    // Skip the initial render
    if (initialLoadDone.current && pathname !== prevPathname.current) {
      prevPathname.current = pathname
      showLoader()

      const timer = setTimeout(() => {
        hideLoader()
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [pathname, showLoader, hideLoader])

  return null
}
