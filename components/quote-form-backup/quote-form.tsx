"use client"

import { useState, useEffect } from "react"
import { ZipCodeStep } from "./zip-code-step"
import { ServiceTypeStep } from "./service-type-step"
import { PropertyDetailsStep } from "./property-details-step"
import { DateSelectionStep } from "./date-selection-step"
import { QuoteSummaryStep } from "./quote-summary-step"
import { HawkIcon } from "./hawk-icon"
import { useLoader } from "@/contexts/loader-context"
import { motion, AnimatePresence } from "framer-motion"
import { DestinationAddressStep } from "./destination-address-step"

// Define the form data structure
export interface QuoteFormData {
  zipCode: string
  serviceType: "movers-truck" | "labor-only" | ""
  numberOfMovers: 2 | 3 | null
  needsOneHelper: boolean
  numberOfBedrooms: "1" | "2" | "3" | "4" | "5+" | ""
  hasStairs: boolean
  movingDate: string
  timePreference: string
  destinationAddress: string
  destinationCity: string
  destinationState: string
  destinationZip: string
  estimatedHours: number
  totalCost: number
}

// Initial form state
const initialFormData: QuoteFormData = {
  zipCode: "",
  serviceType: "",
  numberOfMovers: null,
  needsOneHelper: false,
  numberOfBedrooms: "",
  hasStairs: false,
  movingDate: "",
  timePreference: "",
  destinationAddress: "",
  destinationCity: "",
  destinationState: "",
  destinationZip: "",
  estimatedHours: 0,
  totalCost: 0,
}

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData)
  const { showLoader, hideLoader } = useLoader()
  const [direction, setDirection] = useState(0) // -1 for backward, 1 for forward
  const [progress, setProgress] = useState(0)

  // Update progress percentage
  useEffect(() => {
    setProgress(((currentStep - 1) / 5) * 100)
  }, [currentStep])

  // Calculate estimated hours based on bedrooms and stairs
  const calculateEstimatedHours = (bedrooms: string, hasStairs: boolean) => {
    const bedroomHours: Record<string, number> = {
      "1": 3,
      "2": 4,
      "3": 5,
      "4": 6,
      "5+": 8,
    }

    const baseHours = bedroomHours[bedrooms] || 0
    const stairsAddition = hasStairs ? 1 : 0

    return baseHours + stairsAddition
  }

  // Calculate total cost based on service type, movers, and hours
  const calculateTotalCost = (
    serviceType: "movers-truck" | "labor-only" | "",
    numberOfMovers: 2 | 3 | null,
    needsOneHelper: boolean,
    estimatedHours: number,
  ) => {
    if (!serviceType || !numberOfMovers || estimatedHours === 0) return 0

    let hourlyRate = 0

    if (serviceType === "movers-truck") {
      // Movers + Truck pricing
      if (numberOfMovers === 2) {
        hourlyRate = needsOneHelper ? 59.5 : 119 // Cargo van
      } else if (numberOfMovers === 3) {
        hourlyRate = needsOneHelper ? 79.5 : 159 // Box truck
      }

      // Truck fee is included in the hourly rate
      return hourlyRate * estimatedHours
    } else if (serviceType === "labor-only") {
      // Labor Only pricing
      hourlyRate = needsOneHelper ? 69 : 119
      return hourlyRate * estimatedHours
    }

    return 0
  }

  // Handle next step
  const handleNextStep = (data: Partial<QuoteFormData>) => {
    // Show loader during transition
    showLoader()
    setDirection(1)

    const updatedData = { ...formData, ...data }

    // If we're moving from step 3 to 4, calculate hours and cost
    if (currentStep === 3) {
      const hours = calculateEstimatedHours(updatedData.numberOfBedrooms!, updatedData.hasStairs)
      const cost = calculateTotalCost(
        updatedData.serviceType as "movers-truck" | "labor-only",
        updatedData.numberOfMovers,
        updatedData.needsOneHelper || false,
        hours,
      )

      updatedData.estimatedHours = hours
      updatedData.totalCost = cost
    }

    setFormData(updatedData)

    // Use setTimeout to create a visual transition
    setTimeout(() => {
      setCurrentStep((prev) => Math.min(prev + 1, 6))
      hideLoader()
    }, 300)
  }

  // Handle previous step
  const handlePrevStep = () => {
    // Show loader during transition
    showLoader()
    setDirection(-1)

    // Use setTimeout to create a visual transition
    setTimeout(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 1))
      hideLoader()
    }, 300)
  }

  // Handle restart
  const handleRestart = () => {
    // Show loader during transition
    showLoader()
    setDirection(-1)

    // Use setTimeout to create a visual transition
    setTimeout(() => {
      setFormData(initialFormData)
      setCurrentStep(1)
      hideLoader()
    }, 300)
  }

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Header with hawk icon and progress bar */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 p-8 text-white relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <svg width="100%" height="100%" className="absolute opacity-10">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>

        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="flex items-center justify-between relative z-10">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <span className="mr-2">Moving Quote</span>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-md">Step {currentStep} of 5</span>
            </h2>
            <p className="text-primary-100 text-sm mt-2">Fast, free estimate in minutes</p>
          </div>
          <div className="bg-white/10 p-3 rounded-full shadow-lg transform transition-transform hover:scale-105 backdrop-blur-sm border border-white/20">
            <HawkIcon width={36} height={36} fill="#ffffff" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 relative h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-white rounded-full"
            initial={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Form steps */}
      <div className="p-8 bg-white">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="min-h-[400px] flex flex-col"
          >
            {currentStep === 1 && <ZipCodeStep zipCode={formData.zipCode} onNext={handleNextStep} />}

            {currentStep === 2 && (
              <ServiceTypeStep
                serviceType={formData.serviceType}
                numberOfMovers={formData.numberOfMovers}
                needsOneHelper={formData.needsOneHelper}
                onNext={handleNextStep}
                onBack={handlePrevStep}
              />
            )}

            {currentStep === 3 && (
              <PropertyDetailsStep
                numberOfBedrooms={formData.numberOfBedrooms}
                hasStairs={formData.hasStairs}
                onNext={handleNextStep}
                onBack={handlePrevStep}
              />
            )}

            {currentStep === 4 && (
              <DateSelectionStep
                movingDate={formData.movingDate}
                timePreference={formData.timePreference}
                onNext={handleNextStep}
                onBack={handlePrevStep}
              />
            )}

            {currentStep === 5 && (
              <DestinationAddressStep
                destinationAddress={formData.destinationAddress}
                destinationCity={formData.destinationCity}
                destinationState={formData.destinationState}
                destinationZip={formData.destinationZip}
                onNext={handleNextStep}
                onBack={handlePrevStep}
              />
            )}

            {currentStep === 6 && (
              <QuoteSummaryStep formData={formData} onBack={handlePrevStep} onRestart={handleRestart} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
