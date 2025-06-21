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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary-500/20 to-primary-700/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-300/10 to-primary-500/10 rounded-full blur-3xl"></div>
      </div>

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

      <main className="pt-16 relative z-10">
        <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-4xl">
          <QuoteWizardProvider>
            <QuoteWizardContainer />
          </QuoteWizardProvider>
        </div>
      </main>

      <HawkFooter />
    </div>
  )
}
