"use client"

import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { CityHeroSection } from "@/components/city-hero-section"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { ScrollToTop } from "@/components/scroll-to-top"
import Script from "next/script"
import { useEffect } from "react"

const nashvilleData = {
  name: "Nashville",
  state: "Tennessee",
  stateAbbr: "TN",
  description:
    "Music City's legendary country music scene, historic honky-tonks on Broadway, and booming healthcare industry make Nashville a top destination for relocations. From the trendy Gulch district to historic Germantown, our Nashville moving helpers know the city's unique character and can handle everything from musical equipment to downtown high-rise moves with the care your belongings deserve.",
  serviceCities: [
    { name: "Franklin", state: "TN" },
    { name: "Brentwood", state: "TN" },
    { name: "Murfreesboro", state: "TN" },
    { name: "Hendersonville", state: "TN" },
    { name: "Mt. Juliet", state: "TN" },
    { name: "Smyrna", state: "TN" },
    { name: "Gallatin", state: "TN" },
    { name: "Lebanon", state: "TN" },
    { name: "Goodlettsville", state: "TN" },
    { name: "Belle Meade", state: "TN" },
  ],
}

export default function NashvilleClientPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Script id="nashville-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Redhawk Relocation - Nashville Moving Help",
            "image": "https://redhawkrelocation.com/images/redhawk-movers-sofa.png",
            "url": "https://redhawkrelocation.com/locations/nashville",
            "telephone": "(720) 842-9167",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 36.1627,
                "longitude": -86.7816
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
              "name": "Nashville",
              "sameAs": "https://en.wikipedia.org/wiki/Nashville,_Tennessee"
            },
            "description": "Connect with independent moving helpers in Nashville, TN for loading, unloading, packing, and furniture assembly services."
          }
        `}
      </Script>
      <MainNav />
      <ScrollProgressBar />
      <ScrollToTop />

      <CityHeroSection cityData={nashvilleData} />

      <HawkFooter />
    </div>
  )
}
