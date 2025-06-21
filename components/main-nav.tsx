"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, MapPin, Phone, ChevronRight, Search, LogIn, UserPlus, CheckCircle, XCircle, ArrowRight, Star } from "lucide-react"
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
          className="md:hidden fixed inset-0 z-50 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-lg transition-all duration-300 animate-in fade-in"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 h-full w-[92%] max-w-sm bg-gradient-to-b from-white via-gray-50/95 to-white shadow-2xl transform transition-all duration-500 ease-out animate-in slide-in-from-right overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative background elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-primary-100/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-8 w-24 h-24 bg-blue-100/40 rounded-full blur-2xl"></div>
            
            <div className="flex flex-col h-full relative z-10">
              {/* Enhanced Header */}
              <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 p-5 shadow-lg">
                {/* Decorative elements */}
                <div className="absolute top-2 right-16 w-8 h-8 bg-white/20 rounded-full blur-lg"></div>
                <div className="absolute bottom-2 left-12 w-6 h-6 bg-white/15 rounded-full blur-md"></div>
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Logo />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">Redhawk</p>
                      <p className="text-primary-100 text-xs">Moving Marketplace</p>
                    </div>
                  </div>
                  <button
                    className="p-3 rounded-xl text-white hover:bg-white/20 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              {/* Enhanced Search Section */}
              <div className="p-5 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
                <div className="relative">
                  <div className="flex items-center bg-white rounded-2xl border-2 border-gray-200 focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100 transition-all duration-200 shadow-sm">
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
                      className="flex-1 px-4 py-3 text-gray-800 placeholder-gray-500 bg-transparent rounded-l-2xl focus:outline-none text-base"
                      maxLength={5}
                    />
                    <button
                      onClick={handleZipCodeSearch}
                      disabled={isSearching || zipCode.length !== 5}
                      className="px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-r-2xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl disabled:shadow-none"
                    >
                      {isSearching ? (
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Search className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {searchResult && (
                  <div
                    className={`mt-4 p-4 rounded-2xl border-2 transition-all duration-300 animate-in slide-in-from-top-2 ${
                      searchResult.available
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-xl ${searchResult.available ? "bg-emerald-100" : "bg-red-100"}`}>
                        {searchResult.available ? 
                          <CheckCircle className="h-5 w-5 text-emerald-600" /> : 
                          <XCircle className="h-5 w-5 text-red-600" />
                        }
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-sm ${searchResult.available ? "text-emerald-800" : "text-red-800"}`}>
                          {searchResult.city}
                        </p>
                        <p className={`text-xs mt-1 ${searchResult.available ? "text-emerald-700" : "text-red-700"}`}>
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
                            className="mt-3 inline-flex items-center gap-2 text-xs font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Get a Quote
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Quick Actions */}
              <div className="relative p-5 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 to-blue-50/30"></div>
                <div className="relative">
                  <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4 flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/service-type"
                      className="group flex flex-col items-center justify-center bg-gradient-to-br from-primary-600 via-primary-500 to-primary-600 hover:from-primary-700 hover:via-primary-600 hover:to-primary-700 text-white p-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-2xl border border-primary-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="p-2 bg-white/20 rounded-xl mb-2 group-hover:bg-white/30 transition-all duration-200">
                        <HawkIcon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-bold tracking-wide">GET QUOTE</span>
                      <span className="text-xs text-primary-100 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-200">Start moving</span>
                    </Link>
                    <Link
                      href="/track"
                      className="group flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 p-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-2xl"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="p-2 bg-primary-100 rounded-xl mb-2 group-hover:bg-primary-200 transition-all duration-200">
                        <MapPin className="h-6 w-6 text-primary-600" />
                      </div>
                      <span className="text-xs font-bold tracking-wide">TRACK MOVE</span>
                      <span className="text-xs text-gray-600 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-200">Follow progress</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Enhanced Navigation Links */}
              <nav className="flex-1 overflow-y-auto bg-white">
                <div className="py-2">
                  {mainNavItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center justify-between px-5 py-4 text-gray-800 hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 active:bg-primary-100 transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="flex items-center">
                        <div className="p-3 rounded-2xl mr-4 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-primary-500 group-hover:to-primary-600 transition-all duration-200 shadow-sm group-hover:shadow-lg">
                          <span className="text-gray-600 group-hover:text-white transition-colors duration-200">
                            {item.icon}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-gray-800 group-hover:text-primary-700 transition-colors duration-200">
                            {item.label}
                          </span>
                          <p className="text-xs text-gray-500 group-hover:text-primary-600 transition-colors duration-200 mt-0.5">
                            {item.href === '/services' ? 'View our services' : 'Find service areas'}
                          </p>
                        </div>
                      </span>
                      <ChevronRight size={18} className="text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Enhanced Account Section */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-5 border-t border-gray-200">
                <div className="px-5 mb-4">
                  <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Account
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3 px-5">
                  {accountItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-primary-600 hover:from-primary-700 hover:via-primary-600 hover:to-primary-700 border border-primary-700 hover:border-primary-800 shadow-lg hover:shadow-2xl transition-all duration-300 text-white transform hover:-translate-y-1 hover:scale-105"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="bg-white/20 p-2 rounded-xl mb-2 group-hover:bg-white/30 transition-all duration-200">
                        {item.icon}
                      </div>
                      <span className="text-xs font-bold tracking-wide text-white">{item.label}</span>
                      <span className="text-xs text-primary-100 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        {item.href === '/login' ? 'Access account' : 'Create account'}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

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
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
