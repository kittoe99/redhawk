"use client"

import type React from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"
import { Check } from "lucide-react"

const SummaryStep: React.FC = () => {
  const { formData, calculatePrice, goToPreviousStep, goToNextStep } = useQuoteWizard()

  useEffect(() => {
    // Calculate final price when component mounts
    calculatePrice()
  }, [calculatePrice])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  // Get service type display text
  const getServiceTypeText = () => {
    if (formData.serviceType === "movers_truck") {
      return formData.helperCount === 1 ? "1 Helper + Truck" : "2 Helpers + Truck"
    } else {
      return formData.helperCount === 1 ? "1 Helper (Labor Only)" : "2 Helpers (Labor Only)"
    }
  }

  // Get vehicle type display text
  const getVehicleTypeText = () => {
    if (formData.vehicleType === "cargo_van") {
      return "Cargo Van (10-12 ft)"
    } else if (formData.vehicleType === "box_truck") {
      return "Box Truck (15-17 ft)"
    } else if (formData.vehicleType === "pickup_truck") {
      return "Pickup Truck"
    }
    return "None"
  }

  // Get property size display text
  const getPropertySizeText = () => {
    if (formData.propertySize === "studio") {
      return "Studio"
    } else if (formData.propertySize === "1_bedroom") {
      return "1 Bedroom"
    } else if (formData.propertySize === "2_bedroom") {
      return "2 Bedroom"
    } else if (formData.propertySize === "3plus_bedroom") {
      return "3+ Bedroom"
    }
    return ""
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

  // Get time preference display text
  const getTimePreferenceText = () => {
    if (formData.timePreference === "morning") {
      return "8:00 AM - 12:00 PM"
    } else if (formData.timePreference === "afternoon") {
      return "1:00 PM - 5:00 PM"
    }
    return ""
  }

  // Get damage protection display text
  const getDamageProtectionText = () => {
    if (formData.damageProtection === "1000") {
      return "$1,000 (Included)"
    } else if (formData.damageProtection === "2500") {
      return "$2,500 (+$25)"
    } else if (formData.damageProtection === "5000") {
      return "$5,000 (+$50)"
    } else if (formData.damageProtection === "10000") {
      return "$10,000 (+$100)"
    }
    return ""
  }

  // Calculate additional fees based on damage protection
  const getAdditionalFees = () => {
    let fees = 0

    if (formData.damageProtection === "2500") {
      fees += 25
    } else if (formData.damageProtection === "5000") {
      fees += 50
    } else if (formData.damageProtection === "10000") {
      fees += 100
    }

    // Add fees for appliances if selected
    if (formData.hasAppliances) {
      fees += 50 // Example fee for appliances
    }

    return fees
  }

  // Calculate total estimate
  const getTotalEstimate = () => {
    const hourlyRate = formData.baseRate || 89
    const hours = formData.estimatedHours || 3
    const vehicleFee = formData.vehicleFee || 0
    const additionalFees = getAdditionalFees()

    return hourlyRate * hours + vehicleFee + additionalFees
  }

  const handleBookNow = () => {
    goToNextStep()
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900">Quote Summary</h3>
        <p className="text-gray-600">Review your moving details and pricing</p>
      </div>

      {/* Price Estimate */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 rounded-xl border-2 border-primary-200">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold text-gray-900">Price estimate:</h4>
          <span className="text-3xl font-bold text-primary-700">{formatCurrency(getTotalEstimate())}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          *This estimate is based on the information provided. Final price may vary based on actual move details.
        </p>
      </div>

      {/* Service Features */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">{getServiceTypeText()}</h4>

        <div className="space-y-3">
          <div className="flex items-center">
            <Check className="h-5 w-5 text-primary-600 mr-3" />
            <span className="text-gray-700">Upfront Pricing</span>
          </div>
          <div className="flex items-center">
            <Check className="h-5 w-5 text-primary-600 mr-3" />
            <span className="text-gray-700">Customer support 7 days a week</span>
          </div>
          <div className="flex items-center">
            <Check className="h-5 w-5 text-primary-600 mr-3" />
            <span className="text-gray-700">Damage Protection included</span>
          </div>
          <div className="flex items-center">
            <Check className="h-5 w-5 text-primary-600 mr-3" />
            <span className="text-gray-700">Professional, background-checked movers</span>
          </div>
        </div>
      </div>

      {/* Move Details */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Move Details</h4>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Service Type</p>
            <p className="font-medium text-gray-900">{getServiceTypeText()}</p>
          </div>

          {formData.serviceType === "movers_truck" && (
            <div>
              <p className="text-gray-600">Vehicle Type</p>
              <p className="font-medium text-gray-900">{getVehicleTypeText()}</p>
            </div>
          )}

          <div>
            <p className="text-gray-600">Property Size</p>
            <p className="font-medium text-gray-900">{getPropertySizeText()}</p>
          </div>

          <div>
            <p className="text-gray-600">Stairs</p>
            <p className="font-medium text-gray-900">{formData.hasStairs ? "Yes" : "No"}</p>
          </div>

          <div>
            <p className="text-gray-600">Date</p>
            <p className="font-medium text-gray-900">{formatDate(formData.moveDate || "")}</p>
          </div>

          <div>
            <p className="text-gray-600">Time</p>
            <p className="font-medium text-gray-900">{getTimePreferenceText()}</p>
          </div>

          <div>
            <p className="text-gray-600">Heavy Items</p>
            <p className="font-medium text-gray-900">{formData.hasAppliances ? "Yes" : "No"}</p>
          </div>

          <div>
            <p className="text-gray-600">Damage Protection</p>
            <p className="font-medium text-gray-900">{getDamageProtectionText()}</p>
          </div>

          <div>
            <p className="text-gray-600">Pickup Address</p>
            <p className="font-medium text-gray-900">
              {formData.pickupAddress
                ? formData.pickupAddress
                : formData.zipCode
                  ? `${formData.zipCode}`
                  : "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-gray-600">Destination Address</p>
            <p className="font-medium text-gray-900">
              {formData.destinationAddress
                ? `${formData.destinationAddress}${formData.destinationCity ? `, ${formData.destinationCity}` : ""}${formData.destinationState ? `, ${formData.destinationState}` : ""}${formData.destinationZip ? ` ${formData.destinationZip}` : ""}`
                : "Not specified"}
            </p>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Price Breakdown</h4>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Hourly Rate</span>
            <span className="text-gray-900">
              {formatCurrency(formData.baseRate || 89)} × {formData.estimatedHours || 3} hours
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Base Price</span>
            <span className="text-gray-900">
              {formatCurrency((formData.baseRate || 89) * (formData.estimatedHours || 3))}
            </span>
          </div>

          {(formData.vehicleFee || 0) > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Vehicle Fee</span>
              <span className="text-gray-900">{formatCurrency(formData.vehicleFee || 0)}</span>
            </div>
          )}

          {getAdditionalFees() > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Additional Fees</span>
              <span className="text-gray-900">{formatCurrency(getAdditionalFees())}</span>
            </div>
          )}

          <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
            <span className="text-gray-900">Total Estimate</span>
            <span className="text-gray-900">{formatCurrency(getTotalEstimate())}</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          className="flex-1 py-6 text-base border-2 hover:bg-gray-50 transition-all duration-200"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleBookNow}
          className="flex-1 bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Book Now
        </Button>
      </div>
    </div>
  )
}

export default SummaryStep
