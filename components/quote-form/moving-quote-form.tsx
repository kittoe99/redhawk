"use client"

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react"
import { CheckIcon, MapPin, Truck, Users, Home, Calendar, ArrowRight, ArrowLeft } from "lucide-react"

interface FormData {
  zipCode: string
  serviceType: string
  vehicleType: string
  vehicleFee: number
  moversTruckHelpers: string
  laborOnlyHelpers: string
  bedrooms: string
  stairs: string
  movingDate: string
  timePreference: string
  fullName: string
  email: string
  phone: string
  originStreet: string
  originApt: string
  originCity: string
  originState: string
  destinationStreet: string
  destinationApt: string
  destinationCity: string
  destinationState: string
  destinationZip: string
  specialInstructions: string
}

interface QuoteDetails {
  hourlyRate: string
  estimatedTime: string
  teamSize: string | number
}

export function MovingQuoteForm() {
  // State for current step
  const [currentStep, setCurrentStep] = useState(1)
  const [currentSubStep, setCurrentSubStep] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Form validation states
  const [zipError, setZipError] = useState("")
  const [dateError, setDateError] = useState("")

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    zipCode: "",
    serviceType: "",
    vehicleType: "",
    vehicleFee: 0,
    moversTruckHelpers: "2",
    laborOnlyHelpers: "2",
    bedrooms: "",
    stairs: "no",
    movingDate: "",
    timePreference: "",
    fullName: "",
    email: "",
    phone: "",
    originStreet: "",
    originApt: "",
    originCity: "",
    originState: "",
    destinationStreet: "",
    destinationApt: "",
    destinationCity: "",
    destinationState: "",
    destinationZip: "",
    specialInstructions: "",
  })

  // Pricing configuration
  const pricing = {
    movers_truck: {
      cargo_van: { 1: 59.5, 2: 119.0 },
      box_truck: { 1: 79.5, 2: 159.0 },
    },
    labor_only: { 1: 69.0, 2: 119.0 },
  }
  const vehicleFees = { cargo_van: 69, box_truck: 149 }

  // Date constraints for the date picker
  const [dateConstraints, setDateConstraints] = useState({
    min: "",
    max: "",
  })

  // Set up date constraints on component mount
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const maxDate = new Date(today)
    maxDate.setMonth(today.getMonth() + 3)

    setDateConstraints({
      min: tomorrow.toISOString().split("T")[0],
      max: maxDate.toISOString().split("T")[0],
    })
  }, [])

  // Validation functions
  const isStep1Valid = () => /^\d{5}$/.test(formData.zipCode)
  const isStep2Valid = () => {
    if (formData.serviceType === "movers_truck") {
      return formData.vehicleType && formData.moversTruckHelpers
    } else if (formData.serviceType === "labor_only") {
      return formData.laborOnlyHelpers
    }
    return false
  }
  const isStep3Valid = () => formData.bedrooms
  const isStep4Valid = () => formData.movingDate && formData.timePreference

  // Handle zip code change
  const handleZipCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value.trim()
    const isValid = /^\d{5}$/.test(zip)

    setZipError("")
    if (zip.length > 0 && !isValid) {
      setZipError("Please enter a valid 5-digit US zip code.")
    }

    setFormData({ ...formData, zipCode: zip })
  }

  // Handle service type change
  const handleServiceTypeChange = (serviceType: string) => {
    const updatedFormData = { ...formData, serviceType, vehicleFee: 0 }

    if (serviceType === "movers_truck") {
      updatedFormData.laborOnlyHelpers = ""
    } else if (serviceType === "labor_only") {
      updatedFormData.vehicleType = ""
      updatedFormData.moversTruckHelpers = ""
    }

    setFormData(updatedFormData)
  }

  // Handle vehicle type change
  const handleVehicleTypeChange = (vehicleType: string) => {
    const vehicleFee = vehicleFees[vehicleType as keyof typeof vehicleFees] || 0
    setFormData({ ...formData, vehicleType, vehicleFee })
  }

  // Handle helpers change
  const handleHelpersChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  // Handle bedrooms change
  const handleBedroomsChange = (bedrooms: string) => {
    setFormData({ ...formData, bedrooms })
  }

  // Handle stairs change
  const handleStairsChange = (stairs: string) => {
    setFormData({ ...formData, stairs })
  }

  // Handle date change
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const movingDate = e.target.value

    setDateError("")
    if (movingDate) {
      const selectedDate = new Date(movingDate)
      const minDate = dateConstraints.min ? new Date(dateConstraints.min) : null
      const maxDate = dateConstraints.max ? new Date(dateConstraints.max) : null

      if (minDate && maxDate && (selectedDate < minDate || selectedDate > maxDate)) {
        setDateError("Date must be between tomorrow and 3 months from now.")
      }
    }

    setFormData({ ...formData, movingDate })
  }

  // Handle time preference change
  const handleTimePreferenceChange = (timePreference: string) => {
    setFormData({ ...formData, timePreference })
  }

  // Calculate quote details
  const calculateQuoteDetails = (): QuoteDetails => {
    let hourlyRate = 0
    let teamSize = 0
    let estimatedBaseTime = 2

    if (formData.serviceType === "movers_truck" && formData.vehicleType && formData.moversTruckHelpers) {
      teamSize = Number.parseInt(formData.moversTruckHelpers)
      hourlyRate =
        pricing.movers_truck[formData.vehicleType as keyof typeof pricing.movers_truck]?.[
          teamSize as keyof typeof pricing.movers_truck.cargo_van
        ] || 0

      if (formData.vehicleType === "cargo_van") estimatedBaseTime = 2
      else if (formData.vehicleType === "box_truck") estimatedBaseTime = 3.5
    } else if (formData.serviceType === "labor_only" && formData.laborOnlyHelpers) {
      teamSize = Number.parseInt(formData.laborOnlyHelpers)
      hourlyRate = pricing.labor_only[teamSize as keyof typeof pricing.labor_only] || 0
      estimatedBaseTime = 2.5
    }

    const numBedrooms = Number.parseInt(formData.bedrooms)
    if (!isNaN(numBedrooms) && numBedrooms > 1) estimatedBaseTime += (numBedrooms - 1) * 0.75
    else if (formData.bedrooms === "5+") estimatedBaseTime += (5 - 1) * 0.75 + 1

    if (formData.stairs === "yes") estimatedBaseTime += 1

    return {
      hourlyRate: hourlyRate.toFixed(2),
      estimatedTime: Math.max(2, estimatedBaseTime).toFixed(1),
      teamSize: teamSize || "N/A",
    }
  }

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const requiredFields = [
      formData.zipCode,
      formData.serviceType,
      formData.bedrooms,
      formData.movingDate,
      formData.timePreference,
      formData.fullName,
      formData.email,
      formData.phone,
      formData.originStreet,
      formData.originCity,
      formData.originState,
    ]

    if (formData.serviceType === "movers_truck" && (!formData.vehicleType || !formData.moversTruckHelpers)) {
      alert("Vehicle type and helper count are required for Movers + Truck service.")
      return
    }

    if (formData.serviceType === "labor_only" && !formData.laborOnlyHelpers) {
      alert("Helper count is required for Labor Only service.")
      return
    }

    if (requiredFields.some((field) => !field)) {
      alert("Please fill in all required fields.")
      return
    }

    console.log("Form Submitted!", formData)
    setFormSubmitted(true)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const quoteDetails = calculateQuoteDetails()

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3, 4, 5].map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step <= currentStep ? "bg-primary-600 text-white shadow-lg" : "bg-gray-200 text-gray-500"
              }`}
            >
              {step < currentStep ? <CheckIcon className="w-5 h-5" /> : step}
            </div>
            {index < 4 && (
              <div
                className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                  step < currentStep ? "bg-primary-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )

  // If form is submitted, show confirmation
  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-2">Thank you for choosing us, {formData.fullName || "Customer"}.</p>
          <p className="text-gray-600">
            We will contact you shortly at {formData.email || "your email"} to finalize the details for your move on{" "}
            {formatDate(formData.movingDate)}.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Get Your Moving Quote</h1>
          <p className="text-gray-600">Quick and easy - get an instant estimate for your move</p>
        </div>

        <ProgressIndicator />

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Zip Code */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Where are you moving from?</h2>
                  <p className="text-gray-600">Enter your zip code to check service availability</p>
                </div>

                <div className="max-w-xs mx-auto">
                  <input
                    type="text"
                    placeholder="Enter zip code"
                    maxLength={5}
                    className="w-full p-4 text-center text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    value={formData.zipCode}
                    onChange={handleZipCodeChange}
                  />
                  {zipError && <p className="text-red-500 text-sm mt-2 text-center">{zipError}</p>}
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    disabled={!isStep1Valid()}
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Service Type */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">What service do you need?</h2>
                  <p className="text-gray-600">Choose the option that best fits your move</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.serviceType === "movers_truck"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleServiceTypeChange("movers_truck")}
                  >
                    <div className="text-center">
                      <Truck className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                      <h3 className="font-semibold mb-2">Movers + Truck</h3>
                      <p className="text-sm text-gray-600">Full-service moving with our truck</p>
                    </div>
                  </div>

                  <div
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.serviceType === "labor_only"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleServiceTypeChange("labor_only")}
                  >
                    <div className="text-center">
                      <Users className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                      <h3 className="font-semibold mb-2">Labor Only</h3>
                      <p className="text-sm text-gray-600">Just the movers, you provide transport</p>
                    </div>
                  </div>
                </div>

                {/* Vehicle Type Selection for Movers + Truck */}
                {formData.serviceType === "movers_truck" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-center">Choose your vehicle size</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.vehicleType === "cargo_van"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleVehicleTypeChange("cargo_van")}
                      >
                        <div className="text-center">
                          <h4 className="font-semibold mb-1">Cargo Van</h4>
                          <p className="text-sm text-gray-600 mb-2">10-12 ft • Studio/1BR</p>
                          <p className="text-blue-600 font-bold">$119/hr (2 helpers)</p>
                          <p className="text-xs text-gray-500">+$69 vehicle fee</p>
                        </div>
                      </div>

                      <div
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.vehicleType === "box_truck"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleVehicleTypeChange("box_truck")}
                      >
                        <div className="text-center">
                          <h4 className="font-semibold mb-1">Box Truck</h4>
                          <p className="text-sm text-gray-600 mb-2">15-17 ft • 2-3BR</p>
                          <p className="text-blue-600 font-bold">$159/hr (2 helpers)</p>
                          <p className="text-xs text-gray-500">+$149 vehicle fee</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="font-semibold mb-3">Number of helpers</h4>
                      <div className="flex justify-center gap-4">
                        <button
                          type="button"
                          className={`px-6 py-3 rounded-xl border-2 transition-all ${
                            formData.moversTruckHelpers === "1"
                              ? "border-blue-500 bg-blue-50 text-blue-600"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => handleHelpersChange("moversTruckHelpers", "1")}
                        >
                          1 Helper
                        </button>
                        <button
                          type="button"
                          className={`px-6 py-3 rounded-xl border-2 transition-all ${
                            formData.moversTruckHelpers === "2"
                              ? "border-blue-500 bg-blue-50 text-blue-600"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => handleHelpersChange("moversTruckHelpers", "2")}
                        >
                          2 Helpers
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Helper Selection for Labor Only */}
                {formData.serviceType === "labor_only" && (
                  <div className="text-center">
                    <h4 className="font-semibold mb-3">Number of helpers</h4>
                    <div className="flex justify-center gap-4">
                      <button
                        type="button"
                        className={`px-6 py-3 rounded-xl border-2 transition-all ${
                          formData.laborOnlyHelpers === "1"
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleHelpersChange("laborOnlyHelpers", "1")}
                      >
                        <div>
                          <div className="font-semibold">1 Helper</div>
                          <div className="text-sm text-blue-600">$69/hr</div>
                        </div>
                      </button>
                      <button
                        type="button"
                        className={`px-6 py-3 rounded-xl border-2 transition-all ${
                          formData.laborOnlyHelpers === "2"
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleHelpersChange("laborOnlyHelpers", "2")}
                      >
                        <div>
                          <div className="font-semibold">2 Helpers</div>
                          <div className="text-sm text-blue-600">$119/hr</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center"
                    onClick={() => setCurrentStep(1)}
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    disabled={!isStep2Valid()}
                    onClick={() => setCurrentStep(3)}
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Property Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Tell us about your property</h2>
                  <p className="text-gray-600">This helps us provide an accurate estimate</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-center">Number of bedrooms</h3>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {["1", "2", "3", "4", "5+"].map((bedroom) => (
                        <button
                          key={bedroom}
                          type="button"
                          className={`p-4 border-2 rounded-xl transition-all ${
                            formData.bedrooms === bedroom
                              ? "border-blue-500 bg-blue-50 text-blue-600"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => handleBedroomsChange(bedroom)}
                        >
                          <div className="text-center">
                            <div className="font-semibold">{bedroom}</div>
                            <div className="text-xs text-gray-500">{bedroom === "1" ? "BR" : "BRs"}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-center">Are there stairs involved?</h3>
                    <div className="flex justify-center gap-4">
                      <button
                        type="button"
                        className={`px-8 py-3 border-2 rounded-xl transition-all ${
                          formData.stairs === "yes"
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleStairsChange("yes")}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`px-8 py-3 border-2 rounded-xl transition-all ${
                          formData.stairs === "no"
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleStairsChange("no")}
                      >
                        No
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">Stairs add approximately 1 hour</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center"
                    onClick={() => setCurrentStep(2)}
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    disabled={!isStep3Valid()}
                    onClick={() => setCurrentStep(4)}
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Schedule */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">When would you like to move?</h2>
                  <p className="text-gray-600">Choose your preferred date and time</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block font-semibold mb-2">Preferred moving date</label>
                    <input
                      type="date"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      min={dateConstraints.min}
                      max={dateConstraints.max}
                      value={formData.movingDate}
                      onChange={handleDateChange}
                    />
                    {dateError && <p className="text-red-500 text-sm mt-1">{dateError}</p>}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-center">Preferred time</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { value: "Morning (8AM-11AM)", label: "Morning", time: "8AM-11AM", icon: "🌅" },
                        { value: "Afternoon (12PM-3PM)", label: "Afternoon", time: "12PM-3PM", icon: "☀️" },
                        { value: "Evening (4PM-7PM)", label: "Evening", time: "4PM-7PM", icon: "🌆" },
                      ].map((timeSlot) => (
                        <button
                          key={timeSlot.value}
                          type="button"
                          className={`p-4 border-2 rounded-xl transition-all ${
                            formData.timePreference === timeSlot.value
                              ? "border-blue-500 bg-blue-50 text-blue-600"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => handleTimePreferenceChange(timeSlot.value)}
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-1">{timeSlot.icon}</div>
                            <div className="font-semibold">{timeSlot.label}</div>
                            <div className="text-xs text-gray-500">{timeSlot.time}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center"
                    onClick={() => setCurrentStep(3)}
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    disabled={!isStep4Valid()}
                    onClick={() => setCurrentStep(5)}
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Contact Information & Summary */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Almost done!</h2>
                  <p className="text-gray-600">Review your quote and provide your contact information</p>
                </div>

                {/* Quote Summary */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-semibold mb-4 text-blue-800">Your Quote Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span>{formData.serviceType === "movers_truck" ? "Movers + Truck" : "Labor Only"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property:</span>
                      <span>
                        {formData.bedrooms} bedroom{formData.bedrooms !== "1" && "s"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span>{formatDate(formData.movingDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span>{formData.timePreference}</span>
                    </div>
                    <hr className="border-blue-200" />
                    <div className="flex justify-between text-lg font-semibold text-blue-600">
                      <span>Estimated Rate:</span>
                      <span>${quoteDetails.hourlyRate}/hour</span>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Origin Address</label>
                    <input
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="123 Main St"
                      value={formData.originStreet}
                      onChange={(e) => setFormData({ ...formData, originStreet: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Phoenix"
                      value={formData.originCity}
                      onChange={(e) => setFormData({ ...formData, originCity: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="AZ"
                      value={formData.originState}
                      onChange={(e) => setFormData({ ...formData, originState: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center"
                    onClick={() => setCurrentStep(4)}
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center"
                  >
                    Get My Quote
                    <CheckIcon className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
