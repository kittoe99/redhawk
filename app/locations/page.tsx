import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import {
  Building2,
  Music,
  Mountain,
  Trees,
  Sun,
  Palmtree,
  Building,
  MountainIcon as Mountains,
  Landmark,
  MountainIcon,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Service Areas | Moving Help Marketplace | Redhawk Relocation",
  description:
    "Redhawk Relocation's marketplace connects you with independent moving helpers in Austin, Nashville, Boise, Raleigh, Phoenix, Tampa, Charlotte, Denver, Columbus, Salt Lake City and surrounding areas.",
  alternates: {
    canonical: "https://redhawkrelocation.com/locations",
  },
}

const cities = [
  {
    name: "Austin",
    slug: "austin",
    state: "TX",
    population: "2.3M",
    icon: <Building2 className="h-6 w-6" />,
    color: "bg-emerald-100",
    description: "Live music capital with growing tech scene",
  },
  {
    name: "Nashville",
    slug: "nashville",
    state: "TN", 
    population: "1.4M",
    icon: <Music className="h-6 w-6" />,
    color: "bg-blue-100",
    description: "Music City with vibrant culture",
  },
  {
    name: "Boise",
    slug: "boise",
    state: "ID",
    population: "750K",
    icon: <Mountain className="h-6 w-6" />,
    color: "bg-indigo-100",
    description: "Mountain views and outdoor lifestyle",
  },
  {
    name: "Raleigh",
    slug: "raleigh",
    state: "NC",
    population: "1.4M",
    icon: <Trees className="h-6 w-6" />,
    color: "bg-green-100",
    description: "Research Triangle tech hub",
  },
  {
    name: "Phoenix",
    slug: "phoenix",
    state: "AZ",
    population: "5.0M",
    icon: <Sun className="h-6 w-6" />,
    color: "bg-amber-100",
    description: "Desert metropolis with year-round sun",
  },
  {
    name: "Tampa",
    slug: "tampa",
    state: "FL",
    population: "3.2M",
    icon: <Palmtree className="h-6 w-6" />,
    color: "bg-cyan-100",
    description: "Gulf Coast beaches and business hub",
  },
  {
    name: "Charlotte",
    slug: "charlotte",
    state: "NC",
    population: "2.6M",
    icon: <Building className="h-6 w-6" />,
    color: "bg-violet-100",
    description: "Banking capital of the South",
  },
  {
    name: "Denver",
    slug: "denver",
    state: "CO",
    population: "2.9M",
    icon: <Mountains className="h-6 w-6" />,
    color: "bg-sky-100",
    description: "Mile High City with Rocky Mountain access",
  },
  {
    name: "Columbus",
    slug: "columbus",
    state: "OH",
    population: "2.1M",
    icon: <Landmark className="h-6 w-6" />,
    color: "bg-red-100",
    description: "Midwest hub with diverse economy",
  },
  {
    name: "Salt Lake City",
    slug: "salt-lake-city",
    state: "UT",
    population: "1.2M",
    icon: <MountainIcon className="h-6 w-6" />,
    color: "bg-blue-100",
    description: "Gateway to world-class skiing",
  },
]

