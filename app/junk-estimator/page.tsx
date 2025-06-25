"use client"
import { JunkEstimator } from "@/components/junk-estimator/junk-estimator"
import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import Script from "next/script"

export default function JunkEstimatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Script id="junk-estimator-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Junk Removal Estimator",
            "description": "Get an instant junk removal quote from Redhawk Relocation. Professional junk removal services with transparent pricing.",
            "provider": {
              "@type": "Organization",
              "name": "Redhawk Relocation",
              "telephone": "(720) 842-9167"
            }
          }
        `}
      </Script>

      <MainNav />

      <main className="pt-16">
        <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-6xl">
          <JunkEstimator />
        </div>
      </main>

      <HawkFooter />
    </div>
  )
}
