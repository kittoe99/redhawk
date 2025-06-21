"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"

const PropertyDetailsStep: React.FC = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useQuoteWizard()
  const [error, setError] = useState("")
  const [showStairsQuestion, setShowStairsQuestion] = useState(false)
  const [showContinueButton, setShowContinueButton] = useState(false)

  // Show stairs question when property size is selected
  useEffect(() => {
    if (formData.propertySize) {
      setTimeout(() => setShowStairsQuestion(true), 500)
    } else {
      setShowStairsQuestion(false)
      setShowContinueButton(false)
    }
  }, [formData.propertySize])

  // Show continue button when stairs question is answered
  useEffect(() => {
    if (formData.hasStairs !== undefined && formData.propertySize) {
      setTimeout(() => setShowContinueButton(true), 500)
    } else {
      setShowContinueButton(false)
    }
  }, [formData.hasStairs, formData.propertySize])

  // Auto scroll to new questions
  useEffect(() => {
    const scrollToElement = (selector: string) => {
      setTimeout(() => {
        const element = document.querySelector(selector)
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
      }, 100)
    }

    if (showStairsQuestion) scrollToElement('[data-question="stairs"]')
    if (showContinueButton) scrollToElement('[data-question="continue-button"]')
  }, [showStairsQuestion, showContinueButton])

  const handlePropertySizeSelect = (size: "studio" | "1_bedroom" | "2_bedroom" | "3plus_bedroom") => {
    updateFormData({ propertySize: size })
    updateFormData({ hasStairs: undefined }) // Reset stairs selection
    setError("")
    setShowStairsQuestion(false)
    setShowContinueButton(false)
  }

  const handleStairsToggle = (hasStairs: boolean) => {
    updateFormData({ hasStairs })
    setShowContinueButton(false)
  }

  const handleContinue = () => {
    if (!formData.propertySize) {
      setError("Please select your property size")
      return
    }

    if (formData.hasStairs === undefined) {
      setError("Please answer the stairs question")
      return
    }

    goToNextStep()
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900">How big is your place?</h3>
        <p className="text-gray-600">Help us estimate the time and resources needed for your move</p>
      </div>

      {/* Property Size Selection - Always visible */}
      <div className="space-y-4 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 gap-4">
          {/* Studio Option */}
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              formData.propertySize === "studio"
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handlePropertySizeSelect("studio")}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                  formData.propertySize === "studio" ? "border-primary-600 bg-primary-600" : "border-gray-400"
                }`}
              >
                {formData.propertySize === "studio" && <div className="w-2 h-2 rounded-full bg-white"></div>}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Studio</h4>
                <p className="text-sm text-gray-600">up to 650 sq ft</p>
              </div>
            </div>
          </div>

          {/* 1 Bedroom Option */}
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              formData.propertySize === "1_bedroom"
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handlePropertySizeSelect("1_bedroom")}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                  formData.propertySize === "1_bedroom" ? "border-primary-600 bg-primary-600" : "border-gray-400"
                }`}
              >
                {formData.propertySize === "1_bedroom" && <div className="w-2 h-2 rounded-full bg-white"></div>}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">1 Bedroom</h4>
                <p className="text-sm text-gray-600">up to 850 sq ft</p>
              </div>
            </div>
          </div>

          {/* 2 Bedroom Option */}
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              formData.propertySize === "2_bedroom"
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handlePropertySizeSelect("2_bedroom")}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                  formData.propertySize === "2_bedroom" ? "border-primary-600 bg-primary-600" : "border-gray-400"
                }`}
              >
                {formData.propertySize === "2_bedroom" && <div className="w-2 h-2 rounded-full bg-white"></div>}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">2 Bedroom</h4>
                <p className="text-sm text-gray-600">up to 1300 sq ft</p>
              </div>
            </div>
          </div>

          {/* 3+ Bedroom Option */}
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              formData.propertySize === "3plus_bedroom"
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handlePropertySizeSelect("3plus_bedroom")}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                  formData.propertySize === "3plus_bedroom" ? "border-primary-600 bg-primary-600" : "border-gray-400"
                }`}
              >
                {formData.propertySize === "3plus_bedroom" && <div className="w-2 h-2 rounded-full bg-white"></div>}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">3+ bedroom or house</h4>
                <p className="text-sm text-gray-600">Pay per item</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stairs Question - Show after property size is selected */}
      {showStairsQuestion && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500" data-question="stairs">
          <h3 className="text-lg font-semibold text-gray-900">Does your move involve stairs?</h3>
          <p className="text-sm text-gray-600">Having stairs adds approximately 1 hour to the estimated moving time.</p>
          <div className="grid grid-cols-2 gap-4">
            {/* Yes Option */}
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                formData.hasStairs === true
                  ? "border-primary-600 bg-primary-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleStairsToggle(true)}
            >
              <div className="flex items-center justify-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 ${
                    formData.hasStairs === true ? "border-primary-600 bg-primary-600" : "border-gray-400"
                  }`}
                >
                  {formData.hasStairs === true && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span className="font-medium text-gray-900">Yes</span>
              </div>
            </div>

            {/* No Option */}
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                formData.hasStairs === false
                  ? "border-primary-600 bg-primary-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleStairsToggle(false)}
            >
              <div className="flex items-center justify-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 ${
                    formData.hasStairs === false ? "border-primary-600 bg-primary-600" : "border-gray-400"
                  }`}
                >
                  {formData.hasStairs === false && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span className="font-medium text-gray-900">No</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Info - Show with stairs question */}
      {showStairsQuestion && (
        <div className="text-sm text-gray-600 space-y-2 animate-in fade-in duration-500 delay-300">
          <p>Exercise equipment, appliances, and moves further than 20 miles will add additional fees.</p>
          <p>
            Helpers are unable to move these items: pianos, organs, gun safes, jukeboxes, kegs, alcohol, and pool
            tables.
          </p>
        </div>
      )}

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

      {/* Navigation Buttons - Show when both questions are answered */}
      {showContinueButton && (
        <div className="flex space-x-4 animate-in slide-in-from-bottom-4 duration-500" data-question="continue-button">
          <Button
            type="button"
            variant="outline"
            onClick={goToPreviousStep}
            className="flex-1 py-6 text-base border-2 hover:bg-gray-50 transition-all duration-200"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={handleContinue}
            className="flex-1 bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  )
}

export default PropertyDetailsStep
