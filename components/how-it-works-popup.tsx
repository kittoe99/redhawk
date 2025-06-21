"use client"

import { useState } from "react"
import { X, CheckCircle, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HowItWorksPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function HowItWorksPopup({ isOpen, onClose }: HowItWorksPopupProps) {
  if (!isOpen) return null

  const steps = [
    {
      icon: <MapPin className="w-8 h-8 text-primary-600" />,
      title: "1. Tell Us Your Details",
      description: "Enter your moving details, dates, and locations through our simple quote form.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "2. Get Matched",
      description: "We connect you with verified, local moving helpers in your area.",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-600" />,
      title: "3. Book Your Move",
      description: "Choose your preferred time and confirm your booking with our trusted movers.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary-600" />,
      title: "4. Move with Confidence",
      description: "Our professional team arrives on time and handles your move with care.",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 pt-32 sm:pt-36 md:pt-32">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">{step.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Ready to get started?</p>
              <Button onClick={onClose} className="px-8 py-3">
                Get Your Quote Now
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
