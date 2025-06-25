"use client"

import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"

export function ServiceTypeSelection() {
  return (
    <div className="min-h-screen bg-white">
      <MainNav />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12 lg:mb-16">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Choose Your Service
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Select the service you need and get started with professional help today
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-8 max-w-4xl mx-auto">
              {/* Moving Services */}
              <Link href="/apartment-moves" className="block">
                <div className="group bg-white rounded-lg sm:rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                  <div className="relative h-28 sm:h-40 md:h-48 overflow-hidden">
                    <img
                      src="/services/house-moving-red.png"
                      alt="Moving Services"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                      <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-white">Moving Services</h3>
                    </div>
                  </div>
                  <div className="p-2 sm:p-4 md:p-6">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2 sm:line-clamp-none">
                      Professional moving help for homes, apartments, and offices.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Junk Removal */}
              <Link href="/junk-removal" className="block">
                <div className="group bg-white rounded-lg sm:rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                  <div className="relative h-28 sm:h-40 md:h-48 overflow-hidden">
                    <img
                      src="/services/junk-removal-red.png"
                      alt="Junk Removal"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                      <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-white">Junk Removal</h3>
                    </div>
                  </div>
                  <div className="p-2 sm:p-4 md:p-6">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2 sm:line-clamp-none">
                      Fast and eco-friendly junk removal service.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Contact Options */}
            <div className="text-center mt-8 sm:mt-10 lg:mt-12">
              <p className="text-gray-700 font-medium mb-4">Need help deciding?</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+17208429167"
                  className="inline-flex items-center px-5 py-2.5 bg-white border border-gray-200 text-primary-600 hover:bg-gray-50 font-medium rounded-lg transition-colors shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  (720) 842-9167
                </a>
                <a
                  href="#chat"
                  className="inline-flex items-center px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  Chat with Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <HawkFooter />
    </div>
  )
}
