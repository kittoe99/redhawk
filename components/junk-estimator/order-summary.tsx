"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { SelectedItem } from "./junk-estimator"

interface OrderSummaryProps {
  selectedItems: SelectedItem[]
  totalPrice: number
}

export function OrderSummary({ selectedItems, totalPrice }: OrderSummaryProps) {
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(true)
  const finalPrice = totalPrice

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 !text-gray-900 mb-4 sm:mb-6">Order Summary</h2>

      <div className="border p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border-red-50 bg-red-50">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-800 !text-gray-800">Guaranteed Price*</span>
          <span className="text-xl sm:text-2xl font-bold !text-gray-900 text-black">${finalPrice.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
        className="text-primary-600 hover:text-primary-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6 block"
      >
        {showPriceBreakdown ? "Hide" : "View"} Pricing Breakdown
      </button>

      {showPriceBreakdown && (
        <div className="border-t border-gray-100 pt-3 sm:pt-4 mb-4 sm:mb-6 space-y-1 sm:space-y-2 text-xs sm:text-sm">
          {selectedItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span className="text-gray-700 !text-gray-700">
                {item.name} x{item.quantity}
              </span>
              <span className="text-gray-900 !text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

<div className="flex justify-between font-medium pt-2 border-t border-gray-100">
            <span>Total</span>
            <span>${finalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}

    </div>
  )
}
