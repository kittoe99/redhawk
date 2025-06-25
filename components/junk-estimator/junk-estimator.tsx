"use client"

import { useState } from "react"
import { OrderSummary } from "@/components/junk-estimator/order-summary"
import { ServiceFeatures } from "@/components/junk-estimator/service-features"
import { SearchBar } from "@/components/junk-estimator/search-bar"
import { Button } from "@/components/ui/button"
import { junkItems } from "@/components/junk-estimator/junk-items-data"
import { ChevronDown, MapPin, Shield, CheckCircle, ArrowRight } from "lucide-react"
import Image from "next/image"

export type SelectedItem = {
  id: string
  name: string
  quantity: number
  price: number
  icon: string
}

// Icon component for junk items
function JunkItemIcon({ itemId, className = "w-8 h-8" }: { itemId: string; className?: string }) {
  // Map item IDs to their corresponding icon images
  const iconMap: Record<string, string> = {
    bicycle: "/icons/bicycle.png",
    bag_of_junk: "/icons/bag-of-junk.png",
    box_spring: "/icons/box-spring.png",
    bookshelf: "/icons/bookshelf.png",
    chair: "/icons/chair.png",
    couch: "/icons/couch.png",
    grill: "/icons/grill.png",
    dresser: "/icons/dresser.png",
    desk: "/icons/desk.png",
    dishwasher: "/icons/dishwasher.png",
    lawnmower: "/icons/lawnmower.png",
    mattress: "/icons/mattress.png",
    recliner: "/icons/recliner.png",
    table: "/icons/table.png",
    refrigerator: "/icons/refrigerator.png",
    treadmill: "/icons/treadmill.png", // Updated path
    tv: "/icons/television.png",
    washer_dryer: "/icons/washer-dryer.png",
    exercise_machine: "/icons/Exercise-machine.png",
    hot_tub: "/icons/hot-tub.png",
    large_item: "/icons/large-item.png",
    small_item: "/icons/small-item.png",
    medium_item: "/icons/medium-item.png",
    debris: "/icons/debris.png",
    electronic_unlisted: "/icons/electronic.png",
    sleeper_sofa: "/icons/sleeper-sofa.png",
    sectional_2_piece: "/icons/sectional-2-piece.png",
    sectional_3_piece: "/icons/sectional-3-piece.png",
    range: "/icons/range.png",
    ac_unit: "/icons/AC-unit.png",
    trampoline: "/icons/trampoline.png",
  }

  // If we have a matching icon, use it
  if (iconMap[itemId]) {
    return (
      <div className={className}>
        <Image
          src={iconMap[itemId] || "/placeholder.svg"}
          alt={itemId}
          width={32}
          height={32}
          className="w-full h-full object-contain"
        />
      </div>
    )
  }

  // For items without a specific icon, use the SVG fallback
  const iconColor = "#f87171" // Red-400 for lighter primary color
  const secondaryColor = "#fca5a5" // Red-300 for even lighter secondary
  const accentColor = "#dc2626" // Red-600 for small details

  switch (itemId) {
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="5" y="5" width="14" height="14" rx="2" fill={iconColor} stroke={accentColor} strokeWidth="0.5" />
          <rect x="7" y="7" width="10" height="10" rx="1" fill={secondaryColor} />
          <circle cx="12" cy="12" r="2" fill="white" opacity="0.6" />
        </svg>
      )
  }
}

// ZIP Code Step Component - moved outside to prevent re-rendering
function ZipCodeStep({ 
  zipCode, 
  isValidZip, 
  onZipCodeChange, 
  onSubmit 
}: { 
  zipCode: string; 
  isValidZip: boolean; 
  onZipCodeChange: (value: string) => void; 
  onSubmit: () => void; 
}) {
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-3 shadow-md">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Enter ZIP Code
        </h2>
        <p className="text-gray-500 text-sm">
          Check junk removal service availability in your area
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-gray-600">
        <div className="flex items-center">
          <Shield className="w-4 h-4 text-green-500 mr-1.5" />
          <span>Free Estimate</span>
        </div>
        <div className="flex items-center">
          <CheckCircle className="w-4 h-4 text-blue-500 mr-1.5" />
          <span>Secure</span>
        </div>
      </div>

      {/* ZIP Code Input */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={zipCode}
            onChange={(e) => onZipCodeChange(e.target.value)}
            placeholder="Enter your ZIP code"
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 text-center font-medium text-gray-900 placeholder-gray-500"
            maxLength={10}
          />
          {zipCode && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isValidZip ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 border-2 border-red-300 rounded-full"></div>
              )}
            </div>
          )}
        </div>
        {zipCode && !isValidZip && (
          <p className="text-red-500 text-sm mt-2 text-center">Please enter a valid ZIP code</p>
        )}
      </div>

      {/* Continue Button */}
      <Button
        onClick={onSubmit}
        disabled={!isValidZip}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Estimator
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  )
}

