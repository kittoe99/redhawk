"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"

const DateTimeStep: React.FC = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useQuoteWizard()
  const [selectedDate, setSelectedDate] = useState<string>(formData.moveDate || "")
  const [error, setError] = useState<string>("")
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
  const [showTimePreference, setShowTimePreference] = useState(false)
  const [showContinueButton, setShowContinueButton] = useState(false)

  // Show time preference when date is selected
  useEffect(() => {
    if (formData.moveDate) {
      setTimeout(() => setShowTimePreference(true), 500)
    } else {
      setShowTimePreference(false)
      setShowContinueButton(false)
    }
  }, [formData.moveDate])

  // Show continue button when time preference is selected
  useEffect(() => {
    if (formData.timePreference && formData.moveDate) {
      setTimeout(() => setShowContinueButton(true), 500)
    } else {
      setShowContinueButton(false)
    }
  }, [formData.timePreference, formData.moveDate])

  // Auto scroll to new questions
  useEffect(() => {
    const scrollToElement = (selector: string) => {
      setTimeout(() => {
        const element = document.querySelector(selector)
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
      }, 100)
    }

    if (showTimePreference) scrollToElement('[data-question="time-preference"]')
    if (showContinueButton) scrollToElement('[data-question="continue-button"]')
  }, [showTimePreference, showContinueButton])

  const generateCalendarDates = () => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startDate = new Date(firstDay)

    // Start from Monday of the week containing the first day
    const dayOfWeek = firstDay.getDay()
    const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    startDate.setDate(startDate.getDate() - mondayOffset)

    const dates = []
    const currentDate = new Date(startDate)

    // Generate 6 weeks of dates
    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        dates.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
      }
    }

    return dates
  }

  const isDateAvailable = (date: Date): boolean => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const maxDate = new Date(today)
    maxDate.setMonth(maxDate.getMonth() + 3)

    return date >= tomorrow && date <= maxDate
  }

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  }

  // Check if date is a weekend (higher demand)
  const isWeekend = (date: Date): boolean => {
    const day = date.getDay()
    return day === 0 || day === 6 // 0 is Sunday, 6 is Saturday
  }

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr)
    updateFormData({ moveDate: dateStr, timePreference: "", timeStart: "", timeEnd: "" })
    setError("")
    setShowTimePreference(false)
    setShowContinueButton(false)
  }

  const handleTimePreferenceSelect = (preference: "morning" | "afternoon") => {
    let timeStart = ""
    let timeEnd = ""

    if (preference === "morning") {
      timeStart = "8:00 AM"
      timeEnd = "12:00 PM"
    } else {
      timeStart = "1:00 PM"
      timeEnd = "5:00 PM"
    }

    updateFormData({
      timePreference: preference,
      timeStart,
      timeEnd,
    })
    setShowContinueButton(false)
  }

  const handleContinue = () => {
    if (!formData.moveDate) {
      setError("Please select a moving date")
      return
    }

    if (!formData.timePreference) {
      setError("Please select a time preference")
      return
    }

    setError("")
    goToNextStep()
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-3">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">Which day?</h3>
        <p className="text-gray-600 text-sm md:text-base">Select your preferred moving date and time</p>
      </div>

      {/* Date Selection */}
      <div className="space-y-4">
        <h4 className="text-base md:text-lg font-semibold text-gray-900">Select a date</h4>
        <div className="border-2 border-gray-200 rounded-lg p-3 md:p-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11)
                  setCurrentYear(currentYear - 1)
                } else {
                  setCurrentMonth(currentMonth - 1)
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={currentYear === new Date().getFullYear() && currentMonth === new Date().getMonth()}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <h5 className="text-lg font-semibold text-gray-900">
              {new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h5>

            <button
              type="button"
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0)
                  setCurrentYear(currentYear + 1)
                } else {
                  setCurrentMonth(currentMonth + 1)
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={
                currentYear === new Date().getFullYear() + 1 ||
                (currentYear === new Date().getFullYear() && currentMonth >= new Date().getMonth() + 3)
              }
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {/* Calendar Header */}
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
              <div key={index} className="text-xs md:text-sm font-medium text-gray-600 text-center py-2">
                {day}
              </div>
            ))}

            {/* Calendar Dates */}
            {generateCalendarDates().map((date, index) => {
              const dateStr = date.toISOString().split("T")[0]
              const isSelected = dateStr === selectedDate
              const isAvailable = isDateAvailable(date)
              const isInCurrentMonth = isCurrentMonth(date)
              const isHighDemand = isWeekend(date) && isAvailable

              return (
                <div
                  key={index}
                  className={`
                    p-2 md:p-3 text-center rounded-lg transition-all duration-200 border-2 min-h-[50px] md:min-h-[60px] flex flex-col justify-center items-center
                    ${
                      !isAvailable || !isInCurrentMonth
                        ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
                        : isSelected
                          ? "border-primary-600 bg-primary-600 text-white shadow-md cursor-pointer"
                          : "border-gray-200 hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 cursor-pointer touch-manipulation"
                    }
                    ${isHighDemand && !isSelected && isAvailable && isInCurrentMonth ? "bg-red-50 border-red-200" : ""}
                  `}
                  onClick={() => {
                    if (isAvailable && isInCurrentMonth) {
                      handleDateSelect(dateStr)
                    }
                  }}
                >
                  <div
                    className={`font-semibold text-sm md:text-base ${
                      isSelected ? "text-white" : !isAvailable || !isInCurrentMonth ? "text-gray-300" : "text-gray-900"
                    }`}
                  >
                    {date.getDate()}
                  </div>
                  {isHighDemand && isAvailable && isInCurrentMonth && !isSelected && (
                    <div className="text-xs text-red-600">⚡</div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-3 md:mt-4 text-xs md:text-sm text-red-600 flex items-center">
            <span className="mr-1">⚡</span>
            <span>Weekend dates may have higher demand and pricing</span>
          </div>
        </div>
      </div>

      {/* Time Preference Selection - Show after date is selected */}
      {showTimePreference && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500" data-question="time-preference">
          <h4 className="text-base md:text-lg font-semibold text-gray-900">What time?</h4>
          <p className="text-gray-600 text-sm md:text-base">Helpers should arrive between</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Morning Option */}
            <div
              className={`p-4 md:p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 touch-manipulation ${
                formData.timePreference === "morning"
                  ? "border-primary-600 bg-primary-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
              }`}
              onClick={() => handleTimePreferenceSelect("morning")}
            >
              <div className="text-center">
                <span className="font-semibold text-gray-900 text-sm md:text-base">8:00AM - 12:00PM</span>
                <p className="text-xs md:text-sm text-gray-600 mt-1">Morning</p>
              </div>
            </div>

            {/* Afternoon Option */}
            <div
              className={`p-4 md:p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 touch-manipulation ${
                formData.timePreference === "afternoon"
                  ? "border-primary-600 bg-primary-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
              }`}
              onClick={() => handleTimePreferenceSelect("afternoon")}
            >
              <div className="text-center">
                <span className="font-semibold text-gray-900 text-sm md:text-base">1:00PM - 5:00PM</span>
                <p className="text-xs md:text-sm text-gray-600 mt-1">Afternoon</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 flex items-center bg-red-50 p-3 rounded-lg border border-red-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {/* Navigation Buttons - Show only when all questions are answered */}
      {showContinueButton && (
        <div
          className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 pt-4 animate-in slide-in-from-bottom-4 duration-500"
          data-question="continue-button"
        >
          <Button
            type="button"
            variant="outline"
            onClick={goToPreviousStep}
            className="w-full md:flex-1 py-4 md:py-6 text-sm md:text-base border-2 hover:bg-gray-50 transition-all duration-200 text-gray-700 border-gray-300"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={handleContinue}
            className="w-full md:flex-1 bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white py-4 md:py-6 text-sm md:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  )
}

export default DateTimeStep
