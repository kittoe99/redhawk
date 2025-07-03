"use client"
import { JunkEstimator } from "@/components/junk-estimator/junk-estimator"
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

      <main className="pt-16">
        <div className="w-full">
          <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <JunkEstimator />
                  </div>
        </div>
      </main>

      <HawkFooter />
    </div>
  )
}
