"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"

const ExtrasStep: React.FC = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useQuoteWizard()

  const handleAppliancesToggle = (hasAppliances: boolean) => {
    updateFormData({ hasAppliances })
  }

  const handleDamageProtectionSelect = (level: "1000" | "2500" | "5000" | "10000") => {
    updateFormData({ damageProtection: level })
  }

  const handleContinue = () => {
    goToNextStep()
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900">Moving Extras</h3>
        <p className="text-gray-600">Add protection and specify any special items</p>
      </div>

      {/* Appliances Question */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">
          Do you have any appliances or exercise equipment that you need moved?
        </h4>
        <p className="text-gray-600">
          Flat rate moves include items like beds, dressers, and couches, but some exceptionally heavy items like
          exercise equipment and appliances cost a bit more.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* No Option */}
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              formData.hasAppliances === false
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleAppliancesToggle(false)}
          >
            <div className="flex items-center justify-center">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 ${
                  formData.hasAppliances === false ? "border-primary-600 bg-primary-600" : "border-gray-400"
                }`}
              >
                {formData.hasAppliances === false && <div className="w-2 h-2 rounded-full bg-white"></div>}
              </div>
              <span className="font-medium text-gray-900">No</span>
            </div>
          </div>

          {/* Yes Option */}
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              formData.hasAppliances === true
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleAppliancesToggle(true)}
          >
            <div className="flex items-center justify-center">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 ${
                  formData.hasAppliances === true ? "border-primary-600 bg-primary-600" : "border-gray-400"
                }`}
              >
                {formData.hasAppliances === true && <div className="w-2 h-2 rounded-full bg-white"></div>}
              </div>
              <span className="font-medium text-gray-900">Yes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Damage Protection */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">INCREASE DAMAGE PROTECTION</h4>

        <div className="space-y-3">
          {/* $1,000 Protection */}
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              formData.damageProtection === "1000"
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleDamageProtectionSelect("1000")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                    formData.damageProtection === "1000" ? "border-primary-600 bg-primary-600" : "border-gray-400"
                  }`}
                >
                  {formData.damageProtection === "1000" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span className="font-medium text-gray-900">$1,000 of protection</span>
              </div>
              <span className="text-gray-600 font-medium">Included</span>
            </div>
          </div>

          {/* $2,500 Protection */}
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              formData.damageProtection === "2500"
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleDamageProtectionSelect("2500")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                    formData.damageProtection === "2500" ? "border-primary-600 bg-primary-600" : "border-gray-400"
                  }`}
                >
                  {formData.damageProtection === "2500" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span className="font-medium text-gray-900">$2,500 of protection</span>
              </div>
              <span className="text-red-600 font-medium">+$25</span>
            </div>
          </div>

          {/* $5,000 Protection */}
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              formData.damageProtection === "5000"
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleDamageProtectionSelect("5000")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                    formData.damageProtection === "5000" ? "border-primary-600 bg-primary-600" : "border-gray-400"
                  }`}
                >
                  {formData.damageProtection === "5000" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span className="font-medium text-gray-900">$5,000 of protection</span>
              </div>
              <span className="text-red-600 font-medium">+$50</span>
            </div>
          </div>

          {/* $10,000 Protection */}
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              formData.damageProtection === "10000"
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleDamageProtectionSelect("10000")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                    formData.damageProtection === "10000" ? "border-primary-600 bg-primary-600" : "border-gray-400"
                  }`}
                >
                  {formData.damageProtection === "10000" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span className="font-medium text-gray-900">$10,000 of protection</span>
              </div>
              <span className="text-red-600 font-medium">+$100</span>
            </div>
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
          onClick={handleContinue}
          className="flex-1 bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default ExtrasStep
