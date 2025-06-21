"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  MessageSquare,
  Users,
  Headphones,
  FileText,
  Clock,
  Loader2,
  Building,
} from "lucide-react"

interface FormState {
  name: string
  email: string
  phone: string
  inquiryType: string
  moveDate: string
  moveFrom: string
  moveTo: string
  message: string
}

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    moveDate: "",
    moveFrom: "",
    moveTo: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, inquiryType: value }))
    if (errors.inquiryType) {
      setErrors((prev) => ({ ...prev, inquiryType: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {}
    if (!formState.name.trim()) newErrors.name = "Full name is required."
    if (!formState.email.trim()) {
      newErrors.email = "Email is required."
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email is invalid."
    }
    if (!formState.inquiryType) newErrors.inquiryType = "Inquiry type is required."
    if (!formState.message.trim()) newErrors.message = "Message is required."

    if (formState.inquiryType === "moving-quote") {
      if (!formState.moveDate) newErrors.moveDate = "Move date is required for quotes."
      if (!formState.moveFrom.trim()) newErrors.moveFrom = "Origin location is required for quotes."
      if (!formState.moveTo.trim()) newErrors.moveTo = "Destination location is required for quotes."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        moveDate: "",
        moveFrom: "",
        moveTo: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  const inquiryTypes = [
    { value: "moving-quote", label: "Moving Quote Request", icon: FileText },
    { value: "general-inquiry", label: "General Inquiry", icon: MessageSquare },
    { value: "join-platform", label: "Join as Helper", icon: Users },
    { value: "support", label: "Customer Support", icon: Headphones },
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: "(720) 842-9167",
      description: "Mon-Fri 8AM-6PM",
      href: "tel:+17208429167",
      color: "bg-blue-100",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "info@redhawkrelocation.com",
      description: "24hr response time",
      href: "mailto:info@redhawkrelocation.com",
      color: "bg-green-100",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Austin, TX",
      description: "6001 W Parmer Lane, Ste 370",
      href: "#",
      color: "bg-purple-100",
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon-Fri: 8AM-6PM",
      description: "Sat: 9AM-4PM, Sun: Closed",
      href: "#",
      color: "bg-orange-100",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to get started? We're here to help make your move as smooth as possible.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              className="group bg-white rounded-xl border border-gray-200 p-6 h-full transition-all duration-200 hover:border-red-400"
            >
              <div className="bg-red-50 rounded-xl w-12 h-12 flex items-center justify-center mb-4 text-red-600">
                <method.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors mb-1">
                {method.title}
              </h3>
              <p className="text-base font-medium text-gray-800 mb-1 break-words">{method.value}</p>
              <p className="text-sm text-gray-500">{method.description}</p>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="p-3 bg-green-100 rounded-2xl mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. We'll review your message and get back to you within 24 hours.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we'll be in touch.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`${errors.name ? "border-red-500" : "border-gray-200"} focus:border-red-400 focus:ring-red-500 rounded-xl text-gray-900`}
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`${errors.email ? "border-red-500" : "border-gray-200"} focus:border-red-400 focus:ring-red-500 rounded-xl text-gray-900`}
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="border-gray-200 focus:border-red-400 focus:ring-red-500 rounded-xl text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formState.inquiryType}
                    onChange={(e) => handleSelectChange(e.target.value)}
                    className={`w-full h-11 border-2 rounded-xl px-3 ${errors.inquiryType ? "border-red-500" : "border-gray-200"} focus:border-red-400 focus:ring-red-500 text-gray-900`}
                  >
                    <option value="">Select inquiry type</option>
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.inquiryType && <p className="text-xs text-red-600 mt-1">{errors.inquiryType}</p>}
                </div>
              </div>

              {formState.inquiryType === "moving-quote" && (
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-100">
                  <h4 className="text-lg font-medium text-gray-900 flex items-center">
                    <Building size={20} className="mr-2 text-red-600" />
                    Moving Quote Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="moveDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Move Date *
                      </label>
                      <Input
                        id="moveDate"
                        name="moveDate"
                        type="date"
                        value={formState.moveDate}
                        onChange={handleChange}
                        className={`${errors.moveDate ? "border-red-500" : "border-gray-200"} focus:border-red-400 focus:ring-red-500 rounded-xl text-gray-900`}
                      />
                      {errors.moveDate && <p className="text-xs text-red-600 mt-1">{errors.moveDate}</p>}
                    </div>
                    <div>
                      <label htmlFor="moveFrom" className="block text-sm font-medium text-gray-700 mb-2">
                        Moving From *
                      </label>
                      <Input
                        id="moveFrom"
                        name="moveFrom"
                        value={formState.moveFrom}
                        onChange={handleChange}
                        placeholder="Current city/zip"
                        className={`${errors.moveFrom ? "border-red-500" : "border-gray-200"} focus:border-red-400 focus:ring-red-500 rounded-xl text-gray-900`}
                      />
                      {errors.moveFrom && <p className="text-xs text-red-600 mt-1">{errors.moveFrom}</p>}
                    </div>
                    <div>
                      <label htmlFor="moveTo" className="block text-sm font-medium text-gray-700 mb-2">
                        Moving To *
                      </label>
                      <Input
                        id="moveTo"
                        name="moveTo"
                        value={formState.moveTo}
                        onChange={handleChange}
                        placeholder="Destination city/zip"
                        className={`${errors.moveTo ? "border-red-500" : "border-gray-200"} focus:border-red-400 focus:ring-red-500 rounded-xl text-gray-900`}
                      />
                      {errors.moveTo && <p className="text-xs text-red-600 mt-1">{errors.moveTo}</p>}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Please provide details about your inquiry..."
                  className={`resize-none rounded-xl ${errors.message ? "border-red-500" : "border-gray-200"} focus:border-red-400 focus:ring-red-500 text-gray-900`}
                />
                {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
              </div>

              <div className="flex items-start">
                <input
                  id="privacy"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="privacy" className="ml-3 block text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="/privacy-policy" className="text-red-600 hover:text-red-700 underline">
                    privacy policy
                  </a>{" "}
                  and consent to being contacted regarding my inquiry.
                </label>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
