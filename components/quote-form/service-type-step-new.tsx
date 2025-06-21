"use client"

import type React from "react"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const ServiceTypeStep: React.FC = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useQuoteWizard()
  const [showVehicleType, setShowVehicleType] = useState(false)
  const [showHelperCount, setShowHelperCount] = useState(false)
  const [showContinueButton, setShowContinueButton] = useState(false)

  // Show vehicle type question when service type is selected
  useEffect(() => {
    if (formData.serviceType === "movers_truck") {
      setTimeout(() => setShowVehicleType(true), 500)
    } else if (formData.serviceType === "labor_only") {
      setShowVehicleType(false)
      setTimeout(() => setShowHelperCount(true), 500)
    }
  }, [formData.serviceType])

  // Show helper count question when vehicle type is selected (for movers_truck) or immediately (for labor_only)
  useEffect(() => {
    if (formData.serviceType === "movers_truck" && formData.vehicleType) {
      setTimeout(() => setShowHelperCount(true), 500)
    }
  }, [formData.vehicleType, formData.serviceType])

  // Show continue button when helper count is selected
  useEffect(() => {
    if (formData.helperCount && formData.helperCount > 0) {
      setTimeout(() => setShowContinueButton(true), 500)
    }
  }, [formData.helperCount])

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

    if (showVehicleType) scrollToElement('[data-question="vehicle-type"]')
    if (showHelperCount) scrollToElement('[data-question="helper-count"]')
    if (showContinueButton) scrollToElement('[data-question="continue-button"]')
  }, [showVehicleType, showHelperCount, showContinueButton])

  const handleServiceTypeSelect = (type: "movers_truck" | "labor_only") => {
    updateFormData({ serviceType: type })
    // Reset subsequent selections
    updateFormData({ vehicleType: "", helperCount: 0 })
    setShowVehicleType(false)
    setShowHelperCount(false)
    setShowContinueButton(false)
  }

  const handleVehicleTypeSelect = (type: "cargo_van" | "box_truck" | "pickup_truck") => {
    updateFormData({ vehicleType: type })
    setShowHelperCount(false)
    setShowContinueButton(false)
  }

  const handleHelperCountSelect = (count: 1 | 2) => {
    updateFormData({ helperCount: count })
    setShowContinueButton(false)
  }

  const handleContinue = () => {
    goToNextStep()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Enhanced header section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full shadow-lg">
          <svg className="w-10 h-10 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Choose Your Service
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Select the service you need and get started with professional help today
          </p>
        </div>
      </div>

      {/* Enhanced Service Type Selection */}
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="text-center">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">What type of service do you need?</h4>
          <p className="text-gray-600 text-sm">Choose the option that best fits your moving needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Enhanced Movers + Truck Option */}
          <div
            className={`group relative p-6 md:p-8 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
              formData.serviceType === "movers_truck"
                ? "border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 shadow-xl ring-4 ring-primary-100"
                : "border-gray-200 hover:border-primary-300 hover:bg-gray-50 shadow-lg hover:shadow-xl"
            }`}
            onClick={() => handleServiceTypeSelect("movers_truck")}
          >
            {/* Selection indicator */}
            <div className="absolute top-4 right-4">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  formData.serviceType === "movers_truck" 
                    ? "border-primary-600 bg-primary-600 shadow-lg" 
                    : "border-gray-300 group-hover:border-primary-400"
                }`}
              >
                {formData.serviceType === "movers_truck" && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>

            {/* Service icon */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
              formData.serviceType === "movers_truck" 
                ? "bg-primary-600 shadow-lg" 
                : "bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-primary-100 group-hover:to-primary-200"
            }`}>
              <svg className={`w-8 h-8 ${formData.serviceType === "movers_truck" ? "text-white" : "text-blue-600 group-hover:text-primary-600"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z" />
              </svg>
            </div>

            <div>
              <h5 className="font-bold text-xl text-gray-900 mb-3">Movers + Truck</h5>
              <p className="text-gray-600 leading-relaxed mb-4">
                Full-service moving with professional movers and vehicle. Perfect for complete relocations.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Most Popular Choice</span>
              </div>
            </div>
          </div>

          {/* Enhanced Labor Only Option */}
          <div
            className={`group relative p-6 md:p-8 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
              formData.serviceType === "labor_only"
                ? "border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 shadow-xl ring-4 ring-primary-100"
                : "border-gray-200 hover:border-primary-300 hover:bg-gray-50 shadow-lg hover:shadow-xl"
            }`}
            onClick={() => handleServiceTypeSelect("labor_only")}
          >
            {/* Selection indicator */}
            <div className="absolute top-4 right-4">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  formData.serviceType === "labor_only" 
                    ? "border-primary-600 bg-primary-600 shadow-lg" 
                    : "border-gray-300 group-hover:border-primary-400"
                }`}
              >
                {formData.serviceType === "labor_only" && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>

            {/* Service icon */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
              formData.serviceType === "labor_only" 
                ? "bg-primary-600 shadow-lg" 
                : "bg-gradient-to-br from-purple-100 to-purple-200 group-hover:from-primary-100 group-hover:to-primary-200"
            }`}>
              <svg className={`w-8 h-8 ${formData.serviceType === "labor_only" ? "text-white" : "text-purple-600 group-hover:text-primary-600"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div>
              <h5 className="font-bold text-xl text-gray-900 mb-3">Labor Only</h5>
              <p className="text-gray-600 leading-relaxed mb-4">
                Professional movers only - you provide transportation. Great for budget-conscious moves.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                <span>Cost Effective</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Type Selection - Show only if Movers + Truck is selected */}
      {showVehicleType && formData.serviceType === "movers_truck" && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500" data-question="vehicle-type">
          <h4 className="text-lg font-semibold text-gray-900">Select Vehicle Type</h4>
          <div className="grid grid-cols-1 gap-4">
            {/* Pickup Truck Option */}
            <div
              className={`p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.vehicleType === "pickup_truck"
                  ? "border-primary-600 bg-primary-50 shadow-md"
                  : "border-gray-300 hover:border-primary-300 hover:bg-gray-50"
              }`}
              onClick={() => handleVehicleTypeSelect("pickup_truck")}
            >
              <div className="flex items-start">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 mt-1 ${
                    formData.vehicleType === "pickup_truck" ? "border-primary-600 bg-primary-600" : "border-gray-400"
                  }`}
                >
                  {formData.vehicleType === "pickup_truck" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">Pickup Truck</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Basic option, included at no extra cost
                  </p>
                </div>
              </div>
            </div>

            {/* Cargo Van Option */}
            <div
              className={`p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.vehicleType === "cargo_van"
                  ? "border-primary-600 bg-primary-50 shadow-md"
                  : "border-gray-300 hover:border-primary-300 hover:bg-gray-50"
              }`}
              onClick={() => handleVehicleTypeSelect("cargo_van")}
            >
              <div className="flex items-start">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 mt-1 ${
                    formData.vehicleType === "cargo_van" ? "border-primary-600 bg-primary-600" : "border-gray-400"
                  }`}
                >
                  {formData.vehicleType === "cargo_van" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">Cargo Van (10-12 ft)</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Best for studio/1BR, <span className="text-red-600 font-medium">+$69 fee</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Box Truck Option */}
            <div
              className={`p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.vehicleType === "box_truck"
                  ? "border-primary-600 bg-primary-50 shadow-md"
                  : "border-gray-300 hover:border-primary-300 hover:bg-gray-50"
              }`}
              onClick={() => handleVehicleTypeSelect("box_truck")}
            >
              <div className="flex items-start">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 mt-1 ${
                    formData.vehicleType === "box_truck" ? "border-primary-600 bg-primary-600" : "border-gray-400"
                  }`}
                >
                  {formData.vehicleType === "box_truck" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">Box Truck (15-17 ft)</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Ideal for 2-3BR homes, <span className="text-red-600 font-medium">+$149 fee</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Helper Count Selection - Show after service type (and vehicle type if applicable) */}
      {showHelperCount && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500" data-question="helper-count">
          <h4 className="text-lg font-semibold text-gray-900">How many helpers do you need?</h4>
          <div className="grid grid-cols-1 gap-4">
            {/* 1 Helper Option */}
            <div
              className={`p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.helperCount === 1
                  ? "border-primary-600 bg-primary-50 shadow-md"
                  : "border-gray-300 hover:border-primary-300 hover:bg-gray-50"
              }`}
              onClick={() => handleHelperCountSelect(1)}
            >
              <div className="flex items-start">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 mt-1 ${
                    formData.helperCount === 1 ? "border-primary-600 bg-primary-600" : "border-gray-400"
                  }`}
                >
                  {formData.helperCount === 1 && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">1 Helper + You</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    If your move needs 2 people to lift and carry, you can save money by helping!
                  </p>
                </div>
              </div>
            </div>

            {/* 2 Helpers Option */}
            <div
              className={`p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.helperCount === 2
                  ? "border-primary-600 bg-primary-50 shadow-md"
                  : "border-gray-300 hover:border-primary-300 hover:bg-gray-50"
              }`}
              onClick={() => handleHelperCountSelect(2)}
            >
              <div className="flex items-start">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 mt-1 ${
                    formData.helperCount === 2 ? "border-primary-600 bg-primary-600" : "border-gray-400"
                  }`}
                >
                  {formData.helperCount === 2 && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">2 Helpers</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Two helpers with a vehicle will arrive to get your move done quick and easy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons - Show only when all questions are answered */}
      {showContinueButton && (
        <div
          className="flex flex-col md:flex-row justify-between gap-4 pt-6 animate-in slide-in-from-bottom-4 duration-500"
          data-question="continue-button"
        >
          <Button
            onClick={goToPreviousStep}
            variant="outline"
            className="w-full md:w-auto px-8 py-3 text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  )
}

export default ServiceTypeStep
