"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"
import { Check, Calendar, MapPin } from "lucide-react"

const BookingStep: React.FC = () => {
  const { formData, goToPreviousStep } = useQuoteWizard()
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validatePersonalInfo = () => {
    const newErrors: Record<string, string> = {}

    if (!personalInfo.fullName.trim()) {
      newErrors.fullName = "Name is required"
    }

    if (!personalInfo.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(personalInfo.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!personalInfo.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validatePersonalInfo()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 2000)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  // Calculate total estimate
  const getTotalEstimate = () => {
    const hourlyRate = formData.baseRate || 89
    const hours = formData.estimatedHours || 3
    const vehicleFee = formData.vehicleFee || 0
    return hourlyRate * hours + vehicleFee
  }

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  if (isSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="h-10 w-10 text-green-600" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Thank you for choosing Redhawk Relocation! We've received your booking request and will contact you within 2
            hours to confirm your move details.
          </p>
        </div>

        <div className="bg-primary-50 p-6 rounded-xl border border-primary-200">
          <h4 className="font-semibold text-primary-900 mb-3">What happens next?</h4>
          <div className="space-y-2 text-sm text-primary-800">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
              <span>We'll call you to confirm your move details</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
              <span>You'll receive a confirmation email with your quote</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
              <span>Our team will arrive on time for your scheduled move</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>
            Questions? Call us at <span className="font-medium text-primary-600">(720) 842-9167</span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900">Complete Your Booking</h3>
        <p className="text-gray-600">Enter your contact information to confirm your move</p>
      </div>

      {/* Quick Summary */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-4">Move Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-primary-600 mr-2" />
            <span className="text-gray-900">{formatDate(formData.moveDate || "")}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-primary-600 mr-2" />
            <span className="text-gray-900">{formData.zipCode}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900">Total Estimate:</span>
            <span className="text-xl font-bold text-primary-700">{formatCurrency(getTotalEstimate())}</span>
          </div>
        </div>
      </div>

      {/* Contact Information Form */}
      <form className="space-y-6">
        {/* Personal Details Section */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h3 className="font-semibold text-gray-800">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <Input
                type="text"
                value={personalInfo.fullName.split(" ")[0] || ""}
                onChange={(e) => {
                  const lastName = personalInfo.fullName.split(" ").slice(1).join(" ")
                  handlePersonalInfoChange("fullName", `${e.target.value} ${lastName}`.trim())
                }}
                className={`${errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} rounded-xl text-gray-900`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <Input
                type="text"
                value={personalInfo.fullName.split(" ").slice(1).join(" ") || ""}
                onChange={(e) => {
                  const firstName = personalInfo.fullName.split(" ")[0] || ""
                  handlePersonalInfoChange("fullName", `${firstName} ${e.target.value}`.trim())
                }}
                className={`${errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} rounded-xl text-gray-900`}
                required
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={personalInfo.email}
                onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                className={`${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} rounded-xl text-gray-900`}
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <Input
                type="tel"
                placeholder="(555) 123-4567"
                value={personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                className={`${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} rounded-xl text-gray-900`}
                required
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions (Optional)</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                rows={3}
                placeholder="Any special instructions or notes for our team..."
              />
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-lg">
          <p>
            <span className="font-medium">Privacy Note:</span> Your information is only used to provide you with a quote
            and schedule your move. We never share your information with third parties.
          </p>
        </div>
      </form>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          className="flex-1 py-6 text-base border-2 hover:bg-gray-50 transition-all duration-200 rounded-xl"
          disabled={isSubmitting}
        >
          Back to Summary
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Confirming Booking...
            </>
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </div>
    </div>
  )
}

export default BookingStep
