"use client"

import { useState } from "react"
import { X, CheckCircle, Clock, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HowItWorksPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function HowItWorksPopup({ isOpen, onClose }: HowItWorksPopupProps) {
  if (!isOpen) return null

  const steps = [
    {
      icon: <MapPin className="w-5 h-5 text-primary-600" />,
      title: "1. Tell Us Your Details",
      description: "Enter your moving details, dates, and locations through our simple quote form.",
      iconBg: "bg-blue-50 text-primary-600"
    },
    {
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      title: "2. Get Matched",
      description: "We connect you with verified, local moving helpers in your area.",
      iconBg: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      title: "3. Book Your Move",
      description: "Choose your preferred time and confirm your booking with our trusted movers.",
      iconBg: "bg-amber-50 text-amber-600"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "4. Move with Confidence",
      description: "Our professional team arrives on time and handles your move with care.",
      iconBg: "bg-green-50 text-green-600"
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Simplified Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Simplified Modal */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-5 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">How It Works</h2>
            <button 
              onClick={onClose} 
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="relative pl-4">
                <div className="flex items-start">
                  {/* Step indicator */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step.iconBg} mb-2`}>
                      {step.icon}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 my-1"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="ml-4 pb-6">
                    <h3 className="text-base font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Ready to get started?</p>
              <Button 
                onClick={onClose} 
                className="w-full justify-center py-3 text-base font-medium"
              >
                Get Your Quote Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook to use the popup
export function useHowItWorksPopup() {
  const [isOpen, setIsOpen] = useState(false)

  const openPopup = () => setIsOpen(true)
  const closePopup = () => setIsOpen(false)

  return {
    isOpen,
    openPopup,
    closePopup,
    HowItWorksPopup: (props: Omit<HowItWorksPopupProps, "isOpen" | "onClose">) => (
      <HowItWorksPopup {...props} isOpen={isOpen} onClose={closePopup} />
    ),
  }
}
