import Image from "next/image"
import Link from "next/link"
import Script from "next/script"

import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Clock, Shield, Star, Users, MapPin, Truck, Package, DollarSign } from "lucide-react"

export const metadata = {
  title: "Labor Only Moving Services | Redhawk Relocation",
  description:
    "Professional labor only moving services by Redhawk Relocation. Expert movers for loading, unloading, and heavy lifting without the truck.",
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
    icon: Users,
    title: "Professional Movers Only",
    description: "Skilled moving labor without the truck - perfect for DIY moves and PODS"
  },
  {
    icon: DollarSign,
    title: "Cost-Effective Solution",
    description: "Save money by providing your own truck while getting professional help"
  },
  {
    icon: Package,
    title: "Loading & Unloading",
    description: "Expert packing, loading, unloading, and heavy lifting services"
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Work around your timeline and truck rental schedule"
  },
  {
    icon: Shield,
    title: "Fully Insured Workers",
    description: "Background-checked professionals covered by comprehensive insurance"
  },
  {
    icon: Star,
    title: "Highly Rated Service",
    description: "Consistently excellent reviews from satisfied DIY movers"
  }
]

const testimonials = [
  {
    name: "Jennifer L.",
    location: "Tampa, FL",
    rating: 5,
    text: "Perfect for our U-Haul move! The team loaded everything efficiently and carefully. Saved us so much time and our backs! Great value for money."
  },
  {
    name: "Robert C.",
    location: "Charlotte, NC", 
    rating: 5,
    text: "We rented our own truck but needed help with the heavy lifting. These guys were professional, fast, and very careful with our furniture."
  },
  {
    name: "Amy K.",
    location: "Columbus, OH",
    rating: 5,
    text: "Used them for loading our PODS container. They fit everything perfectly and protected all our items. Highly recommend for labor-only moves!"
  }
]

export default function LaborOnlyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* SEO – JSON-LD */}
      <Script id="labor-only-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Labor Only Moving Services",
            "description": "Professional moving labor for loading, unloading, and heavy lifting without providing the truck. Perfect for DIY moves and container loading.",
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
              Labor Only Specialists
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
              Labor Only Moving{" "}
              <span className="text-primary-600 relative">
                Help
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
              Professional moving labor for loading, unloading, and heavy lifting. Perfect for DIY moves, U-Haul rentals, PODS containers, and when you need muscle without the truck.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/quote">
                <Button
                  size="lg"
                  className="bg-primary-600 hover:bg-primary-700 text-white inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold"
                >
                  Pricing
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
                  <span className="font-medium text-gray-900">1,200+</span> labor-only jobs completed
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 mb-3">Why Choose Labor Only Services?</h2>
            <p className="text-sm sm:text-base text-secondary-600 max-w-2xl mx-auto">
              Get professional moving help without the truck. Perfect for DIY movers who need expert assistance with the heavy lifting.
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
              href="/quote"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              Get Your Free Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS SECTION - COMPACT */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-secondary-900 mb-3">
              Serving Major Cities Nationwide
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto text-sm md:text-base">
              Professional labor-only moving services available in top metropolitan areas.
            </p>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {serviceAreas.map((area, index) => (
              <div key={index} className="group bg-white rounded-lg border border-gray-100 hover:border-primary-100 transition-all duration-200 p-2 sm:p-3 text-center">
                <MapPin className="h-5 w-5 text-primary-600 mx-auto mb-1 sm:mb-2" />
                <h3 className="font-medium text-sm text-secondary-900 truncate">{area.city}</h3>
                <p className="text-xs text-gray-500">{area.state}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/quote"
              className="inline-flex items-center text-sm px-5 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Get a Free Quote
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
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
              Real reviews from DIY movers who got professional help when they needed it most.
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
            Ready for Your DIY Move with Professional Help?
          </h2>
          <p className="text-lg text-secondary-600 mb-8">
            Get the muscle you need without the truck. Save money while getting professional moving expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button
                size="lg"
                className="bg-primary-600 hover:bg-primary-700 text-white inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold"
              >
                Pricing
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
            Available 7 days a week • Same-day booking available • Fully insured & bonded
          </div>
        </div>
      </section>

      <HawkFooter />
    </div>
  )
}
