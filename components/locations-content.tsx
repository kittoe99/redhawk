"use client"

import { useState } from "react"
import { MapPin, Search, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function LocationsContent() {
  const [activeTab, setActiveTab] = useState("map")
  const [searchTerm, setSearchTerm] = useState("")

  const serviceCities = [
    // Primary service cities
    { name: "Austin, Texas", isMainHub: true },
    { name: "Nashville, Tennessee", isMainHub: true },
    { name: "Boise, Idaho", isMainHub: true },
    { name: "Raleigh, North Carolina", isMainHub: true },
    { name: "Phoenix, Arizona", isMainHub: true },
    { name: "Tampa, Florida", isMainHub: true },
    { name: "Charlotte, North Carolina", isMainHub: true },
    { name: "Denver, Colorado", isMainHub: true },
    { name: "Columbus, Ohio", isMainHub: true },
    { name: "Salt Lake City, Utah", isMainHub: true },
  ].sort((a, b) => a.name.localeCompare(b.name))

  // Filter cities based on search term
  const filteredCities = serviceCities.filter((city) => city.name.toLowerCase().includes(searchTerm.toLowerCase()))

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

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      {/* Introduction */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4">Cities We Serve</h2>
        <p className="text-secondary-700">
          Redhawk Relocation proudly serves 10 major cities across the United States. Our platform connects you with
          local moving professionals in each of these metropolitan areas and their surrounding communities.
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex justify-center border-b border-gray-200">
        <button
          onClick={() => setActiveTab("map")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "map"
              ? "border-b-2 border-primary-600 text-primary-600"
              : "text-secondary-600 hover:text-primary-600"
          }`}
        >
          Service Area Map
        </button>
        <button
          onClick={() => setActiveTab("cities")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "cities"
              ? "border-b-2 border-primary-600 text-primary-600"
              : "text-secondary-600 hover:text-primary-600"
          }`}
        >
          Cities We Serve
        </button>
      </div>

      {/* Map view */}
      {activeTab === "map" && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden border-2 border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-b from-primary-600/5 to-primary-600/0"></div>
              <Image
                src="/usa-service-areas.png"
                alt="Redhawk Relocation service areas map"
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />

              {/* Map overlay with service cities */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full relative">
                  {/* City markers would ideally be positioned correctly on the map */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md flex items-center">
                      <MapPin className="h-4 w-4 text-primary-600 mr-1" />
                      <span className="text-xs font-medium">Multiple Cities</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Our Service Areas</h3>
              <p className="text-secondary-700">
                Our platform connects you with moving professionals in these major metropolitan areas and their
                surrounding communities.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Austin",
                  "Nashville",
                  "Boise",
                  "Raleigh",
                  "Phoenix",
                  "Tampa",
                  "Charlotte",
                  "Denver",
                  "Columbus",
                  "Salt Lake City",
                ].map((city) => (
                  <Link
                    key={city}
                    href={`/locations/${city.toLowerCase().replace(/\s+/g, "-")}`}
                    className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center hover:bg-primary-100 transition-colors"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cities list view */}
      {activeTab === "cities" && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 text-gray-900"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {/* Add legend */}
              <div className="flex flex-wrap gap-6 mt-4 justify-center text-sm">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                    <HawkIcon size={10} className="text-primary-600" />
                  </div>
                  <span>Major Service Cities</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                    <MapPin className="h-3 w-3 text-secondary-600" />
                  </div>
                  <span>Surrounding Areas Also Serviced</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredCities.map((city) => {
                // Extract the city name without state and convert to URL format
                const cityName = city.name.split(",")[0].toLowerCase().replace(/\s+/g, "-")

                return (
                  <Link
                    href={`/locations/${cityName}`}
                    key={city.name}
                    className="p-3 rounded-lg border border-primary-200 bg-primary-50 hover:bg-primary-100 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                        <HawkIcon size={14} className="text-primary-600" />
                      </div>
                      <div>
                        <span className="font-medium text-primary-700">{city.name}</span>
                        <span className="text-xs text-secondary-600 block">And surrounding areas</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {filteredCities.length === 0 && (
              <div className="text-center py-8 text-secondary-500">No cities found matching your search.</div>
            )}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Move in One of Our Service Areas?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Whether you're moving across town or to a new city, our platform connects you with reliable moving
            professionals to make your relocation stress-free.
          </p>
          <Button className="bg-white text-primary-600 hover:bg-white/90" size="lg" asChild>
            <Link href="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
