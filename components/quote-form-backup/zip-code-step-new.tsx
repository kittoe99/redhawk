"use client"

import type React from "react"
import { useState } from "react"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ZipCodeStep: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useQuoteWizard()
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const lookupZipCode = async (zip: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://api.zippopotam.us/us/${zip}`)
      if (!response.ok) throw new Error("Invalid ZIP code")
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
    
    if (!/^\d{5}$/.test(formData.zipCode || "")) {
      setError("Please enter a valid 5-digit ZIP code")
      return
    }

    setError("")
    const location = await lookupZipCode(formData.zipCode)

    if (!location) {
      setError("Could not find location for this ZIP code")
      return
    }

    // Proceed to next step if ZIP is valid
    goToNextStep()
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-medium text-gray-900 mb-2">
          Where are you moving from?
        </h2>
        <p className="text-gray-600">Enter your ZIP code to get started</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="relative">
            <Input
              id="zipCode"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={5}
              value={formData.zipCode || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 5)
                updateFormData({ zipCode: value })
                setError("")
              }}
              className={`block w-full px-4 py-3 text-base border ${
                error ? "border-red-300" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500`}
              placeholder="Enter ZIP code"
              aria-invalid={!!error}
              aria-describedby={error ? "zipCode-error" : undefined}
              autoComplete="postal-code"
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          {error && (
            <p className="text-sm text-red-600 mt-1" id="zipCode-error">
              {error}
            </p>
          )}
        </div>

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
