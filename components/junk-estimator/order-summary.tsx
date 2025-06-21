"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { SelectedItem } from "./junk-estimator"

interface OrderSummaryProps {
  selectedItems: SelectedItem[]
  totalPrice: number
}

export function OrderSummary({ selectedItems, totalPrice }: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)

  const handleApplyPromo = () => {
    // In a real app, you would validate the promo code with an API
    if (promoCode.toLowerCase() === "redhawk10") {
      setDiscount(totalPrice * 0.1)
    } else {
      setDiscount(0)
      alert("Invalid promo code")
    }
  }

  const finalPrice = Math.max(0, totalPrice - discount)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 !text-gray-900 mb-4 sm:mb-6">Order Summary</h2>

      <div className="border p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border-red-50 bg-red-50">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-800 !text-gray-800">Guaranteed Price*</span>
          <span className="text-xl sm:text-2xl font-bold !text-gray-900 text-black">${finalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex space-x-2 mb-3 sm:mb-4">
        <Input
          type="text"
          placeholder="Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="flex-1 border-gray-200"
        />
        <Button
          onClick={handleApplyPromo}
          variant="outline"
          className="bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100"
        >
          APPLY
        </Button>
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

          {discount > 0 && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>Promo Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between font-medium pt-2 border-t border-gray-100">
            <span>Total</span>
            <span>${finalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}

      <Button className="w-full">Save This Quote</Button>
    </div>
  )
}
