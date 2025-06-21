"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, MapPin, Phone, ChevronRight, Search, LogIn, UserPlus, CheckCircle, XCircle } from "lucide-react"
import { Logo } from "@/components/logo"
import { Inter, Montserrat } from "next/font/google"
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
        const stateAbbr = place["state abbreviation"]
        const isInServiceState = serviceAreas[stateAbbr] !== undefined

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

      {/* Mobile Menu - Enhanced */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 h-full w-[90%] max-w-sm bg-gray-50 shadow-xl transform transition-transform duration-300 ease-in-out overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Header with logo and close button */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <Logo />
                <button
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search bar */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative flex items-center">
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
                    className="w-full pl-3 pr-16 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800"
                    maxLength={5}
                  />
                  <button
                    onClick={handleZipCodeSearch}
                    disabled={isSearching || zipCode.length !== 5}
                    className="absolute right-0 h-full px-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-r-lg transition-colors flex items-center justify-center"
                  >
                    {isSearching ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {searchResult && (
                  <div
                    className={`mt-3 p-3 rounded-lg border ${
                      searchResult.available
                        ? "bg-red-50 border-red-200 text-red-800"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`p-1 rounded-full mr-2 ${searchResult.available ? "bg-red-100" : "bg-red-100"}`}>
                        {searchResult.available ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{searchResult.city}</p>
                        <p className="text-xs mt-0.5">
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
                            className="mt-2 inline-block text-xs font-medium bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Get a Quote
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick actions */}
              <div className="relative p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/service-type"
                    className="flex flex-col items-center justify-center bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-lg transition-all duration-200 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HawkIcon className="h-6 w-6 mb-1.5" />
                    <span className="text-xs font-bold">GET QUOTE</span>
                  </Link>
                  <Link
                    href="/track"
                    className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 p-3 rounded-lg transition-all duration-200 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MapPin className="h-6 w-6 mb-1.5 text-primary-600" />
                    <span className="text-xs font-bold">TRACK MOVE</span>
                  </Link>
                </div>
                <div className="absolute -left-1 top-0 bottom-0 w-1 bg-primary-600 rounded-r"></div>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto">
                <div className="py-2">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between px-4 py-2.5 text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="flex items-center">
                        <span className="p-2 rounded-full mr-3 text-primary-600">{item.icon}</span>
                        <span className="font-medium text-gray-800">{item.label}</span>
                      </span>
                      <ChevronRight size={18} className="text-gray-400" />
                    </Link>
                  ))}
                </div>

                {/* Account section */}
                <div className="bg-gray-50 mt-2 py-4">
                  <div className="px-4 mb-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 px-4">
                    {" "}
                    {/* Reduced gap from gap-3 to gap-2 */}
                    {accountItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col items-center justify-center p-2 rounded-lg bg-red-600 hover:bg-red-700 border border-red-700 hover:border-red-800 hover:shadow-sm transition-all text-white" // Reduced p-3 to p-2
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="bg-red-500 p-1.5 rounded-full mb-1 text-white">
                          {" "}
                          {/* Reduced p-2 to p-1.5 and mb-2 to mb-1 */}
                          {item.icon}
                        </span>
                        <span className="text-xs font-medium text-white">{item.label}</span>{" "}
                        {/* Reduced text-sm to text-xs */}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Contact info footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Phone size={16} className="mr-2 text-primary-600" />
                  <a href="tel:+18005551234" className="hover:text-primary-600 transition-colors text-gray-700">
                    (800) 555-1234
                  </a>
                </div>
                <p className="text-xs text-gray-500">Your trusted moving help marketplace</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
