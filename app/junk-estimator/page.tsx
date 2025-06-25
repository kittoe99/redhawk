"use client"
import { JunkEstimator } from "@/components/junk-estimator/junk-estimator"
import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import Script from "next/script"

export default function JunkEstimatorPage() {
  return (
    <div className="min-h-screen bg-white" style={{ backgroundColor: '#ffffff' }}>
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

      <main className="min-h-[calc(100vh-64px)] bg-white" style={{ backgroundColor: '#ffffff' }}>
        <div className="bg-white" style={{ backgroundColor: '#ffffff' }}>
          <JunkEstimator />
        </div>
      </main>

      <HawkFooter />
    </div>
  )
}
