"use client"

import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { CityHeroSection } from "@/components/city-hero-section"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { ScrollToTop } from "@/components/scroll-to-top"
import Script from "next/script"
import { useEffect } from "react"

const denverData = {
  name: "Denver",
  state: "Colorado",
  stateAbbr: "CO",
  description:
    "Denver's stunning Rocky Mountain backdrop, thriving craft beer scene, and outdoor recreation culture make it the Mile High City that everyone wants to call home. From LoDo's historic districts to the trendy RiNo neighborhood, our Denver moving helpers understand Colorado's unique moving challenges, including altitude considerations, seasonal weather, and navigating the city's diverse elevation changes.",
  serviceCities: [
    { name: "Aurora", state: "CO" },
    { name: "Lakewood", state: "CO" },
    { name: "Arvada", state: "CO" },
    { name: "Westminster", state: "CO" },
    { name: "Centennial", state: "CO" },
    { name: "Boulder", state: "CO" },
    { name: "Thornton", state: "CO" },
    { name: "Englewood", state: "CO" },
    { name: "Wheat Ridge", state: "CO" },
    { name: "Littleton", state: "CO" },
  ],
}

export default function DenverPageClient() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Script id="denver-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Redhawk Relocation - Denver Moving Help",
            "image": "https://redhawkrelocation.com/images/redhawk-movers-sofa.png",
            "url": "https://redhawkrelocation.com/locations/denver",
            "telephone": "(720) 842-9167",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 39.7392,
                "longitude": -104.9903
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
              "name": "Denver",
              "sameAs": "https://en.wikipedia.org/wiki/Denver"
            },
            "description": "Connect with independent moving helpers in Denver, CO for loading, unloading, packing, and furniture assembly services."
          }
        `}
      </Script>
      <MainNav />
      <ScrollProgressBar />
      <ScrollToTop />

      <CityHeroSection cityData={denverData} />

      <HawkFooter />
    </div>
  )
}
