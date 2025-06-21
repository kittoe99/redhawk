"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Loader2 } from "lucide-react"

export function ContactPageContent() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    // Validate required fields
    if (!formState.fullName || !formState.email || !formState.message) {
      setError("Please fill in all required fields.")
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      setFormState({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      })
    } catch (err) {
      setError("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {isSubmitted ? (
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-green-800 mb-4">Message Sent Successfully!</h2>
              <p className="text-green-700 text-lg mb-6">
                Thank you for contacting Redhawk Relocation. We'll get back to you within 24 hours.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-lg rounded-full"
              >
                Send Another Message
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            {/* Header Section */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in touch today</h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
                Ready to make your move stress-free? Get in touch with Redhawk Relocation today. Our expert team is here
                to help with all your moving needs.
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-left">
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-3">
                      Name
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formState.fullName}
                      onChange={handleChange}
                      placeholder="John Carter"
                      required
                      className="w-full h-14 rounded-xl border-gray-200 focus:border-primary-500 focus:ring-primary-500 bg-gray-50 focus:bg-white transition-colors text-base text-gray-900"
                    />
                  </div>
                  <div className="text-left">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                      className="w-full h-14 rounded-xl border-gray-200 focus:border-primary-500 focus:ring-primary-500 bg-gray-50 focus:bg-white transition-colors text-base text-gray-900"
                    />
                  </div>
                </div>

                {/* Phone and Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-left">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="(123) 456 - 789"
                      className="w-full h-14 rounded-xl border-gray-200 focus:border-primary-500 focus:ring-primary-500 bg-gray-50 focus:bg-white transition-colors text-base text-gray-900"
                    />
                  </div>
                  <div className="text-left">
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-3">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full h-14 rounded-xl border-gray-200 focus:border-primary-500 focus:ring-primary-500 bg-gray-50 focus:bg-white transition-colors text-base text-gray-900"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="text-left">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
                    Leave us a message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Please type your message here..."
                    required
                    rows={6}
                    className="w-full rounded-xl border-gray-200 focus:border-primary-500 focus:ring-primary-500 bg-gray-50 focus:bg-white transition-colors resize-none text-base text-gray-900"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary-600 hover:bg-primary-700 text-white py-4 px-8 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
