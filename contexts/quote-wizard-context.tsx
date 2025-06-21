"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export interface QuoteFormData {
  // Basic info
  zipCode: string

  // Service details
  serviceType: "movers_truck" | "labor_only" | ""
  vehicleType: "cargo_van" | "box_truck" | "pickup_truck" | ""
  helperCount: 1 | 2 | 0

  // Property details
  propertySize: "studio" | "1_bedroom" | "2_bedroom" | "3plus_bedroom" | ""
  hasStairs: boolean | null

  // Date and time
  moveDate: string
  timePreference: "morning" | "afternoon" | ""
  timeStart: string
  timeEnd: string

  // Destination
  destinationAddress: string
  destinationCity: string
  destinationState: string
  destinationZip: string

  // Extras
  hasAppliances: boolean | null
  damageProtection: "1000" | "2500" | "5000" | "10000" | ""

  // Pricing
  baseRate: number
  vehicleFee: number
  estimatedHours: number
  totalCost: number
}

export type QuoteStep =
  | "zip_code"
  | "service_type"
  | "property_details"
  | "date_time"
  | "destination"
  | "extras"
  | "photos"
  | "summary"
  | "booking"

interface QuoteWizardContextType {
  formData: QuoteFormData
  currentStep: QuoteStep
  updateFormData: (data: Partial<QuoteFormData>) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  goToStep: (step: QuoteStep) => void
  calculatePrice: () => void
}

const initialFormData: QuoteFormData = {
  zipCode: "",
  serviceType: "",
  vehicleType: "",
  helperCount: 0,
  propertySize: "",
  hasStairs: null,
  moveDate: "",
  timePreference: "",
  timeStart: "",
  timeEnd: "",
  destinationAddress: "",
  destinationCity: "",
  destinationState: "",
  destinationZip: "",
  hasAppliances: null,
  damageProtection: "1000",
  baseRate: 0,
  vehicleFee: 0,
  estimatedHours: 0,
  totalCost: 0,
}

const stepOrder: QuoteStep[] = [
  "zip_code",
  "service_type",
  "property_details",
  "date_time",
  "destination",
  "extras",
  "photos",
  "summary",
  "booking",
]

const QuoteWizardContext = createContext<QuoteWizardContextType | undefined>(undefined)

export function QuoteWizardProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState<QuoteStep>("zip_code")

  const updateFormData = useCallback((data: Partial<QuoteFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }, [])

  const goToNextStep = useCallback(() => {
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }, [currentStep])

  const goToPreviousStep = useCallback(() => {
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }, [currentStep])

  const goToStep = useCallback((step: QuoteStep) => {
    setCurrentStep(step)
  }, [])

  const calculatePrice = useCallback(() => {
    let baseRate = 0
    let vehicleFee = 0
    let estimatedHours = 0

    // Calculate base rate based on service type and helper count
    if (formData.serviceType === "movers_truck") {
      if (formData.helperCount === 1) {
        baseRate = 59.5 // 1 helper + truck
      } else if (formData.helperCount === 2) {
        baseRate = 119 // 2 helpers + truck
      }
    } else if (formData.serviceType === "labor_only") {
      if (formData.helperCount === 1) {
        baseRate = 69 // 1 helper only
      } else if (formData.helperCount === 2) {
        baseRate = 119 // 2 helpers only
      }
    }

    // Calculate vehicle fee
    if (formData.vehicleType === "cargo_van") {
      vehicleFee = 69
    } else if (formData.vehicleType === "box_truck") {
      vehicleFee = 149
    }

    // Calculate estimated hours based on property size
    const propertyHours: Record<string, number> = {
      studio: 2,
      "1_bedroom": 3,
      "2_bedroom": 4,
      "3plus_bedroom": 6,
    }

    estimatedHours = propertyHours[formData.propertySize] || 0

    // Add time for stairs
    if (formData.hasStairs) {
      estimatedHours += 1
    }

    // Calculate total cost
    const totalCost = baseRate * estimatedHours + vehicleFee

    updateFormData({
      baseRate,
      vehicleFee,
      estimatedHours,
      totalCost,
    })
  }, [formData, updateFormData])

  const value: QuoteWizardContextType = {
    formData,
    currentStep,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    calculatePrice,
  }

  return <QuoteWizardContext.Provider value={value}>{children}</QuoteWizardContext.Provider>
}

export function useQuoteWizard() {
  const context = useContext(QuoteWizardContext)
  if (context === undefined) {
    throw new Error("useQuoteWizard must be used within a QuoteWizardProvider")
  }
  return context
}

// Legacy hook for backward compatibility
export function useForm() {
  return useQuoteWizard()
}