export default function LocationsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <MainNav />

      {/* HERO SECTION - Page Style Hero */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-4 sm:py-2 mb-6 rounded-full bg-primary-600 text-white font-medium text-xs sm:text-sm border-[1px] border-primary-700 shadow-sm">
              <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white animate-pulse"></span>
              Moving Help Marketplace
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="white"
                className="ml-1 opacity-80"
              >
                <path
                  d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
                />
              </svg>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary-900 mb-6 leading-tight max-w-4xl mx-auto">
              Moving Help Available in{" "}
              <span className="text-primary-600 relative">
                10+ Cities
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 3C50 -1 150 7 200 3" stroke="#D10A0A" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-secondary-600">
              Connect with verified independent moving helpers in major metropolitan areas across the United States.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/quote">
                <Button
                  size="lg"
                  className="bg-primary-600 hover:bg-primary-700 text-white inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold"
                >
                  Find Moving Help
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-800 hover:bg-gray-100 rounded-xl px-8 py-4 text-lg font-semibold"
              >
                View Pricing
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-yellow-400 w-4 h-4"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900 ml-1">4.9</span>
                </div>
                <span className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">1,200+</span> satisfied customers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary-100/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"></div>
      </section>

      {/* ENHANCED INTERACTIVE MAP SECTION */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z" fill="#4338ca" fillOpacity="0.03"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mb-6 shadow-lg">
              <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent md:text-5xl mb-6">
              Where We Operate
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're proud to serve customers across major metropolitan areas in the United States, 
              with a focus on quality service and local expertise in each market we serve.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Enhanced Map Container */}
            <div className="order-2 lg:order-1">
              <div className="relative group">
                {/* Map wrapper with enhanced styling */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white bg-white transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-3xl">
                  {/* Map image with better responsiveness */}
                  <div className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] relative">
                    <Image
                      src="/images/usa-markets-map-accurate.png"
                      alt="Interactive USA Service Areas Map - Redhawk Relocation Coverage"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                    
                    {/* Enhanced overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                    
                    {/* Interactive overlay content */}
                    <div className="absolute inset-0 flex items-end justify-center p-6">
                      <div className="text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl border border-white/20">
                          <p className="text-gray-800 font-semibold text-lg mb-2">
                            🚀 Expanding Rapidly
                          </p>
                          <p className="text-gray-600 text-sm">
                            New cities added monthly
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Service area indicators */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        <div className="bg-primary-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                          10+ Major Cities
                        </div>
                        <div className="bg-green-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                          24/7 Support
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating statistics cards */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 transform rotate-3 group-hover:rotate-1 transition-transform duration-300">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">10+</p>
                    <p className="text-xs text-gray-600 font-medium">Cities Served</p>
                  </div>
                </div>

                <div className="absolute -top-6 -left-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-xl p-4 transform -rotate-3 group-hover:-rotate-1 transition-transform duration-300">
                  <div className="text-center">
                    <p className="text-xl font-bold">5★</p>
                    <p className="text-xs opacity-90 font-medium">Rated Service</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Content Panel */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Strategic Market Coverage
                </h3>
                
                {/* Service highlights with better design */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Major Metropolitan Areas</h4>
                      <p className="text-gray-600 text-sm">Serving Austin, Nashville, Phoenix, Denver, Tampa, and more growing cities.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Verified Local Helpers</h4>
                      <p className="text-gray-600 text-sm">All moving helpers are background-checked and highly rated by previous customers.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Same-Day Availability</h4>
                      <p className="text-gray-600 text-sm">Book moving help for today or schedule in advance with flexible timing options.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call-to-action with enhanced design */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
                <h4 className="font-bold text-gray-900 mb-3">Don't See Your City?</h4>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  We're rapidly expanding to new markets. Let us know where you need moving help, and we'll prioritize your area.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Request Your City
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CITIES GRID SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
              Service Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on any city to learn more about local moving help options and pricing.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {cities.map((city) => (
              <Link key={city.slug} href={`/locations/${city.slug}`} className="group">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full transition-all duration-300 hover:shadow-lg hover:border-primary-200 hover:-translate-y-1">
                  <div
                    className={`${city.color} rounded-full w-14 h-14 flex items-center justify-center mb-4 text-gray-700 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {city.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                    {city.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{city.state} • {city.population} metro</p>
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">{city.description}</p>
                  <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700">
                    View Details
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6">Don't see your city? We're expanding rapidly.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-primary-600 px-6 py-3 text-primary-600 font-medium transition-colors hover:bg-primary-600 hover:text-white"
            >
              Request Your City
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-primary-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Get Moving Help?</h2>
          <p className="mb-8 text-xl opacity-90">
            Find verified helpers in your area and get an instant quote for your move.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-primary-700 transition-colors hover:bg-gray-50"
            >
              Get Instant Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="tel:(720) 842-9167"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white hover:text-primary-700"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (720) 842-9167
            </Link>
          </div>
        </div>
      </section>

      <HawkFooter />
    </div>
  )
}
