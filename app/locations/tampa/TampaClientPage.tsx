"use client"

import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { CityHeroSection } from "@/components/city-hero-section"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { ScrollToTop } from "@/components/scroll-to-top"
import Script from "next/script"
import { useEffect } from "react"

const tampaData = {
  name: "Tampa",
  state: "Florida",
  stateAbbr: "FL",
  description:
    "Tampa's vibrant waterfront, thriving business district, and year-round tropical climate make it a premier destination in the Tampa Bay area. From historic Ybor City to the modern downtown skyline, our Tampa moving helpers understand Florida's unique moving challenges, including humidity considerations, hurricane season planning, and navigating the area's diverse communities.",
  serviceCities: [
    { name: "St. Petersburg", state: "FL" },
    { name: "Clearwater", state: "FL" },
    { name: "Brandon", state: "FL" },
    { name: "Wesley Chapel", state: "FL" },
    { name: "Riverview", state: "FL" },
    { name: "Plant City", state: "FL" },
    { name: "Temple Terrace", state: "FL" },
    { name: "Lutz", state: "FL" },
    { name: "Carrollwood", state: "FL" },
    { name: "Westchase", state: "FL" },
  ],
}

export default function TampaClientPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Script id="tampa-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Redhawk Relocation - Tampa Moving Help",
            "image": "https://redhawkrelocation.com/images/redhawk-movers-sofa.png",
            "url": "https://redhawkrelocation.com/locations/tampa",
            "telephone": "(720) 842-9167",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 27.9506,
                "longitude": -82.4572
              },
              "geoRadius": "50000"
            },
            "provider": {
              "@type": "Organization",
              "name": "Redhawk Relocation",
              "sameAs": [
                "https://www.facebook.com/redhawkrelocation",
                "https://www.instagram.com/redhawkrelocation"
              ]
            },
            "areaServed": {
              "@type": "City",
              "name": "Tampa",
              "sameAs": "https://en.wikipedia.org/wiki/Tampa,_Florida"
            },
            "description": "Connect with independent moving helpers in Tampa, FL for loading, unloading, packing, and furniture assembly services."
          }
        `}
      </Script>
      <MainNav />
      <ScrollProgressBar />
      <ScrollToTop />

      <CityHeroSection cityData={tampaData} />

      <HawkFooter />
    </div>
  )
}
