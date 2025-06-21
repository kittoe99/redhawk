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
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      selectedBg: "from-blue-100 to-blue-200",
      selectedBorder: "border-blue-500",
      iconColor: "text-blue-600"
    },
    {
      id: "1_bedroom",
      icon: Home,
      title: "1 Bedroom",
      description: "Up to 850 sq ft",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      selectedBg: "from-green-100 to-green-200",
      selectedBorder: "border-green-500",
      iconColor: "text-green-600"
    },
    {
      id: "2_bedroom",
      icon: Building,
      title: "2 Bedroom",
      description: "Up to 1,200 sq ft",
      bgColor: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      selectedBg: "from-purple-100 to-purple-200",
      selectedBorder: "border-purple-500",
      iconColor: "text-purple-600"
    },
    {
      id: "3plus_bedroom",
      icon: Building,
      title: "3+ Bedroom",
      description: "1,200+ sq ft",
      bgColor: "from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      selectedBg: "from-orange-100 to-orange-200",
      selectedBorder: "border-orange-500",
      iconColor: "text-orange-600"
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
                className={`group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                  isSelected
                    ? `bg-gradient-to-br ${option.selectedBg} ${option.selectedBorder} shadow-lg ring-2 ring-offset-2 ring-primary-500/20`
                    : `bg-gradient-to-br ${option.bgColor} ${option.borderColor} hover:shadow-md`
                }`}
                onClick={() => handlePropertySizeSelect(option.id as any)}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${isSelected ? 'bg-white/50' : 'bg-white/80'} backdrop-blur-sm shadow-sm`}>
                    <IconComponent className={`w-6 h-6 ${option.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">{option.title}</h4>
                    <p className="text-sm text-gray-600 font-medium">{option.description}</p>
                  </div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Yes Option */}
            <div
              className={`group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                formData.hasStairs === true
                  ? "bg-gradient-to-br from-red-50 to-red-100 border-red-300 shadow-lg ring-2 ring-offset-2 ring-red-500/20"
                  : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
              onClick={() => handleStairsToggle(true)}
            >
              {formData.hasStairs === true && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/80 rounded-xl mb-3 shadow-sm">
                  <Move3D className="w-6 h-6 text-red-600" />
                </div>
                <h5 className="font-bold text-gray-900 text-lg mb-1">Yes, there are stairs</h5>
                <p className="text-sm text-gray-600">May require additional time and equipment</p>
              </div>
            </div>

            {/* No Option */}
            <div
              className={`group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                formData.hasStairs === false
                  ? "bg-gradient-to-br from-green-50 to-green-100 border-green-300 shadow-lg ring-2 ring-offset-2 ring-green-500/20"
                  : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
              onClick={() => handleStairsToggle(false)}
            >
              {formData.hasStairs === false && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/80 rounded-xl mb-3 shadow-sm">
                  <Home className="w-6 h-6 text-green-600" />
                </div>
                <h5 className="font-bold text-gray-900 text-lg mb-1">No stairs</h5>
                <p className="text-sm text-gray-600">Ground level or elevator access only</p>
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
