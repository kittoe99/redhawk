"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Check,
  Clock,
  Truck,
  Users,
  Home,
  StepBackIcon as Stairs,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  ArrowRight,
  Building,
  MessageSquare,
  ChevronLeft,
} from "lucide-react"
import type { QuoteFormData } from "./quote-form"
import { HawkIcon } from "./hawk-icon"

interface QuoteSummaryStepProps {
  formData: QuoteFormData
  onBack: () => void
  onRestart: () => void
}

export function QuoteSummaryStep({ formData, onBack, onRestart }: QuoteSummaryStepProps) {
  const router = useRouter()

  const {
    zipCode,
    serviceType,
    numberOfMovers,
    needsOneHelper,
    numberOfBedrooms,
    hasStairs,
    movingDate,
    timePreference,
    estimatedHours,
    totalCost,
  } = formData

  const [bookingStep, setBookingStep] = useState(1)
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    originAddress: "",
    originCity: "",
    originState: "",
    originZip: "",
    destinationAddress: "",
    destinationCity: "",
    destinationState: "",
    destinationZip: "",
    specialInstructions: "",
  })

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    originAddress: "",
    originCity: "",
    originState: "",
    originZip: "",
    specialInstructions: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [countdown, setCountdown] = useState(3)

  // Effect for countdown and redirect
  useEffect(() => {
    if (isSuccess) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            router.push("/")
            return 0
          }
          return prev - 1
        })
      }, 1000)

      // Clean up timer on unmount
      return () => clearInterval(timer)
    }
  }, [isSuccess, router])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate the effective hourly rate based on service type, movers, and helper choice
  const getHourlyRate = () => {
    if (serviceType === "movers-truck") {
      if (numberOfMovers === 2) {
        return needsOneHelper ? 59.5 : 119 // Cargo van
      } else if (numberOfMovers === 3) {
        return needsOneHelper ? 79.5 : 159 // Box truck
      }
    } else if (serviceType === "labor-only") {
      return needsOneHelper ? 69 : 119
    }
    return 0
  }

  const hourlyRate = getHourlyRate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateStep1 = () => {
    // No validation needed for step 1 (quote summary)
    return true
  }

  const validateStep2 = () => {
    const newErrors = {
      ...errors,
      fullName: "",
      email: "",
      phone: "",
    }

    let isValid = true

    // Validate personal info
    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required"
      isValid = false
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/^\S+@\S+\.\S+$/.test(customerInfo.email)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Phone number is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const validateStep3 = () => {
    const newErrors = {
      ...errors,
      originAddress: "",
      originCity: "",
      originState: "",
      originZip: "",
    }

    let isValid = true

    // Validate origin address
    if (!customerInfo.originAddress.trim()) {
      newErrors.originAddress = "Street address is required"
      isValid = false
    }

    if (!customerInfo.originCity.trim()) {
      newErrors.originCity = "City is required"
      isValid = false
    }

    if (!customerInfo.originState.trim()) {
      newErrors.originState = "State is required"
      isValid = false
    }

    if (!customerInfo.originZip.trim()) {
      newErrors.originZip = "ZIP code is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const validateStep4 = () => {
    const newErrors = {
      ...errors,
      specialInstructions: "",
    }

    let isValid = true

    // Validate special instructions (optional but with character limit)
    if (customerInfo.specialInstructions.length > 500) {
      newErrors.specialInstructions = "Instructions must be 500 characters or less"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNextStep = () => {
    if (bookingStep === 1) {
      if (validateStep1()) {
        setBookingStep(2)
      }
    } else if (bookingStep === 2) {
      if (validateStep2()) {
        setBookingStep(3)
      }
    } else if (bookingStep === 3) {
      if (validateStep3()) {
        setBookingStep(4)
      }
    }
  }

  const handlePrevStep = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1)
    } else {
      onBack()
    }
  }

  const handleSubmitQuote = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    if (!validateStep4()) return

    setIsSubmitting(true)

    // In a real application, this would submit the quote and booking info to a backend
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Combine quote data with customer info
      const completeBookingData = {
        ...formData,
        customer: customerInfo,
      }

      console.log("Booking submitted:", completeBookingData)
      setIsSuccess(true)
      setCountdown(3) // Reset countdown when success state changes
    } catch (error) {
      console.error("Error submitting booking:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generate a random confirmation number
  const confirmationNumber = React.useMemo(() => {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
  }, [isSuccess])

  // Step indicator component
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            bookingStep >= 1 ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          1
        </div>
        <div className={`w-10 h-1 ${bookingStep >= 2 ? "bg-primary-600" : "bg-gray-200"}`}></div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            bookingStep >= 2 ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          2
        </div>
        <div className={`w-10 h-1 ${bookingStep >= 3 ? "bg-primary-600" : "bg-gray-200"}`}></div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            bookingStep >= 3 ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          3
        </div>
        <div className={`w-10 h-1 ${bookingStep >= 4 ? "bg-primary-600" : "bg-gray-200"}`}></div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            bookingStep >= 4 ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          4
        </div>
        <div className={`w-10 h-1 ${bookingStep >= 5 ? "bg-primary-600" : "bg-gray-200"}`}></div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            bookingStep >= 5 ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          5
        </div>
      </div>
    </div>
  )

  // Step title based on current step
  const getStepTitle = () => {
    switch (bookingStep) {
      case 1:
        return "Your Quote Summary"
      case 2:
        return "Your Information"
      case 3:
        return "Origin Address"
      case 4:
        return "Additional Details"
      default:
        return ""
    }
  }

  if (isSuccess) {
    return (
      <div className="py-10 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white text-center">
            <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
              <Check className="h-10 w-10 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
            <p className="mt-2 opacity-90">Your moving request has been received</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-600">Confirmation #:</span>
                <span className="font-semibold text-gray-900">{confirmationNumber}</span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-600">Moving Date:</span>
                <span className="font-semibold text-gray-900">
                  {new Date(movingDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-600">Service:</span>
                <span className="font-semibold text-gray-900">
                  {serviceType === "movers-truck" ? "Movers + Truck" : "Labor Only"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Team Size:</span>
                <span className="font-semibold text-gray-900">
                  {needsOneHelper ? "1" : serviceType === "labor-only" ? "2" : numberOfMovers} Helper
                  {needsOneHelper ? "" : "s"}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                We've sent a confirmation email to <span className="font-semibold">{customerInfo.email}</span>. Our team
                will contact you shortly to confirm all details.
              </p>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-500">
                Redirecting to homepage in <span className="font-semibold text-primary-600">{countdown}</span>{" "}
                seconds...
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-primary-600 hover:bg-primary-700 text-white w-full py-2"
              >
                Go to Homepage Now
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2">
            <HawkIcon width={24} height={24} />
            <p className="text-gray-600 font-medium">Redhawk Relocation</p>
          </div>
          <p className="mt-2 text-sm text-gray-500">Thank you for choosing our services!</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
      <StepIndicator />

      {/* Step 1: Quote Summary */}
      {bookingStep === 1 && (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold text-gray-900 flex-1">{getStepTitle()}</h3>
              <div className="text-primary-600">
                <HawkIcon width={28} height={28} />
              </div>
            </div>
            <p className="text-sm text-gray-600">Review your moving details</p>
          </div>

          {/* Quote Details */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 space-y-5 shadow-sm border border-gray-100">
            {/* Location */}
            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-gray-100">
                <MapPin className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Location</div>
                <div className="text-lg font-semibold text-gray-900">Zip Code: {zipCode}</div>
              </div>
            </div>

            {/* Service Type */}
            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-gray-100">
                {serviceType === "movers-truck" ? (
                  <Truck className="h-6 w-6 text-primary-600" />
                ) : (
                  <Users className="h-6 w-6 text-primary-600" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Service Type</div>
                <div className="text-lg font-semibold text-gray-900">
                  {serviceType === "movers-truck" ? "Movers + Truck" : "Labor Only"}
                </div>
              </div>
            </div>

            {/* Number of Movers */}
            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-gray-100">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Moving Team</div>
                <div className="text-lg font-semibold text-gray-900">
                  {needsOneHelper
                    ? "1 Helper"
                    : serviceType === "labor-only"
                      ? "2 Helpers"
                      : `${numberOfMovers} Helpers`}
                </div>
                <div className="text-sm text-primary-600 font-medium">{formatCurrency(hourlyRate)}/hour</div>
              </div>
            </div>

            {/* Property Details */}
            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-gray-100">
                <Home className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Property Size</div>
                <div className="text-lg font-semibold text-gray-900">
                  {numberOfBedrooms} Bedroom{numberOfBedrooms !== "1" && "s"}
                </div>
                {hasStairs && (
                  <div className="flex items-center mt-1 text-sm text-gray-600">
                    <Stairs className="h-4 w-4 mr-1" />
                    <span>Includes stairs</span>
                  </div>
                )}
              </div>
            </div>

            {/* Time Estimate */}
            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-gray-100">
                <Clock className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Estimated Time</div>
                <div className="text-lg font-semibold text-gray-900">
                  {estimatedHours} hour{estimatedHours !== 1 && "s"}
                </div>
              </div>
            </div>

            {/* Moving Date */}
            {movingDate && (
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-full shadow-sm mr-4 border border-gray-100">
                  <Calendar className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Moving Date</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {new Date(movingDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-sm text-gray-600">
                    {timePreference === "morning" ? "Morning (8AM-12PM)" : "Afternoon (1PM-5PM)"}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rate Information */}
          <div className="border border-gray-200 rounded-xl divide-y overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50">
              <div className="text-base font-semibold text-gray-800">Rate Information</div>
            </div>

            <div className="p-5 flex justify-between items-center bg-white">
              <div className="text-gray-700">
                Hourly Rate (
                {needsOneHelper ? "1 Helper" : serviceType === "labor-only" ? "2 Helpers" : `${numberOfMovers} Helpers`}
                )
              </div>
              <div className="font-bold text-lg text-primary-600">{formatCurrency(hourlyRate)}/hour</div>
            </div>

            <div className="p-5 flex justify-between items-center bg-white">
              <div className="text-gray-700">Total Estimated Cost</div>
              <div className="font-bold text-lg text-primary-600">{formatCurrency(totalCost)}</div>
            </div>

            <div className="p-5 bg-gray-50">
              <div className="text-sm text-gray-600 italic">
                Final cost will be determined based on actual time spent on your move. Our team will provide a more
                accurate estimate after reviewing your details.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Personal Information */}
      {bookingStep === 2 && (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold text-gray-900 flex-1">{getStepTitle()}</h3>
              <div className="text-primary-600">
                <HawkIcon width={28} height={28} />
              </div>
            </div>
            <p className="text-sm text-gray-600">Please provide your contact details</p>
          </div>

          {/* Personal Information */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50">
              <div className="text-base font-semibold text-gray-800">Personal Details</div>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="flex items-center text-sm font-medium text-gray-700">
                  <User className="h-4 w-4 mr-2 text-primary-600" />
                  Full Name
                </label>
                <div className="relative w-full">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                    <User className="h-5 w-5" />
                  </div>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={customerInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 text-gray-900"
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-amber-600">{errors.fullName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                  <Mail className="h-4 w-4 mr-2 text-primary-600" />
                  Email Address
                </label>
                <div className="relative w-full">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 text-gray-900"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-amber-600">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700">
                  <Phone className="h-4 w-4 mr-2 text-primary-600" />
                  Phone Number
                </label>
                <div className="relative w-full">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                    <Phone className="h-5 w-5" />
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 text-gray-900"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-amber-600">{errors.phone}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Origin Address */}
      {bookingStep === 3 && (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold text-gray-900 flex-1">{getStepTitle()}</h3>
              <div className="text-primary-600">
                <HawkIcon width={28} height={28} />
              </div>
            </div>
            <p className="text-sm text-gray-600">Where will we be picking up your items?</p>
          </div>

          {/* Origin Address */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50">
              <div className="text-base font-semibold text-gray-800">Origin Address</div>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <label htmlFor="originAddress" className="flex items-center text-sm font-medium text-gray-700">
                  <Home className="h-4 w-4 mr-2 text-primary-600" />
                  Street Address
                </label>
                <div className="relative w-full">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                    <Home className="h-5 w-5" />
                  </div>
                  <Input
                    id="originAddress"
                    name="originAddress"
                    value={customerInfo.originAddress}
                    onChange={handleInputChange}
                    className="w-full pl-10 text-gray-900"
                    placeholder="123 Main St"
                  />
                  {errors.originAddress && <p className="mt-1 text-sm text-amber-600">{errors.originAddress}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="originCity" className="flex items-center text-sm font-medium text-gray-700">
                    <Building className="h-4 w-4 mr-2 text-primary-600" />
                    City
                  </label>
                  <div className="relative w-full">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                      <Building className="h-5 w-5" />
                    </div>
                    <Input
                      id="originCity"
                      name="originCity"
                      value={customerInfo.originCity}
                      onChange={handleInputChange}
                      className="w-full pl-10 text-gray-900"
                      placeholder="Phoenix"
                    />
                    {errors.originCity && <p className="mt-1 text-sm text-amber-600">{errors.originCity}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="originState" className="text-sm font-medium text-gray-700">
                    State
                  </label>
                  <Input
                    id="originState"
                    name="originState"
                    value={customerInfo.originState}
                    onChange={handleInputChange}
                    className="w-full text-gray-900"
                    placeholder="AZ"
                  />
                  {errors.originState && <p className="mt-1 text-sm text-amber-600">{errors.originState}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="originZip" className="text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <Input
                    id="originZip"
                    name="originZip"
                    value={customerInfo.originZip}
                    onChange={handleInputChange}
                    className="w-full text-gray-900"
                    placeholder="85001"
                  />
                  {errors.originZip && <p className="mt-1 text-sm text-amber-600">{errors.originZip}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Additional Details */}
      {bookingStep === 4 && (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold text-gray-900 flex-1">{getStepTitle()}</h3>
              <div className="text-primary-600">
                <HawkIcon width={28} height={28} />
              </div>
            </div>
            <p className="text-sm text-gray-600">Complete your booking with any additional information</p>
          </div>

          {/* Destination Address (Optional) */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50 flex items-center justify-between">
              <div className="text-base font-semibold text-gray-800">
                Destination Address <span className="text-sm font-normal text-gray-500">(Optional)</span>
              </div>
              <ArrowRight className="h-4 w-4 text-primary-600" />
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <label htmlFor="destinationAddress" className="flex items-center text-sm font-medium text-gray-700">
                  <Home className="h-4 w-4 mr-2 text-primary-600" />
                  Street Address
                </label>
                <div className="relative w-full">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                    <Home className="h-5 w-5" />
                  </div>
                  <Input
                    id="destinationAddress"
                    name="destinationAddress"
                    value={customerInfo.destinationAddress}
                    onChange={handleInputChange}
                    className="w-full pl-10 text-gray-900"
                    placeholder="456 Oak Ave"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="destinationCity" className="flex items-center text-sm font-medium text-gray-700">
                    <Building className="h-4 w-4 mr-2 text-primary-600" />
                    City
                  </label>
                  <div className="relative w-full">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                      <Building className="h-5 w-5" />
                    </div>
                    <Input
                      id="destinationCity"
                      name="destinationCity"
                      value={customerInfo.destinationCity}
                      onChange={handleInputChange}
                      className="w-full pl-10 text-gray-900"
                      placeholder="Scottsdale"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="destinationState" className="text-sm font-medium text-gray-700">
                    State
                  </label>
                  <Input
                    id="destinationState"
                    name="destinationState"
                    value={customerInfo.destinationState}
                    onChange={handleInputChange}
                    className="w-full text-gray-900"
                    placeholder="AZ"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="destinationZip" className="text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <Input
                    id="destinationZip"
                    name="destinationZip"
                    value={customerInfo.destinationZip}
                    onChange={handleInputChange}
                    className="w-full text-gray-900"
                    placeholder="85251"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50">
              <div className="text-base font-semibold text-gray-800">
                Special Instructions <span className="text-sm font-normal text-gray-500">(Optional)</span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <label htmlFor="specialInstructions" className="flex items-center text-sm font-medium text-gray-700">
                  <MessageSquare className="h-4 w-4 mr-2 text-primary-600" />
                  Additional Information
                </label>
                <div className="relative">
                  <Textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    value={customerInfo.specialInstructions}
                    onChange={handleInputChange}
                    className="w-full min-h-[100px] text-gray-900"
                    placeholder="Please provide any special instructions or details about your move (e.g., fragile items, parking restrictions, etc.)"
                  />
                  <div className="flex justify-between mt-1">
                    <div>
                      {errors.specialInstructions && (
                        <p className="mt-1 text-sm text-amber-600">{errors.specialInstructions}</p>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {customerInfo.specialInstructions.length}/500 characters
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {bookingStep === 4 ? (
          <Button
            type="button"
            onClick={handleSubmitQuote}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
                  L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
                  c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
                  c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Check className="mr-2 h-5 w-5" />
                Book Now
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  className="ml-2"
                >
                  <path
                    d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
                  L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
                  c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
                  c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
                  />
                </svg>
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleNextStep}
            className="w-full bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          >
            Continue
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              className="ml-2"
            >
              <path
                d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
              L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
              c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
              c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
              />
            </svg>
          </Button>
        )}

        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            className="flex-1 py-4 border-2 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {bookingStep === 1 ? "Back to Quote" : "Previous"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onRestart}
            className="flex-1 py-4 border-2 hover:bg-gray-50 transition-all duration-200"
          >
            Start Over
          </Button>
        </div>
      </div>
    </form>
  )
}
