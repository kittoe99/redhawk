"use client"

import { usePathname } from "next/navigation"
import { MainNav } from "./main-nav"

export function MainNavWrapper() {
  const pathname = usePathname()
  if (pathname.startsWith("/embed")) {
    return null
  }
  return <MainNav />
}
