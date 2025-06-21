"use client"

import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { CityHeroSection } from "@/components/city-hero-section"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { ScrollToTop } from "@/components/scroll-to-top"
import Script from "next/script"
import { useEffect } from "react"

const boiseData = {
  name: "Boise",
  state: "Idaho",
  stateAbbr: "ID",
  description:
    "Boise's stunning foothills, outdoor recreation opportunities, and growing tech sector make it one of the most livable cities in the Mountain West. From the historic North End to the modern downtown core, our Boise moving helpers understand the unique challenges of Idaho moves, including seasonal weather considerations and navigating the city's diverse neighborhoods and elevation changes.",
  serviceCities: [
    { name: "Meridian", state: "ID" },
    { name: "Nampa", state: "ID" },
    { name: "Eagle", state: "ID" },
    { name: "Caldwell", state: "ID" },
    { name: "Garden City", state: "ID" },
    { name: "Kuna", state: "ID" },
    { name: "Star", state: "ID" },
    { name: "Middleton", state: "ID" },
    { name: "Hidden Springs", state: "ID" },
    { name: "Emmett", state: "ID" },
  ],
}

export default function BoisePageClient() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Script id="boise-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Redhawk Relocation - Boise Moving Help",
            "image": "https://redhawkrelocation.com/images/redhawk-movers-sofa.png",
            "url": "https://redhawkrelocation.com/locations/boise",
            "telephone": "(720) 842-9167",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 43.6150,
                "longitude": -116.2023
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
              "name": "Boise",
              "sameAs": "https://en.wikipedia.org/wiki/Boise,_Idaho"
            },
            "description": "Connect with independent moving helpers in Boise, ID for loading, unloading, packing, and furniture assembly services."
          }
        `}
      </Script>
      <MainNav />
      <ScrollProgressBar />
      <ScrollToTop />

      <CityHeroSection cityData={boiseData} />

      <HawkFooter />
    </div>
  )
}
