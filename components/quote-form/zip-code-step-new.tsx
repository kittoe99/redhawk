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
    <div className="max-w-md mx-auto">
      <style jsx>{styles}</style>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Enter Your ZIP Code</h2>
        <p className="text-gray-600 text-sm md:text-base">
          We'll check if our moving services are available in your area.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code
          </label>
          <Input
            type="text"
            id="zipCode"
            value={formData.zipCode || ""}
            onChange={(e) => {
              updateFormData({ zipCode: e.target.value })
              setLocationInfo(null)
            }}
            className={`text-lg h-12 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
            placeholder="Enter 5-digit ZIP code"
            maxLength={5}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {locationInfo && (
            <div className="mt-4 p-3 bg-gray-50 border-l-4 border-red-500 rounded-r-md animate-fade-in">
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-red-600 font-medium">{locationInfo}</p>
              </div>
              <p className="text-gray-500 text-xs mt-1 ml-7">Continuing in 2 seconds...</p>
            </div>
          )}
        </div>

        {!showContinueButton ? (
          <Button
            type="submit"
            className="w-full h-12 text-lg bg-primary-600 hover:bg-primary-700 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-600 rounded-full animate-spin"></div>
                <span>Checking...</span>
              </div>
            ) : (
              "Check Availability"
            )}
          </Button>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-500" data-question="continue-button">
            <Button
              type="button"
              onClick={handleContinue}
              className="w-full h-12 text-lg bg-primary-600 hover:bg-primary-700 transition-all duration-200"
            >
              Continue
            </Button>
          </div>
        )}
      </form>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">We serve 10+ major cities across the United States</p>
      </div>
    </div>
  )
}

export default ZipCodeStep
