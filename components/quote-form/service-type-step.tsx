"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Truck, Users, Check } from "lucide-react"
import type { QuoteFormData } from "./quote-form"
import { HawkIcon } from "./hawk-icon"
import { motion } from "framer-motion"

interface ServiceTypeStepProps {
  serviceType: string
  numberOfMovers: 2 | 3 | null
  needsOneHelper?: boolean
  onNext: (data: Partial<QuoteFormData>) => void
  onBack: () => void
}

export function ServiceTypeStep({
  serviceType,
  numberOfMovers,
  needsOneHelper = false,
  onNext,
  onBack,
}: ServiceTypeStepProps) {
  const [selectedService, setSelectedService] = useState(serviceType)
  const [selectedMovers, setSelectedMovers] = useState<2 | 3 | null>(numberOfMovers)
  const [error, setError] = useState("")
  const [onlyNeedOneHelper, setOnlyNeedOneHelper] = useState(needsOneHelper)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedService) {
      setError("Please select a service type")
      return
    }

    if (selectedService === "movers-truck" && !selectedMovers) {
      setError("Please select a vehicle type")
      return
    }

    onNext({
      serviceType: selectedService as "movers-truck" | "labor-only",
      numberOfMovers: selectedMovers || 2, // Default to 2 movers if not selected
      needsOneHelper: onlyNeedOneHelper,
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="space-y-3" variants={itemVariants}>
        <h3 className="text-2xl font-bold text-gray-900">Select Your Service</h3>
        <p className="text-gray-600">Choose the type of service you need</p>
      </motion.div>

      {/* Service Type Selection */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <label className="text-sm font-medium text-gray-700">Service Type</label>
        <div className="grid grid-cols-1 gap-4">
          <motion.button
            type="button"
            className={`flex items-center p-5 border-2 rounded-xl transition-all duration-300 ${
              selectedService === "movers-truck"
                ? "border-primary-600 bg-primary-50 shadow-lg"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => {
              setSelectedService("movers-truck")
              setError("")
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`p-4 rounded-full mr-4 transition-all duration-300 ${
                selectedService === "movers-truck" ? "bg-primary-100" : "bg-gray-100"
              }`}
            >
              <Truck
                className={`h-7 w-7 transition-colors duration-300 ${selectedService === "movers-truck" ? "text-primary-600" : "text-gray-500"}`}
              />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-lg">Movers + Truck</div>
              <div className="text-sm text-gray-500">Full-service moving with our truck</div>
            </div>
            {selectedService === "movers-truck" && (
              <div className="text-primary-600">
                <motion.div
                  animate={{ rotate: [0, 15, 0, -15, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                >
                  <HawkIcon width={28} height={28} />
                </motion.div>
              </div>
            )}
          </motion.button>

          <motion.button
            type="button"
            className={`flex items-center p-5 border-2 rounded-xl transition-all duration-300 ${
              selectedService === "labor-only"
                ? "border-primary-600 bg-primary-50 shadow-lg"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => {
              setSelectedService("labor-only")
              setSelectedMovers(2) // Default to 2 movers for labor-only
              setError("")
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`p-4 rounded-full mr-4 transition-all duration-300 ${selectedService === "labor-only" ? "bg-primary-100" : "bg-gray-100"}`}
            >
              <Users
                className={`h-7 w-7 transition-colors duration-300 ${selectedService === "labor-only" ? "text-primary-600" : "text-gray-500"}`}
              />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-lg">Labor Only</div>
              <div className="text-sm text-gray-500">Just the movers, no truck</div>
            </div>
            {selectedService === "labor-only" && (
              <div className="text-primary-600">
                <motion.div
                  animate={{ rotate: [0, 15, 0, -15, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                >
                  <HawkIcon width={28} height={28} />
                </motion.div>
              </div>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Vehicle Type Selection - Only show when Movers + Truck is selected */}
      {selectedService === "movers-truck" && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Vehicle Type</label>
            <span className="text-xs text-gray-500">Select the best option for your move</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              type="button"
              className={`relative flex flex-col p-5 border-2 rounded-xl transition-all duration-300 overflow-hidden ${
                selectedMovers === 2
                  ? "border-primary-600 bg-primary-50 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => {
                setSelectedMovers(2)
                setError("")
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute top-0 right-0 bg-primary-100 px-3 py-1 rounded-bl-lg text-xs font-medium text-primary-800">
                MOST POPULAR
              </div>

              <div className="flex items-center w-full mt-4">
                <div className="p-3 rounded-full mr-4 bg-primary-100">
                  <Truck className={`h-6 w-6 ${selectedMovers === 2 ? "text-primary-600" : "text-gray-500"}`} />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-lg">Cargo Van</div>
                  <div className="text-sm text-gray-500">10-12 ft loading space</div>
                </div>
              </div>

              <div className="mt-4 space-y-2 w-full">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Hourly Rate:</span>
                  <span className="text-primary-600 font-bold text-lg">
                    {onlyNeedOneHelper ? "$59.50/hour" : "$119/hour"}
                  </span>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-md p-2 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-amber-700 mr-1" />
                    <span className="text-amber-800">
                      {onlyNeedOneHelper ? "Includes 1 helper" : "Includes 2 helpers"}
                    </span>
                  </div>
                </div>

                <ul className="text-xs text-gray-600 space-y-1 mt-2">
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-1" />
                    <span>Perfect for studio/1BR apartments</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-1" />
                    <span>Fits 10-15 medium boxes + furniture</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-1" />
                    <span>Easier parking in urban areas</span>
                  </li>
                </ul>
              </div>
            </motion.button>

            <motion.button
              type="button"
              className={`relative flex flex-col p-5 border-2 rounded-xl transition-all duration-300 overflow-hidden ${
                selectedMovers === 3
                  ? "border-primary-600 bg-primary-50 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => {
                setSelectedMovers(3)
                setError("")
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute top-0 right-0 bg-blue-100 px-3 py-1 rounded-bl-lg text-xs font-medium text-blue-800">
                LARGER MOVES
              </div>

              <div className="flex items-center w-full mt-4">
                <div className="p-3 rounded-full mr-4 bg-primary-100">
                  <Truck className={`h-6 w-6 ${selectedMovers === 3 ? "text-primary-600" : "text-gray-500"}`} />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-lg">Box Truck</div>
                  <div className="text-sm text-gray-500">15-17 ft loading space</div>
                </div>
              </div>

              <div className="mt-4 space-y-2 w-full">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Hourly Rate:</span>
                  <span className="text-primary-600 font-bold text-lg">
                    {onlyNeedOneHelper ? "$79.50/hour" : "$159/hour"}
                  </span>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-md p-2 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-amber-700 mr-1" />
                    <span className="text-amber-800">
                      {onlyNeedOneHelper ? "Includes 1 helper" : "Includes 2 helpers"}
                    </span>
                  </div>
                </div>

                <ul className="text-xs text-gray-600 space-y-1 mt-2">
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-1" />
                    <span>Ideal for 2-3BR homes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-1" />
                    <span>Fits 20-30 boxes + larger furniture</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 text-green-500 mr-1" />
                    <span>Better for long-distance moves</span>
                  </li>
                </ul>
              </div>
            </motion.button>
          </div>

          <div className="text-xs text-gray-500 italic mt-1">
            *Prices may vary based on distance and specific requirements
          </div>
        </motion.div>
      )}

      {/* Helper Checkbox - Only show after vehicle selection for Movers + Truck */}
      {selectedService === "movers-truck" && selectedMovers && (
        <motion.div
          className="space-y-2 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              onlyNeedOneHelper ? "border-primary-600 bg-primary-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setOnlyNeedOneHelper(!onlyNeedOneHelper)}
          >
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                onlyNeedOneHelper ? "bg-primary-600 border-primary-600" : "border-gray-300"
              }`}
            >
              {onlyNeedOneHelper && <Check className="h-3 w-3 text-white" />}
            </div>
            <div className="flex-1">
              <span className="font-medium">I Only Need 1 Helper</span>
              <div className="mt-2 bg-amber-50 border border-amber-200 rounded-md p-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-amber-800">Standard Price:</span>
                  <span className="font-medium text-gray-700">${selectedMovers === 2 ? "119" : "159"}/hour</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-amber-800">With 1 Helper:</span>
                  <span className="font-bold text-primary-600">${selectedMovers === 2 ? "59.50" : "79.50"}/hour</span>
                </div>
                <p className="text-xs text-amber-700 mt-1">Perfect for smaller moves or when you'll be helping too.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Helper Selection for Labor Only */}
      {selectedService === "labor-only" && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}
        >
          <label className="text-sm font-medium text-gray-700">Number of Helpers</label>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              type="button"
              className={`flex flex-col items-center p-5 border-2 rounded-xl transition-all duration-300 ${
                onlyNeedOneHelper
                  ? "border-primary-600 bg-primary-50 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => {
                setOnlyNeedOneHelper(true)
                setError("")
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium text-lg mb-1">1 Helper</div>
              <div className="text-primary-600 font-bold">$69/hour</div>
            </motion.button>

            <motion.button
              type="button"
              className={`flex flex-col items-center p-5 border-2 rounded-xl transition-all duration-300 ${
                !onlyNeedOneHelper
                  ? "border-primary-600 bg-primary-50 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => {
                setOnlyNeedOneHelper(false)
                setError("")
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium text-lg mb-1">2 Helpers</div>
              <div className="text-primary-600 font-bold">$119/hour</div>
            </motion.button>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.p
          className="text-sm text-red-600 flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </motion.p>
      )}

      <motion.div className="flex space-x-4" variants={itemVariants}>
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 py-6 h-auto text-base border-2 hover:bg-gray-50 transition-all duration-300"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedService || (selectedService === "movers-truck" && !selectedMovers)}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white py-6 h-auto text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
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
      </motion.div>
    </motion.form>
  )
}
