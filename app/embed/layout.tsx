import "../globals.css"
import "../hawk-loader.css"
import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: {
    default: "Redhawk Relocation Embed",
    template: "%s | Redhawk Relocation Embed",
  },
}

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white w-full">
        {children}
      </body>
    </html>
  )
}
