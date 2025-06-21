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
    <div className="space-y-8">
      <div className="space-y-3 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">Select Service Type</h3>
        <p className="text-gray-600 text-sm md:text-base">Choose the type of moving service you need</p>
      </div>

      {/* Service Type Selection - Always visible */}
      <div className="space-y-4 animate-in fade-in duration-500">
        <h4 className="text-lg font-semibold text-gray-900">What type of service do you need?</h4>
        <div className="grid grid-cols-1 gap-4">
          {/* Movers + Truck Option */}
          <div
            className={`p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
              formData.serviceType === "movers_truck"
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-300 hover:border-primary-300 hover:bg-gray-50"
            }`}
            onClick={() => handleServiceTypeSelect("movers_truck")}
          >
            <div className="flex items-start">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 mt-1 ${
                  formData.serviceType === "movers_truck" ? "border-primary-600 bg-primary-600" : "border-gray-400"
                }`}
              >
                {formData.serviceType === "movers_truck" && <div className="w-2 h-2 rounded-full bg-white"></div>}
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-gray-900 text-base md:text-lg">Movers + Truck</h5>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Full-service moving with professional movers and vehicle
                </p>
              </div>
            </div>
          </div>

          {/* Labor Only Option */}
          <div
            className={`p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
              formData.serviceType === "labor_only"
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-300 hover:border-primary-300 hover:bg-gray-50"
            }`}
            onClick={() => handleServiceTypeSelect("labor_only")}
          >
            <div className="flex items-start">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 mt-1 ${
                  formData.serviceType === "labor_only" ? "border-primary-600 bg-primary-600" : "border-gray-400"
                }`}
              >
                {formData.serviceType === "labor_only" && <div className="w-2 h-2 rounded-full bg-white"></div>}
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-gray-900 text-base md:text-lg">Labor Only</h5>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Professional movers only (you provide transportation)
                </p>
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
                  <p className="text-sm text-gray-600 mt-1">Basic option, included at no extra cost</p>
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
