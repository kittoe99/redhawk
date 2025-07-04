"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"
import { HowItWorksPopup } from "@/components/how-it-works-popup"

export function HeroSection() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [hawkPosition, setHawkPosition] = useState({ x: 0, y: 0 })
  const [isFlying, setIsFlying] = useState(false)
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  // Function to animate the hawk flying across the screen
  const animateHawk = () => {
    if (isFlying) return

    setIsFlying(true)

    // Start position (left side of screen)
    setHawkPosition({ x: -50, y: Math.random() * 30 })

    // Animate across the screen
    const startTime = Date.now()
    const duration = 2000 // 2 seconds

    const flyAcross = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Calculate new position with slight wave motion
      const newX = progress * (window.innerWidth + 100) - 50
      const newY = Math.sin(progress * Math.PI * 2) * 15 + 30

      setHawkPosition({ x: newX, y: newY })

      if (progress < 1) {
        requestAnimationFrame(flyAcross)
      } else {
        setTimeout(() => setIsFlying(false), 2000) // Wait 2 seconds before allowing another animation
      }
    }

    requestAnimationFrame(flyAcross)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the form submission
    console.log("Phone number submitted:", phoneNumber)
    // You would typically send this to your backend
  }

  // Custom hawk icon component
  const HawkIcon = ({ size = 16, className = "" }) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41 L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3 c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0 c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z" />
    </svg>
  )

  // Define service type
  type Service = {
    id: string;
    name: string;
    description: string;
    image: string;
  };

  // Services data
  const services: Service[] = [
    {
      id: "apartment",
      name: "Apartment Moves",
      description: "Efficient moving help for apartments, condos, and smaller spaces.",
      image: "/services/apartment-moving-red.png"
    },
    {
      id: "large",
      name: "Large Moves",
      description: "Complete house and large property relocations with experienced teams.",
      image: "/services/house-moving-red.png"
    },
    {
      id: "labor",
      name: "Labor Only",
      description: "Professional moving labor for loading, unloading, and heavy lifting.",
      image: "/services/labor-only-red.png"
    },
    {
      id: "junk",
      name: "Junk Removal",
      description: "Efficient removal and disposal of unwanted items during your move.",
      image: "/services/junk-removal-red.png"
    }
  ]

  // Service cities data with images
  const serviceCities = [
    { name: "Austin", state: "TX", color: "bg-blue-50" },
    { name: "Nashville", state: "TN", color: "bg-yellow-50" },
    { name: "Boise", state: "ID", color: "bg-green-50" },
    { name: "Raleigh", state: "NC", color: "bg-indigo-50" },
    { name: "Phoenix", state: "AZ", color: "bg-orange-50" },
    { name: "Tampa", state: "FL", color: "bg-cyan-50" },
    { name: "Charlotte", state: "NC", color: "bg-purple-50" },
    { name: "Denver", state: "CO", color: "bg-emerald-50" },
    { name: "Columbus", state: "OH", color: "bg-rose-50" },
    { name: "Salt Lake City", state: "UT", color: "bg-amber-50" },
    { name: "Baltimore", state: "MD", color: "bg-teal-50" },
  ]

  return (
    <section className="relative pt-8 pb-0 bg-white w-full">
      <div className="container mx-auto px-4 max-w-7xl mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="relative z-10">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-50 rounded-full opacity-20 blur-xl"></div>

            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary-600 text-white font-medium text-sm border border-primary-700 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
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

            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6 leading-tight">
              Book Moving Help From{" "}
              <span className="text-primary-600 relative">
                $69/Hour
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

            <p className="text-base mb-8 max-w-lg leading-relaxed text-secondary-600">
              Get matched with verified independent moving helpers in your area.
            </p>

            <div className="mb-10 relative">
              <div className="relative bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Subtle accent in corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary-50 rounded-bl-full -z-10"></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex flex-row gap-2">
                    <Link href="/service-type">
                      <Button
                        size="lg"
                        className="bg-primary-600 hover:bg-primary-700 text-white inline-flex items-center gap-2 rounded-xl"
                      >
                        View Pricing
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-300 text-gray-800 hover:bg-gray-100 rounded-xl"
                      onClick={() => setShowHowItWorks(true)}
                    >
                      How It Works
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
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

              {/* How It Works Popup */}
              <HowItWorksPopup isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative flex justify-center md:justify-end">
            {/* Decorative elements */}
            <div className="absolute -z-10 w-4/5 h-4/5 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 blur-md"></div>
            <div className="absolute -z-10 w-1/3 h-1/3 -top-4 -right-4 rounded-full bg-primary-100 opacity-50"></div>
            <div className="absolute -z-10 w-1/4 h-1/4 -bottom-2 -left-2 rounded-full bg-primary-200 opacity-40"></div>

            {/* Clean image presentation with subtle design */}
            <div className="relative rounded-full overflow-hidden shadow-lg w-[70%] sm:w-[60%] md:w-[90%] border-[2px] border-primary-100 aspect-square transform hover:scale-[1.02] transition-all duration-500 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/10 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-primary-200 to-white opacity-50 blur-sm"></div>
              <div className="w-full h-full bg-gray-200 flex items-center justify-center relative z-0">
                <Image
                  src="/hawk-helpers.png"
                  width={400}
                  height={400}
                  alt="Professional Redhawk Relocation movers carrying furniture in a modern home"
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Enhanced image styling */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 to-transparent mix-blend-overlay"></div>

                {/* Decorative border with gradient - minimalistic design */}
                <div className="absolute inset-0 border-[10px] border-white/20 rounded-xl"></div>
                <div className="absolute inset-0 border-[4px] border-primary-600/15 rounded-xl"></div>

                {/* Subtle shine effect */}
                <div className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-tr from-white/40 via-transparent to-transparent rotate-12 opacity-30 animate-[spin_15s_linear_infinite]"></div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-6 left-6 w-12 h-12">
                <div className="absolute w-full h-0.5 bg-white/50 rounded-full transform -rotate-45"></div>
                <div className="absolute h-full w-0.5 bg-white/50 rounded-full transform -rotate-45"></div>
              </div>
              <div className="absolute bottom-6 right-6 w-12 h-12">
                <div className="absolute w-full h-0.5 bg-white/50 rounded-full transform -rotate-45"></div>
                <div className="absolute h-full w-0.5 bg-white/50 rounded-full transform -rotate-45"></div>
              </div>

              {/* Add a badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 font-medium text-sm border-l-[2px] border-primary-600 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-8 h-8 opacity-10">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                  >
                    <path
                      d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
                    />
                  </svg>
                </div>
                <span className="flex h-3 w-3 rounded-full bg-primary-600 animate-pulse relative">
                  <span className="absolute inset-0 rounded-full bg-primary-600 animate-ping opacity-75"></span>
                </span>
                <span className="relative z-10">Connect With Moving Professionals</span>
              </div>
            </div>
          </div>
        </div>
        <div className="section-divider-mixed w-full mt-8 rounded-full" aria-hidden="true"></div>
      </div>
      {/* Services Section */}
      <section className="pt-12 pb-12 bg-gradient-to-b from-white to-gray-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 mb-3">Our Services</h2>
            <p className="text-sm sm:text-base text-secondary-600 max-w-2xl mx-auto">
              Professional moving assistance tailored to your specific needs, from apartment relocations to specialty
              item transport.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <Link key={service.id} href={`/${service.id === 'apartment' ? 'apartment-moves' : service.id === 'large' ? 'large-moves' : service.id === 'labor' ? 'labor-only' : service.id === 'junk' ? 'junk-removal' : 'quote'}`} className="block">
                <div className="group bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden h-full flex flex-col">
                  <div className="relative h-32 sm:h-40 md:h-48">
                    <Image
                      src={service.image}
                      alt={`${service.name} services`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white text-sm sm:text-base md:text-lg font-bold leading-tight">
                        {service.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 flex-grow flex flex-col">
                    <p className="text-xs sm:text-sm text-secondary-600 leading-relaxed flex-grow">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-10">
            <Link
              href="/quote"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              Get Moving Help Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas Section - Simplified with No Images */}
      <section className="pt-12 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">Service Areas</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Moving help available in these major cities and surrounding areas
            </p>
          </div>

          {/* All Cities in a Compact Grid - New Clean Design */}
          <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
            {serviceCities.map((city) => (
              <Link
                key={city.name}
                href={`/locations/${city.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex items-center px-3 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm hover:shadow hover:border-primary-100 hover:bg-primary-50 transition-all duration-300 group"
              >
                <MapPin className="h-3 w-3 text-primary-600 mr-1.5" />
                <span className="font-medium text-sm text-secondary-900 group-hover:text-primary-600 transition-colors">
                  {city.name}, <span className="text-secondary-500">{city.state}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
        </div>
      </section>
    </section>
  )
}
