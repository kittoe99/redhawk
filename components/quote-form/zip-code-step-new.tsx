"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Loader2, CheckCircle, AlertCircle, Truck, Award, Clock, Shield } from "lucide-react"

const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
`

// Service areas by state/region
const serviceAreas = {
  colorado: ["Denver", "Colorado Springs", "Boulder", "Fort Collins", "Aurora", "Lakewood", "Thornton", "Arvada"],
  california: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "Oakland", "San Jose", "Fresno", "Long Beach"],
  texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso", "Arlington", "Corpus Christi"],
  florida: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale", "St. Petersburg", "Hialeah", "Tallahassee"],
  newyork: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Cheektowaga"],
  illinois: ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville", "Springfield", "Peoria", "Elgin"],
  pennsylvania: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton", "Bethlehem", "Lancaster"],
  ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton", "Parma", "Canton"],
  georgia: ["Atlanta", "Augusta", "Columbus", "Macon", "Savannah", "Athens", "Sandy Springs", "Roswell"],
  michigan: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Lansing", "Ann Arbor", "Flint", "Dearborn"],
  default: ["Denver", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"]
}

const ZipCodeStep: React.FC = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useQuoteWizard()
  const [error, setError] = useState<string>("")
  const [locationInfo, setLocationInfo] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showContinueButton, setShowContinueButton] = useState(false)
  const [userLocation, setUserLocation] = useState<{state: string, city: string} | null>(null)
  const [relevantCities, setRelevantCities] = useState<string[]>(serviceAreas.default)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)

  // Fetch user's location based on IP
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        setIsLoadingLocation(true)
        // Using ipapi.co - free tier allows 1000 requests per day
        const response = await fetch('https://ipapi.co/json/')
        
        if (!response.ok) {
          throw new Error('Failed to fetch location')
        }
        
        const data = await response.json()
        
        if (data.region && data.city) {
          const state = data.region.toLowerCase().replace(/\s+/g, '')
          const city = data.city
          
          setUserLocation({ state, city })
          
          // Get relevant cities based on user's state
          const stateCities = serviceAreas[state as keyof typeof serviceAreas] || serviceAreas.default
          setRelevantCities(stateCities)
        }
      } catch (error) {
        console.error('Error fetching user location:', error)
        // Fallback to default cities
        setRelevantCities(serviceAreas.default)
      } finally {
        setIsLoadingLocation(false)
      }
    }

    fetchUserLocation()
  }, [])

  const lookupZipCode = async (zip: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://api.zippopotam.us/us/${zip}`)

      if (!response.ok) {
        throw new Error("Invalid ZIP code")
      }

      const data = await response.json()
      const place = data.places[0]
      return `${place["place name"]}, ${place["state abbreviation"]}`
    } catch (err) {
      console.error("Error looking up ZIP code:", err)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate zip code (must be exactly 5 digits)
    if (!/^\d{5}$/.test(formData.zipCode || "")) {
      setError("Please enter a valid 5-digit ZIP code")
      return
    }

    // Clear any previous errors
    setError("")

    // Look up the ZIP code
    const location = await lookupZipCode(formData.zipCode)

    if (!location) {
      setError("Could not find location for this ZIP code")
      return
    }

    // Display the location info
    setLocationInfo(location)
    // Don't auto-proceed anymore, wait for user to click continue
  }

  const handleContinue = () => {
    goToNextStep()
  }

  // Show continue button when location is validated
  useEffect(() => {
    if (locationInfo) {
      setTimeout(() => setShowContinueButton(true), 1000)
    } else {
      setShowContinueButton(false)
    }
  }, [locationInfo])

  // Auto scroll to continue button
  useEffect(() => {
    if (showContinueButton) {
      setTimeout(() => {
        const element = document.querySelector('[data-question="continue-button"]')
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
      }, 100)
    }
  }, [showContinueButton])

  return (
    <div className="max-w-lg mx-auto">
      <style jsx>{styles}</style>
      
      {/* Enhanced Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-4 shadow-lg">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
          Enter Your ZIP Code
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          We'll check if our moving services are available in your area and provide you with an accurate estimate.
        </p>
      </div>

      {/* Trust Indicators - Minimal */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-gray-600">
        <div className="flex items-center">
          <Shield className="w-4 h-4 text-green-500 mr-1.5" />
          <span>Free Quote</span>
        </div>
        <div className="flex items-center">
          <CheckCircle className="w-4 h-4 text-blue-500 mr-1.5" />
          <span>Secure</span>
        </div>
        <div className="flex items-center">
          <Award className="w-4 h-4 text-yellow-500 mr-1.5" />
          <span>5★ Rated</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 text-purple-500 mr-1.5" />
          <span>Quick Response</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-3">
            ZIP Code *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              id="zipCode"
              value={formData.zipCode || ""}
              onChange={(e) => {
                updateFormData({ zipCode: e.target.value })
                setLocationInfo(null)
              }}
              className={`pl-12 h-14 text-lg font-medium rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-primary-500/20 hover:border-primary-300 ${
                error 
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
                  : "border-gray-200 focus:border-primary-500"
              }`}
              placeholder="Enter 5-digit ZIP code"
              maxLength={5}
            />
          </div>
          
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}
          
          {locationInfo && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl animate-fade-in">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-semibold">{locationInfo}</p>
                  <p className="text-green-600 text-sm">Service area confirmed! ✓</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {!showContinueButton ? (
          <Button
            type="submit"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Checking availability...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Check Availability</span>
              </div>
            )}
          </Button>
        ) : (
          <div className="flex gap-4 animate-in slide-in-from-bottom-4 duration-500" data-question="continue-button">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              className="w-full h-14 text-lg font-semibold border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleContinue}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Continue to Next Step</span>
              </div>
            </Button>
          </div>
        )}
      </form>

      {/* Service Area Showcase - Now with IP-based location detection */}
      <div className="mt-10 text-center">
        {isLoadingLocation ? (
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
            <p className="text-sm text-gray-600 font-medium">Detecting your location...</p>
          </div>
        ) : (
          <div className="mb-4">
            {userLocation ? (
              <p className="text-sm text-gray-600 font-medium">
                We serve cities near you in {userLocation.state.charAt(0).toUpperCase() + userLocation.state.slice(1)}
              </p>
            ) : (
              <p className="text-sm text-gray-600 font-medium">We serve major cities nationwide</p>
            )}
          </div>
        )}
        
        <div className="flex flex-wrap justify-center gap-2">
          {relevantCities.map((city) => (
            <span 
              key={city} 
              className="px-3 py-1.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-full border border-primary-200 hover:bg-primary-100 transition-colors duration-200"
            >
              {city}
            </span>
          ))}
        </div>
        
        {userLocation && (
          <div className="mt-3 text-xs text-gray-500">
            <MapPin className="w-3 h-3 inline mr-1" />
            Detected location: {userLocation.city}
          </div>
        )}
      </div>
    </div>
  )
}

export default ZipCodeStep
