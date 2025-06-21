"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Loader2 } from "lucide-react"

const serviceAreas = [
  "Austin, TX",
  "Nashville, TN",
  "Phoenix, AZ",
  "Denver, CO",
  "Tampa, FL",
  "Charlotte, NC",
  "Raleigh, NC",
  "Columbus, OH",
  "Boise, ID",
  "Salt Lake City, UT",
  "Baltimore, MD", // Added Baltimore
]

const vehicleTypes = [
  "Cargo Van",
  "Box Truck (10-12 ft)",
  "Box Truck (14-16 ft)",
  "Box Truck (18-20 ft)",
  "Box Truck (22-26 ft)",
]

export function MoverApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceArea: "",
    vehicleType: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    // Removed experience and availability from state
    additionalInfo: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your interest in joining Redhawk Relocation. We'll review your application and get back to you
          within 24 hours.
        </p>
        <p className="text-sm text-gray-500">Keep an eye on your email for next steps in the onboarding process.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Service Area */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Area</h3>
          <div>
            <label htmlFor="serviceArea" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Service Area *
            </label>
            <select
              id="serviceArea"
              name="serviceArea"
              required
              value={formData.serviceArea}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select a service area</option>
              {serviceAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vehicle Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Type *
              </label>
              <select
                id="vehicleType"
                name="vehicleType"
                required
                value={formData.vehicleType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select vehicle type</option>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Year *
              </label>
              <Input
                id="vehicleYear"
                name="vehicleYear"
                type="number"
                min="2004"
                max={new Date().getFullYear()}
                required
                value={formData.vehicleYear}
                onChange={handleInputChange}
                className="w-full"
                placeholder="e.g., 2018"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Make *
              </label>
              <Input
                id="vehicleMake"
                name="vehicleMake"
                type="text"
                required
                value={formData.vehicleMake}
                onChange={handleInputChange}
                className="w-full"
                placeholder="e.g., Ford, Chevrolet, Mercedes"
              />
            </div>
            <div>
              <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Model *
              </label>
              <Input
                id="vehicleModel"
                name="vehicleModel"
                type="text"
                required
                value={formData.vehicleModel}
                onChange={handleInputChange}
                className="w-full"
                placeholder="e.g., Transit, Express, Sprinter"
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                Anything else you'd like us to know about you or your application?
              </label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                className="w-full"
                rows={3}
                placeholder="e.g., special skills, certifications, preferred work hours, etc."
              />
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-600">
            By submitting this application, you acknowledge that you understand you will be working as an independent
            contractor, not an employee of Redhawk Relocation. You will be responsible for your own taxes, insurance,
            and business expenses. All applicants must pass a background check and vehicle inspection before being
            approved to work on our platform.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 text-lg font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Submitting Application...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
