"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
`

const ZipCodeStep: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useQuoteWizard()
  const [error, setError] = useState<string>("")
  const [locationInfo, setLocationInfo] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showContinueButton, setShowContinueButton] = useState(false)

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
      
      {/* Enhanced header section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mb-6 shadow-lg">
          <svg className="w-10 h-10 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
          Where are you moving from?
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md mx-auto">
          Enter your ZIP code so we can provide you with accurate pricing and check service availability in your area.
        </p>
      </div>

      {/* Enhanced form with better styling */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative">
          <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-3">
            ZIP Code
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <Input
              type="text"
              id="zipCode"
              value={formData.zipCode || ""}
              onChange={(e) => {
                updateFormData({ zipCode: e.target.value })
                setLocationInfo(null)
              }}
              className={`
                pl-12 pr-6 py-4 text-lg h-14 w-full
                border-2 rounded-xl
                transition-all duration-200 ease-in-out
                focus:ring-4 focus:ring-primary-100
                hover:border-gray-300
                ${error 
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100" 
                  : "border-gray-200 focus:border-primary-500"
                }
                shadow-sm hover:shadow-md focus:shadow-lg
                backdrop-blur-sm bg-white/90
              `}
              placeholder="Enter 5-digit ZIP code"
              maxLength={5}
            />
          </div>
          
          {/* Enhanced error display */}
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}
          
          {/* Enhanced location confirmation */}
          {locationInfo && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl animate-fade-in shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-green-800 font-semibold text-base">Great! We serve your area</p>
                  <p className="text-green-700 text-sm mt-1">{locationInfo}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-150"></div>
                    </div>
                    <p className="text-green-600 text-xs">Continuing automatically...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced buttons with better design */}
        {!showContinueButton ? (
          <Button
            type="submit"
            className="
              w-full h-14 text-lg font-semibold
              bg-gradient-to-r from-primary-600 to-primary-700 
              hover:from-primary-700 hover:to-primary-800
              focus:from-primary-700 focus:to-primary-800
              text-white rounded-xl
              transition-all duration-200 ease-in-out
              transform hover:scale-[1.02] active:scale-[0.98]
              shadow-lg hover:shadow-xl
              focus:ring-4 focus:ring-primary-200
              disabled:opacity-50 disabled:transform-none disabled:shadow-lg
            "
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Checking availability...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>Check Service Area</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </Button>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-500" data-question="continue-button">
            <Button
              type="button"
              onClick={handleContinue}
              className="
                w-full h-14 text-lg font-semibold
                bg-gradient-to-r from-green-600 to-green-700 
                hover:from-green-700 hover:to-green-800
                text-white rounded-xl
                transition-all duration-200 ease-in-out
                transform hover:scale-[1.02] active:scale-[0.98]
                shadow-lg hover:shadow-xl
                focus:ring-4 focus:ring-green-200
              "
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Continue to Next Step</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Button>
          </div>
        )}
      </form>

      {/* Enhanced footer with service areas */}
      <div className="mt-10 pt-8 border-t border-gray-100">
        <div className="text-center space-y-4">
          <p className="text-sm font-medium text-gray-700">We proudly serve these major cities:</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {['Phoenix', 'Austin', 'Nashville', 'Denver', 'Tampa', 'Charlotte', 'Raleigh', 'Boise'].map((city) => (
              <span key={city} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-primary-50 hover:text-primary-700 transition-colors">
                {city}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Don't see your city? We're expanding rapidly! Enter your ZIP code to check if we serve your area.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ZipCodeStep
