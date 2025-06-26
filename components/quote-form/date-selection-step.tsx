"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Sunrise, Sunset } from "lucide-react"
import type { QuoteFormData } from "./quote-form"

interface DateSelectionStepProps {
  movingDate: string
  timePreference: string
  onNext: (data: Partial<QuoteFormData>) => void
  onBack: () => void
}

export function DateSelectionStep({ movingDate, timePreference, onNext, onBack }: DateSelectionStepProps) {
  const [selectedDate, setSelectedDate] = useState(movingDate || "")
  const [selectedTime, setSelectedTime] = useState(timePreference || "")
  const [error, setError] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  // Get tomorrow's date as the minimum selectable date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  // Get date 3 months from now as the maximum selectable date
  const threeMonthsLater = new Date()
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3)
  const maxDate = threeMonthsLater.toISOString().split("T")[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate) {
      setError('Please select your preferred moving date")our preferred moving date')
      return
    }

    if (!selectedTime) {
      setError("Please select your preferred time of day")
      return
    }

    onNext({
      movingDate: selectedDate,
      timePreference: selectedTime,
    })
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleNext = () => {
    if (!selectedDate) {
      setError('Please select your preferred moving date")our preferred moving date')
      return
    }

    if (!selectedTime) {
      setError("Please select your preferred time of day")
      return
    }

    onNext({
      movingDate: selectedDate,
      timePreference: selectedTime,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto w-full">
      <div className="space-y-2 text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-50 mb-3 mx-auto">
          <Calendar className="h-6 w-6 text-primary-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Select Moving Date</h3>
        <p className="text-gray-600">Choose your preferred moving date and time</p>
      </div>

      {/* Date Selection */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-primary-600 mr-2" />
          <label htmlFor="moving-date" className="text-sm font-medium text-gray-700">
            Preferred Moving Date
          </label>
        </div>
        <div className="relative">
          <input
            type="date"
            id="moving-date"
            min={minDate}
            max={maxDate}
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value)
              setError("")
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full px-4 py-4 border-2 rounded-lg shadow-sm focus:outline-none transition-all duration-200 ${
              isFocused ? "border-primary-500 ring-2 ring-primary-100" : "border-gray-300 hover:border-gray-400"
            } text-gray-900`}
          />
        </div>
        {selectedDate && (
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-3 text-primary-700 font-medium flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary-600" />
            {formatDate(selectedDate)}
          </div>
        )}
      </div>

      {/* Time Preference */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-primary-600 mr-2" />
          <label className="text-sm font-medium text-gray-700">Preferred Time</label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className={`py-4 px-4 border-2 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
              selectedTime === "morning"
                ? "border-primary-600 bg-primary-50 text-primary-700 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
            }`}
            onClick={() => {
              setSelectedTime("morning")
              setError("")
            }}
          >
            <Sunrise className={`h-6 w-6 mb-2 ${selectedTime === "morning" ? "text-primary-600" : "text-gray-500"}`} />
            <span className="font-medium">Morning</span>
            <span className="text-xs text-gray-500">8AM-12PM</span>
          </button>
          <button
            type="button"
            className={`py-4 px-4 border-2 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
              selectedTime === "afternoon"
                ? "border-primary-600 bg-primary-50 text-primary-700 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
            }`}
            onClick={() => {
              setSelectedTime("afternoon")
              setError("")
            }}
          >
            <Sunset className={`h-6 w-6 mb-2 ${selectedTime === "afternoon" ? "text-primary-600" : "text-gray-500"}`} />
            <span className="font-medium">Afternoon</span>
            <span className="text-xs text-gray-500">1PM-5PM</span>
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 py-6 text-base border-2 hover:bg-gray-50 transition-all duration-200"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={!selectedDate || !selectedTime}
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
      </div>
    </form>
  )
}
