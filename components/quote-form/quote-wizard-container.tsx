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
    <div ref={formRef} className="w-full max-w-3xl mx-auto bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden">
      {/* Header with hawk icon and progress bar */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 p-3 md:p-6 text-white relative overflow-hidden">
        {/* Animated background patterns */}
        <div
          className="absolute inset-0 overflow-hidden opacity-10"
          style={{
            backgroundImage: "url(/backgrounds/cartoon-movers-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="absolute top-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-16 md:w-24 h-16 md:h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-lg md:text-2xl font-bold flex flex-col md:flex-row md:items-center text-white">
              <span className="text-white">Moving Quote</span>
              <span className="text-xs md:text-sm bg-white/20 px-2 py-0.5 md:py-1 rounded-md mt-1 md:mt-0 md:ml-2 text-white w-fit">
                Step {currentStepIndex + 1} of {totalSteps}
              </span>
            </h1>
            <p className="text-primary-100 text-xs md:text-sm mt-1 md:mt-2">Fast, free estimate in minutes</p>
          </div>
          <div className="bg-white/10 p-1.5 md:p-3 rounded-full shadow-lg transform transition-transform hover:scale-105 backdrop-blur-sm border border-white/20">
            <HawkIcon width={20} height={20} fill="#ffffff" className="md:w-8 md:h-8" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 md:mt-6 relative h-1.5 md:h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Form steps */}
      <div className="p-3 md:p-6 lg:p-8 bg-white">
        <div className="min-h-[400px] md:min-h-[500px] flex flex-col">
          <div className="space-y-8">{renderStep()}</div>
        </div>
      </div>
    </div>
  )
}

export default QuoteWizardContainer
