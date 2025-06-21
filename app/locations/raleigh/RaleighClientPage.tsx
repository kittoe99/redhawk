"use client"

import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { CityHeroSection } from "@/components/city-hero-section"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { ScrollToTop } from "@/components/scroll-to-top"
import Script from "next/script"
import { useEffect } from "react"

const raleighData = {
  name: "Raleigh",
  state: "North Carolina",
  stateAbbr: "NC",
  description:
    "Raleigh's position as the 'City of Oaks' and anchor of the Research Triangle makes it a hub for education, technology, and innovation. From NC State University areas to the bustling downtown districts, our Raleigh moving helpers understand the unique demands of this growing metropolitan area and can navigate everything from historic neighborhoods to modern research facilities.",
  serviceCities: [
    { name: "Cary", state: "NC" },
    { name: "Durham", state: "NC" },
    { name: "Chapel Hill", state: "NC" },
    { name: "Wake Forest", state: "NC" },
    { name: "Apex", state: "NC" },
    { name: "Morrisville", state: "NC" },
    { name: "Garner", state: "NC" },
    { name: "Holly Springs", state: "NC" },
    { name: "Fuquay-Varina", state: "NC" },
    { name: "Knightdale", state: "NC" },
  ],
}

export default function RaleighClientPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Script id="raleigh-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Redhawk Relocation - Raleigh Moving Help",
            "image": "https://redhawkrelocation.com/images/redhawk-movers-sofa.png",
            "url": "https://redhawkrelocation.com/locations/raleigh",
            "telephone": "(720) 842-9167",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 35.7796,
                "longitude": -78.6382
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
              "name": "Raleigh",
              "sameAs": "https://en.wikipedia.org/wiki/Raleigh,_North_Carolina"
            },
            "description": "Connect with independent moving helpers in Raleigh, NC for loading, unloading, packing, and furniture assembly services."
          }
        `}
      </Script>
      <MainNav />
      <ScrollProgressBar />
      <ScrollToTop />

      <CityHeroSection cityData={raleighData} />

      <HawkFooter />
    </div>
  )
}
