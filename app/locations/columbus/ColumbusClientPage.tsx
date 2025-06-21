"use client"

import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { CityHeroSection } from "@/components/city-hero-section"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { ScrollToTop } from "@/components/scroll-to-top"
import Script from "next/script"
import { useEffect } from "react"

const columbusData = {
  name: "Columbus",
  state: "Ohio",
  stateAbbr: "OH",
  description:
    "Columbus's vibrant university atmosphere, diverse neighborhoods, and growing tech scene make it Ohio's capital of opportunity. From the historic German Village to the trendy Short North Arts District, our Columbus moving helpers understand the unique character of this Midwest gem and can navigate everything from Ohio State University areas to the city's expanding suburban communities.",
  serviceCities: [
    { name: "Dublin", state: "OH" },
    { name: "Westerville", state: "OH" },
    { name: "Gahanna", state: "OH" },
    { name: "Hilliard", state: "OH" },
    { name: "Worthington", state: "OH" },
    { name: "Grove City", state: "OH" },
    { name: "Reynoldsburg", state: "OH" },
    { name: "Upper Arlington", state: "OH" },
    { name: "Pickerington", state: "OH" },
    { name: "Bexley", state: "OH" },
  ],
}

export default function ColumbusClientPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Script id="columbus-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Redhawk Relocation - Columbus Moving Help",
            "image": "https://redhawkrelocation.com/images/redhawk-movers-sofa.png",
            "url": "https://redhawkrelocation.com/locations/columbus",
            "telephone": "(720) 842-9167",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 39.9612,
                "longitude": -82.9988
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
              "name": "Columbus",
              "sameAs": "https://en.wikipedia.org/wiki/Columbus,_Ohio"
            },
            "description": "Connect with independent moving helpers in Columbus, OH for loading, unloading, packing, and furniture assembly services."
          }
        `}
      </Script>
      <MainNav />
      <ScrollProgressBar />
      <ScrollToTop />

      <CityHeroSection cityData={columbusData} />

      <HawkFooter />
    </div>
  )
}
