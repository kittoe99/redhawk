"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Home, Building, ChevronRight } from "lucide-react"
import type { QuoteFormData } from "./quote-form"

interface DestinationAddressStepProps {
  destinationAddress: string
  destinationCity: string
  destinationState: string
  destinationZip: string
  onNext: (data: Partial<QuoteFormData>) => void
  onBack: () => void
}

export function DestinationAddressStep({
  destinationAddress,
  destinationCity,
  destinationState,
  destinationZip,
  onNext,
  onBack,
}: DestinationAddressStepProps) {
  const [address, setAddress] = useState(destinationAddress)
  const [city, setCity] = useState(destinationCity)
  const [state, setState] = useState(destinationState)
  const [zip, setZip] = useState(destinationZip)
  const [error, setError] = useState("")
  const [isValid, setIsValid] = useState(false)

  // Validate form on mount and when fields change
  useEffect(() => {
    validateForm()
  }, [address, city, state, zip])

  const validateForm = () => {
    // All fields are required for a valid destination address
    if (address.trim() && city.trim() && state.trim() && zip.trim()) {
      setIsValid(true)
      setError("")
    } else {
      setIsValid(false)
      // Don't show error initially, only after submission attempt
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!address.trim() || !city.trim() || !state.trim() || !zip.trim()) {
      setError("Please complete all destination address fields")
      return
    }

    onNext({
      destinationAddress: address,
      destinationCity: city,
      destinationState: state,
      destinationZip: zip,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-900">Destination Address</h3>
        <p className="text-sm text-gray-600">Where are we moving your items to?</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-primary-600 mr-2" />
          <label className="text-sm font-medium text-gray-700">Destination Details</label>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="destinationAddress" className="flex items-center text-sm font-medium text-gray-700">
              <Home className="h-4 w-4 mr-2 text-primary-600" />
              Street Address
            </label>
            <div className="relative w-full">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                <Home className="h-5 w-5" />
              </div>
              <Input
                id="destinationAddress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-10 text-gray-900"
                placeholder="123 Main St"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 md:col-span-1">
              <label htmlFor="destinationCity" className="flex items-center text-sm font-medium text-gray-700">
                <Building className="h-4 w-4 mr-2 text-primary-600" />
                City
              </label>
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <Building className="h-5 w-5" />
                </div>
                <Input
                  id="destinationCity"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-10 text-gray-900"
                  placeholder="Phoenix"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="destinationState" className="text-sm font-medium text-gray-700">
                State
              </label>
              <Input
                id="destinationState"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full text-gray-900"
                placeholder="AZ"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="destinationZip" className="text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <Input
                id="destinationZip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full text-gray-900"
                placeholder="85001"
              />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 py-6 text-base border-2 hover:bg-gray-50 transition-all duration-200"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          Continue
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </form>
  )
}
