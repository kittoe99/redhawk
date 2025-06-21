"use client"

import { useState } from "react"
import { X, CheckCircle, Clock, MapPin, Users, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HowItWorksPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function HowItWorksPopup({ isOpen, onClose }: HowItWorksPopupProps) {
  if (!isOpen) return null

  const steps = [
    {
      icon: <MapPin className="w-8 h-8 text-white" />,
      title: "1. Tell Us Your Details",
      description: "Enter your moving details, dates, and locations through our simple quote form.",
      color: "from-blue-300 to-blue-400",
      bgColor: "bg-blue-25",
      iconBg: "bg-gradient-to-br from-blue-400 to-blue-500"
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "2. Get Matched",
      description: "We connect you with verified, local moving helpers in your area.",
      color: "from-emerald-300 to-emerald-400",
      bgColor: "bg-emerald-25",
      iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-500"
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "3. Book Your Move",
      description: "Choose your preferred time and confirm your booking with our trusted movers.",
      color: "from-amber-300 to-amber-400",
      bgColor: "bg-amber-25",
      iconBg: "bg-gradient-to-br from-amber-400 to-amber-500"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      title: "4. Move with Confidence",
      description: "Our professional team arrives on time and handles your move with care.",
      color: "from-primary-300 to-primary-400",
      bgColor: "bg-primary-25",
      iconBg: "bg-gradient-to-br from-primary-400 to-primary-500"
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 pt-32 sm:pt-36 md:pt-32">
      {/* Lighter Backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      {/* Enhanced Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Lighter Header */}
        <div className="relative bg-gradient-to-r from-slate-100 via-gray-50 to-slate-100 p-6 rounded-t-2xl border-b border-gray-100">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-2 right-20 w-12 h-12 bg-primary-200/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-2 left-16 w-8 h-8 bg-blue-200/20 rounded-full blur-lg"></div>
          
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">How It Works</h2>
              <p className="text-gray-600 text-sm">Your moving journey, simplified</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-200/60 rounded-full transition-all duration-200 text-gray-600 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="p-6 md:p-8 bg-gradient-to-b from-gray-50/30 to-white">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gray-200`}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative p-6 flex items-start space-x-6">
                  {/* Lighter Icon */}
                  <div className={`flex-shrink-0 p-4 rounded-2xl ${step.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Connecting line for all but last step */}
                {index < steps.length - 1 && (
                  <div className="absolute -bottom-3 left-[4.5rem] w-0.5 h-6 bg-gradient-to-b from-gray-200 to-transparent"></div>
                )}
              </div>
            ))}
          </div>

          {/* Lighter CTA Section */}
          <div className="mt-8 pt-8 border-t border-gray-150">
            <div className="text-center">
              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-6 mb-6 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">4.9/5 Rating</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="text-sm font-medium text-gray-700">1,200+ Happy Customers</div>
              </div>
              
              <p className="text-gray-600 mb-6 text-lg">Ready to get started?</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={onClose} 
                  className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Your Quote Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="px-6 py-4 text-lg font-medium border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-800 transition-all duration-200"
                >
                  Learn More
                </Button>
              </div>
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
