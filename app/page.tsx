import { MainNav } from "@/components/main-nav"
import { HeroSection } from "@/components/hero-section"
import { HawkFooter } from "@/components/hawk-footer"
import Script from "next/script"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Script id="marketplace-schema" type="application/ld+json">
        {`
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Redhawk Relocation",
      "applicationCategory": "Marketplace",
      "operatingSystem": "All",
      "description": "An on-demand marketplace connecting customers with independent moving helpers in 10 major US cities. Book verified moving help from $69/hour.",
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "69.00",
        "highPrice": "99.00",
        "priceCurrency": "USD",
        "offerCount": "100+"
      },
      "provider": {
        "@type": "Organization",
        "name": "Redhawk Relocation Marketplace",
        "telephone": "(720) 842-9167",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Phoenix",
          "addressRegion": "AZ",
          "postalCode": "85001",
          "addressCountry": "US"
        }
      },
      "sameAs": [
        "https://www.facebook.com/redhawkrelocation",
        "https://www.instagram.com/redhawkrelocation",
        "https://twitter.com/redhawkmove"
      ],
      "areaServed": [
        "Austin, TX",
        "Nashville, TN",
        "Boise, ID",
        "Raleigh, NC",
        "Phoenix, AZ",
        "Tampa, FL",
        "Charlotte, NC",
        "Denver, CO",
        "Columbus, OH",
        "Salt Lake City, UT"
      ]
    }
  `}
      </Script>
      <MainNav />
      <HeroSection />
      <HawkFooter />
    </div>
  )
}
