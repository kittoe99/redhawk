"use client"

import { QuoteWizardProvider } from "@/contexts/quote-wizard-context"
import QuoteWizardContainer from "@/components/quote-form/quote-wizard-container"
import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import Script from "next/script"
import { useEffect } from "react"

export default function QuotePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Script id="quote-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Moving Quote Calculator",
            "description": "Get an instant moving quote from Redhawk Relocation. Professional moving services with transparent pricing.",
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
        <QuoteWizardProvider>
          <QuoteWizardContainer />
        </QuoteWizardProvider>
      </main>

      <HawkFooter />
    </div>
  )
}
