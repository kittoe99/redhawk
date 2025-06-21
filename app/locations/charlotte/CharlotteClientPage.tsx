"use client"

import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { CityHeroSection } from "@/components/city-hero-section"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { ScrollToTop } from "@/components/scroll-to-top"
import Script from "next/script"
import { useEffect } from "react"

const charlotteData = {
  name: "Charlotte",
  state: "North Carolina",
  stateAbbr: "NC",
  description:
    "Charlotte's status as a major banking center and the Queen City's rapid growth make it one of the Southeast's most dynamic metropolitan areas. From Uptown's gleaming skyscrapers to the trendy NoDa and South End districts, our Charlotte moving helpers understand the unique demands of this bustling financial hub and can navigate everything from high-rise condos to suburban neighborhoods.",
  serviceCities: [
    { name: "Huntersville", state: "NC" },
    { name: "Matthews", state: "NC" },
    { name: "Concord", state: "NC" },
    { name: "Rock Hill", state: "SC" },
    { name: "Gastonia", state: "NC" },
    { name: "Kannapolis", state: "NC" },
    { name: "Cornelius", state: "NC" },
    { name: "Mint Hill", state: "NC" },
    { name: "Pineville", state: "NC" },
    { name: "Ballantyne", state: "NC" },
  ],
}

export default function CharlotteClientPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Script id="charlotte-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Redhawk Relocation - Charlotte Moving Help",
            "image": "https://redhawkrelocation.com/images/redhawk-movers-sofa.png",
            "url": "https://redhawkrelocation.com/locations/charlotte",
            "telephone": "(720) 842-9167",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 35.2271,
                "longitude": -80.8431
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
              "name": "Charlotte",
              "sameAs": "https://en.wikipedia.org/wiki/Charlotte,_North_Carolina"
            },
            "description": "Connect with independent moving helpers in Charlotte, NC for loading, unloading, packing, and furniture assembly services."
          }
        `}
      </Script>
      <MainNav />
      <ScrollProgressBar />
      <ScrollToTop />

      <CityHeroSection cityData={charlotteData} />

      <HawkFooter />
    </div>
  )
}
