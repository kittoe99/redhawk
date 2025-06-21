"use client"

import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { CityHeroSection } from "@/components/city-hero-section"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { ScrollToTop } from "@/components/scroll-to-top"
import Script from "next/script"
import { useEffect } from "react"

const saltLakeCityData = {
  name: "Salt Lake City",
  state: "Utah",
  stateAbbr: "UT",
  description:
    "Salt Lake City's stunning mountain views, world-class skiing, and growing tech industry make it a premier destination in the Mountain West. From the historic Avenues to the modern downtown core, our Salt Lake City moving helpers understand Utah's unique moving challenges, including elevation changes, seasonal weather considerations, and navigating the area's distinctive grid system.",
  serviceCities: [
    { name: "West Valley City", state: "UT" },
    { name: "West Jordan", state: "UT" },
    { name: "Sandy", state: "UT" },
    { name: "South Jordan", state: "UT" },
    { name: "Millcreek", state: "UT" },
    { name: "Holladay", state: "UT" },
    { name: "Murray", state: "UT" },
    { name: "Draper", state: "UT" },
    { name: "Cottonwood Heights", state: "UT" },
    { name: "Taylorsville", state: "UT" },
  ],
}

export default function SaltLakeCityClientPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Script id="slc-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Redhawk Relocation - Salt Lake City Moving Help",
            "image": "https://redhawkrelocation.com/images/redhawk-movers-sofa.png",
            "url": "https://redhawkrelocation.com/locations/salt-lake-city",
            "telephone": "(720) 842-9167",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 40.7608,
                "longitude": -111.8910
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
              "name": "Salt Lake City",
              "sameAs": "https://en.wikipedia.org/wiki/Salt_Lake_City"
            },
            "description": "Connect with independent moving helpers in Salt Lake City, UT for loading, unloading, packing, and furniture assembly services."
          }
        `}
      </Script>
      <MainNav />
      <ScrollProgressBar />
      <ScrollToTop />

      <CityHeroSection cityData={saltLakeCityData} />

      <HawkFooter />
    </div>
  )
}
