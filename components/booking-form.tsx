"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, Phone, User, Mail, Truck, Check } from "lucide-react"

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  // const { showLoader, hideLoader } = useLoader() // Removed unused import

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // showLoader() // Show loader during form submission // Removed unused function

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      // hideLoader() // Hide loader after submission completes // Removed unused function

      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1500)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Book Your Move</h3>
          {/* <HawkIcon width={24} height={24} className="text-white" /> */}
        </div>
        <p className="mt-2 text-white/80">Ready to move? Complete this form to schedule your moving service.</p>
      </div>

      {isSuccess ? (
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Booking Received!</h4>
          <p className="text-gray-600">
            Thank you for booking with Redhawk Relocation. We'll contact you within 24 hours to confirm your
            appointment.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium text-gray-700 flex items-center">
                  <User className="h-4 w-4 mr-2 text-primary-600" />
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="John Doe"
                  className="border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-xl text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary-600" />
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="(555) 123-4567"
                  className="border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-xl text-gray-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary-600" />
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-xl text-gray-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="moveDate" className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                  Preferred Move Date
                </label>
                <Input
                  id="moveDate"
                  name="moveDate"
                  type="date"
                  required
                  className="border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-xl text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="moveTime" className="text-sm font-medium text-gray-700 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary-600" />
                  Preferred Time
                </label>
                <select
                  id="moveTime"
                  name="moveTime"
                  required
                  className="w-full rounded-xl border-2 border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-gray-900"
                >
                  <option value="">Select a time</option>
                  <option value="morning">Morning (8AM-12PM)</option>
                  <option value="afternoon">Afternoon (1PM-5PM)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="fromAddress" className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                  Moving From
                </label>
                <Input
                  id="fromAddress"
                  name="fromAddress"
                  required
                  placeholder="Current address"
                  className="border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-xl text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="toAddress" className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                  Moving To
                </label>
                <Input
                  id="toAddress"
                  name="toAddress"
                  required
                  placeholder="Destination address"
                  className="border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-xl text-gray-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="serviceType" className="text-sm font-medium text-gray-700 flex items-center">
                <Truck className="h-4 w-4 mr-2 text-primary-600" />
                Service Type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                required
                className="w-full rounded-xl border-2 border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-gray-900"
              >
                <option value="">Select service type</option>
                <option value="local">Local Moving</option>
                <option value="long-distance">Long Distance Moving</option>
                <option value="commercial">Commercial Moving</option>
                <option value="specialty">Specialty Items Moving</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium text-gray-700 flex items-center">
                <span className="mr-2">📝</span>
                Additional Notes
              </label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Any special requirements or items that need special care?"
                className="border-gray-300 focus:border-primary-500 focus:ring-primary-500 min-h-[100px] rounded-xl text-gray-900"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-medium"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Processing...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our terms of service and privacy policy.
          </p>
        </form>
      )}
    </div>
  )
}
