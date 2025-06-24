"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"
import { Home, Building, Check, AlertCircle, Move3D } from "lucide-react"

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

  const propertyOptions = [
    {
      id: "studio",
      icon: Home,
      title: "Studio",
      description: "Up to 650 sq ft",
      color: "blue"
    },
    {
      id: "1_bedroom",
      icon: Home,
      title: "1 Bedroom",
      description: "Up to 850 sq ft",
      color: "green"
    },
    {
      id: "2_bedroom",
      icon: Building,
      title: "2 Bedroom",
      description: "Up to 1,200 sq ft",
      color: "purple"
    },
    {
      id: "3plus_bedroom",
      icon: Building,
      title: "3+ Bedroom",
      description: "1,200+ sq ft",
      color: "orange"
    }
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Enhanced Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-4 shadow-lg">
          <Home className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
          How big is your place?
        </h3>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Help us estimate the time and resources needed for your move
        </p>
      </div>

      {/* Property Size Selection */}
      <div className="space-y-4 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {propertyOptions.map((option) => {
            const IconComponent = option.icon
            const isSelected = formData.propertySize === option.id
            
            return (
              <div
                key={option.id}
                className={`group relative p-4 border rounded-lg cursor-pointer transition-colors ${
                  isSelected 
                    ? `border-${option.color}-500 bg-${option.color}-50` 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handlePropertySizeSelect(option.id as any)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? `bg-${option.color}-100` : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      isSelected ? `text-${option.color}-600` : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className={`font-medium ${
                      isSelected ? 'text-gray-900' : 'text-gray-800'
                    }`}>{option.title}</h4>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                  {isSelected && (
                    <Check className="ml-auto w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stairs Question */}
      {showStairsQuestion && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500" data-question="stairs">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mb-3 shadow-md">
              <Move3D className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Are there stairs involved?
            </h4>
            <p className="text-gray-600">This affects pricing and the equipment we'll bring</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Yes Option */}
            <div
              className={`group p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.hasStairs === true
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleStairsToggle(true)}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  formData.hasStairs === true ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <Move3D className={`w-5 h-5 ${
                    formData.hasStairs === true ? 'text-red-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h5 className={`font-medium ${
                    formData.hasStairs === true ? 'text-gray-900' : 'text-gray-800'
                  }`}>Yes, there are stairs</h5>
                  <p className="text-sm text-gray-500">May require additional time and equipment</p>
                </div>
                {formData.hasStairs === true && (
                  <Check className="w-5 h-5 text-green-500" />
                )}
              </div>
            </div>

            {/* No Option */}
            <div
              className={`group p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.hasStairs === false
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleStairsToggle(false)}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  formData.hasStairs === false ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Home className={`w-5 h-5 ${
                    formData.hasStairs === false ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h5 className={`font-medium ${
                    formData.hasStairs === false ? 'text-gray-900' : 'text-gray-800'
                  }`}>No stairs</h5>
                  <p className="text-sm text-gray-500">Ground level or elevator access only</p>
                </div>
                {formData.hasStairs === false && (
                  <Check className="w-5 h-5 text-green-500" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl animate-in fade-in duration-300">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Continue Button */}
      {showContinueButton && (
        <div className="animate-in slide-in-from-bottom-4 duration-500" data-question="continue-button">
          <Button
            onClick={handleContinue}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-2">
              <Check className="w-5 h-5" />
              <span>Continue to Next Step</span>
            </div>
          </Button>
        </div>
      )}
    </div>
  )
}

export default PropertyDetailsStep