export function JunkEstimator() {
  const [currentStep, setCurrentStep] = useState<"zip_code" | "selection" | "summary" | "booking">("zip_code")
  const [zipCode, setZipCode] = useState("")
  const [isValidZip, setIsValidZip] = useState(false)
  const [bookingData, setBookingData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    appointmentDate: "",
    timeSlot: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialInstructions: "",
  })
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showAllItems, setShowAllItems] = useState(false)
  const [recentlyAdded, setRecentlyAdded] = useState<string[]>([])
  const [addedNotifications, setAddedNotifications] = useState<{ id: string; name: string; timestamp: number }[]>([])

  const filteredJunkItems = junkItems
    .filter((item) => item.id !== "washing_machine" && item.id !== "dryer" && item.id !== "tire")
    .concat([
      {
        id: "washer_dryer",
        name: "Washer/Dryer",
        price: 180,
        icon: "🧺",
        popular: false,
      },
    ])

  const popularItems = filteredJunkItems.filter((item) => item.popular)
  const displayItems = searchQuery
    ? filteredJunkItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : showAllItems
      ? filteredJunkItems
      : popularItems

  const validateZipCode = (zip: string) => {
    const zipRegex = /^\d{5}(-\d{4})?$/
    return zipRegex.test(zip)
  }

  const handleZipCodeChange = (value: string) => {
    setZipCode(value)
    const isValid = validateZipCode(value)
    setIsValidZip(isValid)
    if (isValid) {
      setBookingData((prev) => ({ ...prev, zipCode: value }))
    }
  }

  const handleZipCodeSubmit = () => {
    if (isValidZip) {
      setCurrentStep("selection")
    }
  }

  const addItem = (item: SelectedItem) => {
    const existingItem = selectedItems.find((i) => i.id === item.id)

    if (existingItem) {
      setSelectedItems(selectedItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)))
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
    }

    // Add notification
    const notification = {
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      timestamp: Date.now(),
    }
    setAddedNotifications((prev) => [...prev, notification])

    // Remove notification after animation
    setTimeout(() => {
      setAddedNotifications((prev) => prev.filter((n) => n.id !== notification.id))
    }, 2000)

    // Add brief scale animation to clicked item
    setRecentlyAdded((prev) => [...prev, item.id])
    setTimeout(() => {
      setRecentlyAdded((prev) => prev.filter((id) => id !== item.id))
    }, 300)
  }

  const removeItem = (itemId: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }

    setSelectedItems(selectedItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Render the appropriate step
  const renderStep = () => {
    switch (currentStep) {
      case "zip_code":
        return (
          <ZipCodeStep 
            zipCode={zipCode}
            isValidZip={isValidZip}
            onZipCodeChange={handleZipCodeChange}
            onSubmit={handleZipCodeSubmit}
          />
        )
      case "selection":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left column - Item selection */}
            <div className="lg:col-span-2 space-y-6">
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Junk Removal Estimator
                </h1>
                <p className="text-gray-600 mb-6">
                  Select the items you need removed to get an instant estimate
                </p>
              </div>

              <SearchBar 
                onSearch={setSearchQuery} 
                onItemSelect={(item) => addItem({
                  id: item.id,
                  name: item.name,
                  quantity: 1,
                  price: item.price,
                  icon: item.icon,
                })} 
                IconComponent={JunkItemIcon} 
              />

              {/* Popular Items Section */}
              {!searchQuery && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    🔥 Popular Items
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {popularItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary-300 group"
                        onClick={() =>
                          addItem({
                            id: item.id,
                            name: item.name,
                            quantity: 1,
                            price: item.price,
                            icon: item.icon,
                          })
                        }
                      >
                        <div className="flex flex-col items-center text-center">
                          <JunkItemIcon itemId={item.id} className="w-8 h-8 mb-2" />
                          <h3 className="font-medium text-sm text-gray-800 mb-1 group-hover:text-primary-600 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-primary-600 font-semibold text-sm">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Items Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {searchQuery ? `Search Results (${displayItems.length})` : "All Items"}
                  </h2>
                  {!searchQuery && !showAllItems && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAllItems(true)}
                      className="flex items-center gap-2"
                    >
                      Show All <ChevronDown className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {displayItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary-300 group relative"
                      onClick={() =>
                        addItem({
                          id: item.id,
                          name: item.name,
                          quantity: 1,
                          price: item.price,
                          icon: item.icon,
                        })
                      }
                    >
                      <div className="flex flex-col items-center text-center">
                        <JunkItemIcon itemId={item.id} className="w-8 h-8 mb-2" />
                        <h3 className="font-medium text-sm text-gray-800 mb-1 group-hover:text-primary-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-primary-600 font-semibold text-sm">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ServiceFeatures />
            </div>

            {/* Right column - Order summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <OrderSummary
                  selectedItems={selectedItems}
                  totalPrice={totalPrice}
                />
                {selectedItems.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{item.name} x{item.quantity}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center bg-red-100 text-red-600 rounded hover:bg-red-200"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-600 rounded hover:bg-green-200"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 text-sm hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={() => setCurrentStep("booking")}
                      className="w-full mt-4 bg-primary-600 hover:bg-primary-700"
                    >
                      Book Service - ${totalPrice.toFixed(2)}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      case "summary":
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            {/* Summary content */}
          </div>
        )
      case "booking":
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Book Your Service</h2>
            {/* Booking form content */}
          </div>
        )
      default:
        return <ZipCodeStep 
          zipCode={zipCode}
          isValidZip={isValidZip}
          onZipCodeChange={handleZipCodeChange}
          onSubmit={handleZipCodeSubmit}
        />
    }
  }

  return (
    <div className="min-h-screen bg-white" style={{ backgroundColor: '#ffffff' }}>
      {/* Progress indicator */}
      {currentStep !== "zip_code" && (
        <div className="bg-white border-b border-gray-200 py-4" style={{ backgroundColor: '#ffffff' }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <span className="text-primary-600 font-medium">ZIP: {zipCode}</span>
              <span>•</span>
              <span>Junk Removal Estimator</span>
            </div>
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="container mx-auto px-4 py-8 bg-white" style={{ backgroundColor: '#ffffff' }}>
        {renderStep()}
      </div>

      {/* Added item notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {addedNotifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-right-5 fade-in-0 duration-300"
          >
            ✓ {notification.name} added!
          </div>
        ))}
      </div>
    </div>
  )
}
