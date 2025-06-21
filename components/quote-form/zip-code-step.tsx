"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"
import type { QuoteFormData } from "./quote-form"
import { motion } from "framer-motion"

interface ZipCodeStepProps {
  zipCode: string
  onNext: (data: Partial<QuoteFormData>) => void
}

export function ZipCodeStep({ zipCode, onNext }: ZipCodeStepProps) {
  const [value, setValue] = useState(zipCode)
  const [error, setError] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isValid, setIsValid] = useState(false)

  // Check if zip code is valid
  useEffect(() => {
    setIsValid(/^\d{5}(-\d{4})?$/.test(value))
  }, [value])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation for US zip codes
    if (!isValid) {
      setError("Please enter a valid 5-digit zip code")
      return
    }

    onNext({ zipCode: value })
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
        <h3 className="text-2xl font-bold text-gray-900">Where are you moving?</h3>
        <p className="text-gray-600">Enter your zip code so we can check if we service your area</p>
      </motion.div>

      <motion.div className="relative w-full mx-auto" variants={itemVariants}>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <MapPin className="h-6 w-6" />
        </div>
        <Input
          type="text"
          placeholder="Enter zip code"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError("")
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`pl-14 w-full text-lg py-6 h-auto rounded-xl ${
            isFocused
              ? "border-primary-500 ring-2 ring-primary-100"
              : error
                ? "border-red-300 ring-2 ring-red-100"
                : "border-gray-200 hover:border-gray-300"
          } text-gray-900`}
          maxLength={10}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
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
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button
          type="submit"
          className={`w-full py-6 h-auto text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
            isValid
              ? "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isValid}
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>

      <motion.div className="text-center text-sm text-gray-500" variants={itemVariants}>
        We service most areas in Phoenix and surrounding cities
      </motion.div>
    </motion.form>
  )
}
