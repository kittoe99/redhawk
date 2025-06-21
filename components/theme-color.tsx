"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeColorSync() {
  const { theme } = useTheme()

  useEffect(() => {
    // Get all theme-color meta tags
    const themeColorMeta = document.querySelector('meta[name="theme-color"]')

    // If no meta tag exists, create one
    if (!themeColorMeta) {
      const meta = document.createElement("meta")
      meta.name = "theme-color"
      meta.content = "#d30000" // Default to light theme color
      document.head.appendChild(meta)
    } else {
      // Update existing meta tag based on current theme
      if (theme === "dark") {
        themeColorMeta.setAttribute("content", "#b30000")
      } else {
        themeColorMeta.setAttribute("content", "#d30000")
      }
    }
  }, [theme])

  return null
}
