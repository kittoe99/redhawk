"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, MapPin, Phone, ChevronRight, Search, LogIn, UserPlus, CheckCircle, XCircle, ArrowRight, Star } from "lucide-react"
import { Inter, Montserrat } from "next/font/google"
import { Logo } from "./logo"
import { HawkIcon } from "@/components/quote-form/hawk-icon" // Declare the HawkIcon variable

import Image from "next/image" // Keep this import for the Image component

// Initialize the fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [zipCode, setZipCode] = useState("")
  const [searchResult, setSearchResult] = useState<null | {
    city: string
    available: boolean
    message?: string
  }>(null)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    // Use passive event listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const topNavItems = [
    { href: "/track", label: "TRACK MY MOVE" },
    { href: "/quote", label: "START YOUR MOVE" },
  ]

  const mainNavItems = [
    {
      href: "/services",
      label: "SERVICES",
      icon: <Image src="/icons/services.png" alt="Services" width={24} height={24} />,
    },
    {
      href: "/locations",
      label: "LOCATIONS",
      icon: <Image src="/icons/locations.png" alt="Locations" width={24} height={24} />,
    },
  ]

  const accountItems = [
    { href: "/login", label: "Log In", icon: <LogIn size={16} /> },
    { href: "/signup", label: "Sign Up", icon: <UserPlus size={16} /> },
  ]

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null)
    } else {
      setActiveSection(section)
    }
  }

  const handleZipCodeSearch = async () => {
    if (!zipCode || zipCode.length !== 5 || !/^\d+$/.test(zipCode)) {
      setSearchResult(null)
      return
    }

    setIsSearching(true)

    try {
      // Use the free Zippopotam.us API to get city information
      const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`)

      if (!response.ok) {
        throw new Error("ZIP code not found")
      }

      const data = await response.json()

      if (data && data.places && data.places.length > 0) {
        const place = data.places[0]
        const city = `${place["place name"]}, ${place["state abbreviation"]}`

        // Service area cities and their surrounding states
        const serviceAreas = {
          TX: ["Austin", "Dallas", "Houston", "San Antonio"],
          TN: ["Nashville", "Memphis", "Knoxville"],
          ID: ["Boise", "Meridian", "Nampa"],
          NC: ["Raleigh", "Charlotte", "Durham", "Greensboro"],
          AZ: ["Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler"],
          FL: ["Tampa", "St. Petersburg", "Clearwater", "Orlando"],
          CO: ["Denver", "Boulder", "Fort Collins", "Colorado Springs"],
          OH: ["Columbus", "Cleveland", "Cincinnati"],
          UT: ["Salt Lake City", "Provo", "Ogden", "West Valley City"],
        }

        // Check if the state is in our service areas
        const stateAbbr = place["state abbreviation"] as string
        const isInServiceState = serviceAreas[stateAbbr as keyof typeof serviceAreas] !== undefined

        // If in a service state, consider it available
        const isServiceable = isInServiceState

        setSearchResult({
          city,
          available: isServiceable,
          // Add additional info about proximity
          message: isServiceable
            ? `Service is available in ${stateAbbr}!`
            : "Sorry, we don't currently service this area.",
        })
      } else {
        setSearchResult({
          city: "Unknown Location",
          available: false,
          message: "Location information not available.",
        })
      }
    } catch (error) {
      console.error("Error fetching ZIP code data:", error)
      setSearchResult({
        city: "Invalid ZIP Code",
        available: false,
        message: "Please enter a valid US ZIP code.",
      })
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-white"
      } ${inter.variable} ${montserrat.variable}`}
    >
      {/* Top utility navigation */}
      <div className="bg-gray-100 text-gray-700 hidden md:block">
        <div className="container mx-auto flex items-center justify-between h-10 px-4 max-w-7xl">
          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3 text-primary-600" />
            <span className="text-xs">Service Areas Across the US</span>
          </div>
          <div className="flex items-center space-x-6">
            {topNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-semibold hover:text-primary-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-xs font-semibold hover:text-primary-600 transition-colors">
                LOG IN
              </Link>
              <Link
                href="/signup"
                className="bg-primary-600 hover:bg-primary-700 text-gray-700 px-3 py-1 rounded text-xs font-semibold transition-colors"
              >
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between flex-1 ml-10">
              <nav className="flex items-center space-x-8">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-800 hover:text-primary-600 text-sm font-bold transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter ZIP code"
                      value={zipCode}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === "" || (/^\d+$/.test(value) && value.length <= 5)) {
                          setZipCode(value)
                          if (value.length === 5) {
                            handleZipCodeSearch()
                          } else {
                            setSearchResult(null)
                          }
                        }
                      }}
                      className="pl-3 pr-3 py-1.5 border border-gray-300 rounded text-sm w-40 text-gray-800"
                      maxLength={5}
                    />
                    {searchResult && (
                      <div className="absolute top-full left-0 right-0 mt-1 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="flex items-start">
                          <div
                            className={`p-1 rounded-full mr-2 ${searchResult.available ? "bg-green-100" : "bg-red-100"}`}
                          >
                            {searchResult.available ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-800">{searchResult.city}</p>
                            <p className="text-xs mt-0.5 text-gray-600">
                              {searchResult.message ||
                                (searchResult.available
                                  ? "Service is available in this area!"
                                  : "Sorry, we don't currently service this area.")}
                            </p>
                            {searchResult.available && (
                              <Link
                                href="/service-type"
                                className="mt-2 inline-block text-xs font-medium bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded"
                              >
                                Get a Quote
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleZipCodeSearch}
                    disabled={isSearching || zipCode.length !== 5}
                    className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    {isSearching ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-1" />
                        Search
                      </>
                    )}
                  </button>
                </div>
                <Link
                  href="/quote"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
                >
                  GET QUOTE
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Link
                href="/service-type"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
              >
                QUOTE
              </Link>
              <button
                className="flex items-center justify-center p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Simplified */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b p-4 z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                  <button
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Search Section */}
              <div className="p-4 border-b">
                <div className="relative">
                  <div className="flex items-center border rounded-lg focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-500">
                    <input
                      type="text"
                      placeholder="Enter ZIP code"
                      value={zipCode}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === "" || (/^\d+$/.test(value) && value.length <= 5)) {
                          setZipCode(value)
                          if (value.length === 5) {
                            handleZipCodeSearch()
                          } else {
                            setSearchResult(null)
                          }
                        }
                      }}
                      className="flex-1 px-3 py-2 text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none text-sm"
                      maxLength={5}
                    />
                    <button
                      onClick={handleZipCodeSearch}
                      disabled={isSearching || zipCode.length !== 5}
                      className="px-3 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-r-[5px] flex items-center justify-center"
                    >
                      {isSearching ? (
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {searchResult && (
                  <div
                    className={`mt-3 p-3 text-sm rounded-lg ${
                      searchResult.available ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {searchResult.available ? (
                        <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-emerald-600" />
                      ) : (
                        <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium">{searchResult.city}</p>
                        <p className="text-sm mt-1">
                          {searchResult.message ||
                            (searchResult.available
                              ? "Service is available in this area!"
                              : searchResult.city === "Invalid ZIP Code"
                                ? "Please enter a valid US ZIP code."
                                : "Sorry, we don't currently service this area.")}
                        </p>
                        {searchResult.available && (
                          <Link
                            href={`/service-type?zipcode=${zipCode}`}
                            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-800"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Get a Quote
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-b">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h3>
                <div className="flex gap-3">
                  <Link
                    href="/service-type"
                    className="flex items-center gap-2 p-2 rounded-lg border hover:border-primary-300 hover:bg-primary-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="p-1.5 bg-primary-50 rounded-lg">
                      <MapPin className="h-4 w-4 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Get Quote</span>
                  </Link>
                  <Link
                    href="/track"
                    className="flex items-center gap-2 p-2 rounded-lg border hover:border-gray-300 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="p-1.5 bg-gray-100 rounded-lg">
                      <MapPin className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Track Move</span>
                  </Link>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto">
                <div className="py-1">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between px-5 py-3 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="flex items-center">
                        <div className="p-1.5 rounded-lg mr-3 bg-gray-100">
                          {React.cloneElement(item.icon, { className: 'h-5 w-5 text-gray-600' })}
                        </div>
                        <span className="font-medium text-gray-900">
                          {item.label}
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Enhanced Contact Footer */}
              <div className="p-5 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white">
                <div className="flex items-center text-sm mb-3">
                  <div className="p-2 bg-white/20 rounded-xl mr-3">
                    <Phone size={16} />
                  </div>
                  <div>
                    <a href="tel:+18005551234" className="font-bold hover:text-primary-300 transition-colors">
                      (800) 555-1234
                    </a>
                    <p className="text-xs text-gray-300">24/7 Support Available</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">Your trusted moving marketplace</p>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-xs text-gray-300 ml-1">4.9</span>
                  </div>
                </div>
              </div>

              {/* Create Account Section - Minimalist */}
              <div className="bg-white py-4 border-t border-gray-100">
                <div className="px-5">
                  <div className="text-center text-sm text-gray-500 mb-3">
                    Create an account for a better experience
                  </div>
                  <div className="flex justify-center gap-4">
                    <Link 
                      href="/register" 
                      className="text-sm font-medium text-primary-600 hover:text-primary-800 hover:underline flex items-center gap-1.5"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      Sign Up
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link 
                      href="/login" 
                      className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline flex items-center gap-1.5"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="h-3.5 w-3.5" />
                      Log In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
