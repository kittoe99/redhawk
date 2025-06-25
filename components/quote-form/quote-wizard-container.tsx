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
    <div ref={formRef} className="min-h-screen bg-white">
      {/* Progress indicator */}
      {currentStep !== "zip_code" && (
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <span className="text-primary-600 font-medium">Step {currentStepIndex + 1} of {totalSteps}</span>
              <span>•</span>
              <span>Moving Quote</span>
              <span>•</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl bg-white">
        {renderStep()}
      </div>
    </div>
  )
}

export default QuoteWizardContainer
