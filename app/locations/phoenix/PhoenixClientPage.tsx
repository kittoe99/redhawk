"use client"

import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { CityHeroSection } from "@/components/city-hero-section"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { ScrollToTop } from "@/components/scroll-to-top"
import Script from "next/script"
import { useEffect } from "react"

const phoenixData = {
  name: "Phoenix",
  state: "Arizona",
  stateAbbr: "AZ",
  description:
    "Phoenix's year-round sunshine, stunning desert landscapes, and booming population make it one of America's fastest-growing metropolitan areas. From Scottsdale's luxury communities to downtown Phoenix's urban core, our moving helpers understand the unique challenges of desert moves, including extreme heat considerations and navigating the sprawling Valley of the Sun.",
  serviceCities: [
    { name: "Scottsdale", state: "AZ" },
    { name: "Tempe", state: "AZ" },
    { name: "Mesa", state: "AZ" },
    { name: "Chandler", state: "AZ" },
    { name: "Gilbert", state: "AZ" },
    { name: "Glendale", state: "AZ" },
    { name: "Peoria", state: "AZ" },
    { name: "Paradise Valley", state: "AZ" },
    { name: "Ahwatukee", state: "AZ" },
    { name: "Fountain Hills", state: "AZ" },
  ],
}

export default function PhoenixClientPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Script id="phoenix-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Redhawk Relocation - Phoenix Moving Help",
            "image": "https://redhawkrelocation.com/images/redhawk-movers-sofa.png",
            "url": "https://redhawkrelocation.com/locations/phoenix",
            "telephone": "(720) 842-9167",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 33.4484,
                "longitude": -112.0740
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
              "name": "Phoenix",
              "sameAs": "https://en.wikipedia.org/wiki/Phoenix,_Arizona"
            },
            "description": "Connect with independent moving helpers in Phoenix, AZ for loading, unloading, packing, and furniture assembly services."
          }
        `}
      </Script>
      <MainNav />
      <ScrollProgressBar />
      <ScrollToTop />

      <CityHeroSection cityData={phoenixData} />

      <HawkFooter />
    </div>
  )
}
