"use client"

import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { CityHeroSection } from "@/components/city-hero-section"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { ScrollToTop } from "@/components/scroll-to-top"
import Script from "next/script"
import { useEffect } from "react"

const austinData = {
  name: "Austin",
  state: "Texas",
  stateAbbr: "TX",
  description:
    "Austin's vibrant music scene, booming tech industry, and unique 'Keep Austin Weird' culture make it one of the fastest-growing cities in Texas. Whether you're moving to South by Southwest territory or relocating within the Live Music Capital of the World, our local moving helpers understand Austin's unique neighborhoods and can navigate everything from downtown high-rises to East Austin's trendy districts.",
  serviceCities: [
    { name: "Round Rock", state: "TX" },
    { name: "Cedar Park", state: "TX" },
    { name: "Georgetown", state: "TX" },
    { name: "Pflugerville", state: "TX" },
    { name: "Leander", state: "TX" },
    { name: "Kyle", state: "TX" },
    { name: "Buda", state: "TX" },
    { name: "Lakeway", state: "TX" },
    { name: "Bee Cave", state: "TX" },
    { name: "Dripping Springs", state: "TX" },
  ],
}

export default function AustinClientPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Script id="austin-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Redhawk Relocation - Austin Moving Help",
            "image": "https://redhawkrelocation.com/images/redhawk-movers-sofa.png",
            "url": "https://redhawkrelocation.com/locations/austin",
            "telephone": "(720) 842-9167",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 30.2672,
                "longitude": -97.7431
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
              "name": "Austin",
              "sameAs": "https://en.wikipedia.org/wiki/Austin,_Texas"
            },
            "description": "Connect with independent moving helpers in Austin, TX for loading, unloading, packing, and furniture assembly services."
          }
        `}
      </Script>
      <MainNav />
      <ScrollProgressBar />
      <ScrollToTop />

      <CityHeroSection cityData={austinData} />

      <HawkFooter />
    </div>
  )
}
