"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, StepBackIcon as Stairs } from "lucide-react"
import type { QuoteFormData } from "./quote-form"

interface PropertyDetailsStepProps {
  numberOfBedrooms: string
  hasStairs: boolean
  onNext: (data: Partial<QuoteFormData>) => void
  onBack: () => void
}

export function PropertyDetailsStep({ numberOfBedrooms, hasStairs, onNext, onBack }: PropertyDetailsStepProps) {
  const [selectedBedrooms, setSelectedBedrooms] = useState(numberOfBedrooms)
  const [stairsRequired, setStairsRequired] = useState(hasStairs)
  const [error, setError] = useState("")

  const bedroomOptions = ["1", "2", "3", "4", "5+"] as const

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedBedrooms) {
      setError("Please select the number of bedrooms")
      return
    }

    onNext({
      numberOfBedrooms: selectedBedrooms as "1" | "2" | "3" | "4" | "5+",
      hasStairs: stairsRequired,
    })
  }

  const handleNext = () => {
    if (!selectedBedrooms) {
      setError("Please select the number of bedrooms")
      return
    }

    onNext({
      numberOfBedrooms: selectedBedrooms as "1" | "2" | "3" | "4" | "5+",
      hasStairs: stairsRequired,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto w-full">
      <div className="space-y-2 text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-50 mb-3 mx-auto">
          <Home className="h-6 w-6 text-primary-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Property Details</h3>
        <p className="text-gray-600">Tell us about your property to get an accurate estimate</p>
      </div>

      {/* Number of Bedrooms Selection */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Home className="h-5 w-5 text-primary-600 mr-2" />
          <label className="text-sm font-medium text-gray-700">Number of Bedrooms</label>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {bedroomOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`py-3 border-2 rounded-lg text-center transition-all duration-200 ${
                selectedBedrooms === option
                  ? "border-primary-600 bg-primary-50 text-primary-700 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
              onClick={() => {
                setSelectedBedrooms(option)
                setError("")
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Stairs Selection */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center">
          <Stairs className="h-5 w-5 text-primary-600 mr-2" />
          <label className="text-sm font-medium text-gray-700">Do stairs apply?</label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className={`py-3 border-2 rounded-lg text-center transition-all duration-200 ${
              stairsRequired === true
                ? "border-primary-600 bg-primary-50 text-primary-700 shadow-sm"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
            }`}
            onClick={() => setStairsRequired(true)}
          >
            <span className="text-base">Yes</span>
          </button>
          <button
            type="button"
            className={`py-4 px-4 border-2 rounded-lg text-center transition-all duration-200 ${
              stairsRequired === false
                ? "border-primary-600 bg-primary-50 text-primary-700 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
            }`}
            onClick={() => setStairsRequired(false)}
          >
            <span className="text-lg">No</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 italic">
          Select "Yes" if your move involves stairs (adds approximately 1 hour to the estimate)
        </p>
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
          type="button"
          onClick={handleNext}
          disabled={!selectedBedrooms}
          className="w-full bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          Continue
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            className="ml-2"
          >
            <path
              d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
            L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
            c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
            c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
            />
          </svg>
        </Button>
      </div>
    </form>
  )
}
