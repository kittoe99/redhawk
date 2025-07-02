"use client"
// JunkEstimator now lives in an isolated embed page
// import { JunkEstimator } from "@/components/junk-estimator/junk-estimator"
import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import Script from "next/script"
import { EstimatorEmbedFrame } from "@/components/estimator-embed-frame"

export default function JunkEstimatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="w-full">
            {/* Embed the estimator in an iframe so it keeps its own styles/isolated scope */}
          <EstimatorEmbedFrame
              src="/embed/junk-estimator"
              className="w-full border-0"
            />
        </div>
      </main>

      <HawkFooter />
    </div>
  )
}
