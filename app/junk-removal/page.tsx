import Image from "next/image"
import Link from "next/link"
import Script from "next/script"

import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Clock, Shield, Star, Users, MapPin, Recycle, Truck, Trash2 } from "lucide-react"

export const metadata = {
  title: "Junk Removal Services | Redhawk Relocation",
  description:
    "Professional junk removal services by Redhawk Relocation. Fast, eco-friendly disposal of unwanted items during your move or cleanout.",
}

const serviceAreas = [
  { city: "Austin", state: "TX", population: "2.3M" },
  { city: "Nashville", state: "TN", population: "1.4M" },
  { city: "Phoenix", state: "AZ", population: "5.0M" },
  { city: "Denver", state: "CO", population: "2.9M" },
  { city: "Tampa", state: "FL", population: "3.2M" },
  { city: "Charlotte", state: "NC", population: "2.6M" },
  { city: "Raleigh", state: "NC", population: "1.4M" },
  { city: "Boise", state: "ID", population: "750K" },
  { city: "Columbus", state: "OH", population: "2.1M" },
  { city: "Salt Lake City", state: "UT", population: "1.2M" },
]

const features = [
  {
    icon: Truck,
    title: "Full-Service Removal",
    description: "We handle everything from furniture to appliances, electronics to household clutter"
  },
  {
    icon: Recycle,
    title: "Eco-Friendly Disposal",
    description: "Responsible recycling and donation of items whenever possible"
  },
  {
    icon: Clock,
    title: "Same-Day Service",
    description: "Quick turnaround for urgent cleanouts and moving day junk removal"
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Professional service with full insurance coverage for your protection"
  },
  {
    icon: Users,
    title: "Trained Crew",
    description: "Experienced team that handles heavy lifting and proper disposal methods"
  },
  {
    icon: Star,
    title: "Upfront Pricing",
    description: "Transparent quotes with no hidden fees or surprise charges"
  }
]

const testimonials = [
  {
    name: "Linda W.",
    location: "Nashville, TN",
    rating: 5,
    text: "They cleared out our entire basement in just 2 hours! Professional, efficient, and they even swept up afterward. Great service!"
  },
  {
    name: "Carlos M.",
    location: "Phoenix, AZ", 
    rating: 5,
    text: "Used them during our move to get rid of old furniture and appliances. They donated what they could and recycled the rest. Very responsible!"
  },
  {
    name: "Rachel T.",
    location: "Denver, CO",
    rating: 5,
    text: "Needed same-day junk removal and they came through! Fair pricing and they handled everything quickly and professionally."
  }
]

export default function JunkRemovalPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* SEO – JSON-LD */}
      <Script id="junk-removal-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Junk Removal Services",
            "description": "Professional junk removal and disposal services with eco-friendly practices and same-day availability.",
            "provider": {
              "@type": "Organization",
              "name": "Redhawk Relocation",
              "telephone": "(720) 842-9167",
              "areaServed": ["Austin", "Nashville", "Phoenix", "Denver", "Tampa", "Charlotte", "Raleigh", "Boise", "Columbus", "Salt Lake City"]
            }
          }
        `}
      </Script>

      <MainNav />

      {/* HERO SECTION - Page Style Hero */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-4 sm:py-2 mb-6 rounded-full bg-primary-600 text-white font-medium text-xs sm:text-sm border-[1px] border-primary-700 shadow-sm">
              <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white animate-pulse"></span>
              Junk Removal Specialists
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
              Junk Removal Made{" "}
              <span className="text-primary-600 relative">
                Simple
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
              Fast and eco-friendly junk removal service. We handle furniture, appliances, electronics, and household clutter with responsible disposal and recycling.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/junk-estimator">
                <Button
                  size="lg"
                  className="bg-primary-600 hover:bg-primary-700 text-white inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold"
                >
                  Get Free Estimate
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:+17208429167">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-gray-800 hover:bg-gray-100 rounded-xl px-8 py-4 text-lg font-semibold"
                >
                  Call (720) 842-9167
                </Button>
              </a>
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
                  <span className="font-medium text-gray-900">800+</span> junk removal jobs completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary-100/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"></div>
      </section>

      {/* FEATURES SECTION */}
      <section className="pt-12 pb-12 bg-gradient-to-b from-white to-gray-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 mb-3">Why Choose Our Junk Removal?</h2>
            <p className="text-sm sm:text-base text-secondary-600 max-w-2xl mx-auto">
              Professional, eco-friendly junk removal with transparent pricing and responsible disposal practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                <div className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 mb-4 group-hover:bg-primary-100 transition-colors duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-secondary-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-10">
            <Link
              href="/junk-estimator"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              Get Your Free Estimate
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS SECTION */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Serving Major Cities Nationwide
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Professional junk removal services available in top metropolitan areas.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {serviceAreas.map((area, index) => (
              <div key={index} className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 p-4 text-center">
                <MapPin className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-secondary-900 mb-1">{area.city}</h3>
                <p className="text-sm text-secondary-600 mb-1">{area.state}</p>
                <p className="text-xs text-gray-500">{area.population}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              href="/junk-estimator"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              Find Help in Your City
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-secondary-600">
              Real reviews from satisfied customers who used our junk removal service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{testimonial.rating}.0</span>
                </div>
                <p className="text-secondary-600 mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-secondary-900">{testimonial.name}</div>
                    <div className="text-sm text-secondary-600">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Ready to Clear Out Your Space?
          </h2>
          <p className="text-lg text-secondary-600 mb-8">
            Get professional junk removal with eco-friendly disposal. Same-day service available!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/junk-estimator">
              <Button
                size="lg"
                className="bg-primary-600 hover:bg-primary-700 text-white inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold"
              >
                Get Free Estimate
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:+17208429167">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-800 hover:bg-gray-100 rounded-xl px-8 py-4 text-lg font-semibold"
              >
                Call (720) 842-9167
              </Button>
            </a>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            Available 7 days a week • Same-day service available • Eco-friendly disposal
          </div>
        </div>
      </section>

      <HawkFooter />
    </div>
  )
}
