"use client"

import type React from "react"
import { useState } from "react"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"
import { Button } from "@/components/ui/button"
import { MapPin, Shield, CheckCircle, ArrowRight } from "lucide-react"

const ZipCodeStep: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useQuoteWizard()
  const [zipCode, setZipCode] = useState(formData.zipCode || "")
  const [isValidZip, setIsValidZip] = useState(false)

  const validateZipCode = (zip: string) => {
    const zipRegex = /^\d{5}(-\d{4})?$/
    return zipRegex.test(zip)
  }

  const handleZipCodeChange = (value: string) => {
    setZipCode(value)
    const isValid = validateZipCode(value)
    setIsValidZip(isValid)
    if (isValid) {
      updateFormData({ zipCode: value })
    }
  }

  const handleSubmit = () => {
    if (isValidZip) {
      updateFormData({ zipCode })
      goToNextStep()
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg p-6 shadow-sm">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-3 shadow-md">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Enter ZIP Code
        </h2>
        <p className="text-gray-500 text-sm">
          Check moving service availability in your area
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-gray-600">
        <div className="flex items-center">
          <Shield className="w-4 h-4 text-green-500 mr-1.5" />
          <span>Free Quote</span>
        </div>
        <div className="flex items-center">
          <CheckCircle className="w-4 h-4 text-blue-500 mr-1.5" />
          <span>Secure</span>
        </div>
      </div>

      {/* ZIP Code Input */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={zipCode}
            onChange={(e) => handleZipCodeChange(e.target.value)}
            placeholder="Enter your ZIP code"
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 text-center font-medium text-gray-900 placeholder-gray-500"
            maxLength={10}
          />
          {zipCode && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isValidZip ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 border-2 border-red-300 rounded-full"></div>
              )}
            </div>
          )}
        </div>
        {zipCode && !isValidZip && (
          <p className="text-red-500 text-sm mt-2 text-center">Please enter a valid ZIP code</p>
        )}
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleSubmit}
        disabled={!isValidZip}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Quote
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  )
}

export default ZipCodeStep
