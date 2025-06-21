"use client"

import type React from "react"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"
import { useEffect, useRef } from "react"
import ZipCodeStep from "./zip-code-step-new"
import ServiceTypeStep from "./service-type-step-new"
import PropertyDetailsStep from "./property-details-step-new"
import DateTimeStep from "./date-time-step-new"
import DestinationStep from "./destination-step-new"
import ExtrasStep from "./extras-step-new"
import PhotosStep from "./photos-step-new"
import SummaryStep from "./summary-step-new"
import { HawkIcon } from "./hawk-icon"
import BookingStep from "./booking-step"

const QuoteWizardContainer: React.FC = () => {
  const { currentStep } = useQuoteWizard()
  const formRef = useRef<HTMLDivElement>(null)

  // Auto scroll to top of form when step changes
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [currentStep])

  // Auto scroll to new questions when they appear
  useEffect(() => {
    const timer = setTimeout(() => {
      // Look for elements with data-question attribute that just appeared
      const newQuestions = document.querySelectorAll("[data-question]")
      if (newQuestions.length > 0) {
        const lastNewQuestion = newQuestions[newQuestions.length - 1]
        if (lastNewQuestion) {
          lastNewQuestion.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          })
        }
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [currentStep])

  // Helper function to convert step to index for progress bar
  const stepToIndex = (step: string): number => {
    const steps = {
      zip_code: 0,
      service_type: 1,
      property_details: 2,
      date_time: 3,
      destination: 4,
      extras: 5,
      photos: 6,
      summary: 7,
      booking: 8,
    }

    return steps[step as keyof typeof steps] || 0
  }

  // Render the appropriate step based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case "zip_code":
        return <ZipCodeStep />
      case "service_type":
        return <ServiceTypeStep />
      case "property_details":
        return <PropertyDetailsStep />
      case "date_time":
        return <DateTimeStep />
      case "destination":
        return <DestinationStep />
      case "extras":
        return <ExtrasStep />
      case "photos":
        return <PhotosStep />
      case "summary":
        return <SummaryStep />
      case "booking":
        return <BookingStep />
      default:
        return <ZipCodeStep />
    }
  }

  const currentStepIndex = stepToIndex(currentStep)
  const totalSteps = 9
  const progressPercentage = (currentStepIndex / (totalSteps - 1)) * 100

  return (
    <div ref={formRef} className="w-full max-w-4xl mx-auto">
      {/* Main form card with enhanced styling */}
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm">
        {/* Enhanced header with better gradients and animations */}
        <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 p-4 md:p-8 text-white relative overflow-hidden">
          {/* Enhanced animated background patterns */}
          <div
            className="absolute inset-0 overflow-hidden opacity-20"
            style={{
              backgroundImage: "url(/backgrounds/cartoon-movers-bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          {/* Floating decoration elements */}
          <div className="absolute top-0 right-0 w-24 md:w-40 h-24 md:h-40 bg-gradient-to-br from-white/10 to-white/5 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-20 md:w-32 h-20 md:h-32 bg-gradient-to-tr from-white/10 to-white/5 rounded-full translate-y-1/2 -translate-x-1/2 animate-pulse delay-75"></div>
          <div className="absolute top-1/2 left-1/4 w-12 md:w-20 h-12 md:h-20 bg-white/5 rounded-full animate-bounce delay-100"></div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/15 p-2 rounded-xl shadow-lg transform transition-transform hover:scale-105 backdrop-blur-sm border border-white/20">
                  <HawkIcon width={24} height={24} fill="#ffffff" className="md:w-8 md:h-8" />
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl font-bold text-white leading-tight">
                    Get Your Moving Quote
                  </h1>
                  <p className="text-primary-100 text-sm md:text-base opacity-90">
                    Professional moving services • Free estimate • No hidden fees
                  </p>
                </div>
              </div>
              
              {/* Step indicator with enhanced design */}
              <div className="flex items-center gap-3 mt-4">
                <div className="bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/30">
                  <span className="text-xs md:text-sm font-semibold text-white">
                    Step {currentStepIndex + 1} of {totalSteps}
                  </span>
                </div>
                <div className="flex-1 text-xs md:text-sm text-primary-100">
                  <span className="opacity-75">Almost there!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced progress bar with better visual feedback */}
          <div className="mt-6 relative">
            <div className="flex justify-between text-xs text-primary-100 mb-2 opacity-75">
              <span>Start</span>
              <span>Complete</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-white via-primary-100 to-white rounded-full transition-all duration-700 ease-out shadow-lg relative"
                style={{ width: `${Math.max(progressPercentage, 8)}%` }}
              >
                <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="mt-2 text-xs text-primary-100 text-center opacity-75">
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>
        </div>

        {/* Enhanced form content area */}
        <div className="p-4 md:p-8 lg:p-10 bg-gradient-to-b from-gray-50/50 to-white">
          <div className="min-h-[450px] md:min-h-[550px] flex flex-col">
            {/* Form step content with better spacing and animations */}
            <div className="flex-1 space-y-8 animate-in fade-in-50 duration-500">
              {renderStep()}
            </div>
            
            {/* Trust indicators */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>100% Free Quote</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>5-Star Rated</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenovenRule" />
                  </svg>
                  <span>Quick Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuoteWizardContainer
