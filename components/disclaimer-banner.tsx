"use client"

import { AlertTriangle } from "lucide-react"

export function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border-t border-b border-amber-200">
      <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-amber-800 text-sm">
        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
        <p>
          <strong>Disclaimer:</strong> Redhawk Relocation is not a moving company. We are a technology platform that
          connects customers with independent moving professionals. All services are provided by independent third-party
          providers.
        </p>
      </div>
    </div>
  )
}
