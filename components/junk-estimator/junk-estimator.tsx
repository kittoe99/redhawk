"use client"

import { useState, useEffect } from "react"
import { OrderSummary } from "@/components/junk-estimator/order-summary"
import { SearchBar } from "@/components/junk-estimator/search-bar"
import { Button } from "@/components/ui/button"
import { junkItems } from "@/components/junk-estimator/junk-items-data"
import { ChevronDown, Search, Plus, MapPin } from "lucide-react"
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

export function JunkEstimator() {
  // State management
  const [currentStep, setCurrentStep] = useState<"zipcode" | "selection" | "summary" | "booking">("zipcode")
  const [zipCode, setZipCode] = useState("")
  const [isZipValid, setIsZipValid] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
  const [recentlyAdded, setRecentlyAdded] = useState<string[]>([])
  const [addedNotifications, setAddedNotifications] = useState<Array<{id: string, name: string, timestamp: number}>>([])
  const [totalPrice, setTotalPrice] = useState(0)
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

  useEffect(() => {
    const total = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    setTotalPrice(total)
  }, [selectedItems])

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

  const popularItems = filteredJunkItems.slice(0, 6)

  const displayItems = searchQuery
    ? junkItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredJunkItems

  // Add item to selection  
  const addItem = (item: any) => {
    const existingItem = selectedItems.find((i) => i.id === item.id)

    if (existingItem) {
      setSelectedItems(selectedItems.map((i) => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ))
    } else {
      const newItem = { ...item, quantity: 1 }
      setSelectedItems([...selectedItems, newItem])
      
      // Add to recently added for animation
      setRecentlyAdded(prev => [...prev, item.id])
      setTimeout(() => {
        setRecentlyAdded(prev => prev.filter(id => id !== item.id))
      }, 2000)
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

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Handle ZIP code form submission
  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (zipCode.trim().length >= 5) {
      setCurrentStep("selection")
    }
  }

  // ZIP code validation
  const validateZipCode = (zip: string) => {
    const zipRegex = /^\d{5}(-\d{4})?$/
    return zipRegex.test(zip)
  }

  // Handle ZIP code input change
  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5)
    setZipCode(value)
    setIsZipValid(validateZipCode(value))
  }

  // ZIP code step component
  const renderZipCodeStep = () => (
    <div className="max-w-lg mx-auto bg-white rounded-xl p-8 shadow-sm border border-gray-200">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your ZIP Code</h2>
        <p className="text-gray-600 mb-6">We'll check service availability in your area</p>
        
        <form onSubmit={handleZipSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={zipCode}
              onChange={handleZipChange}
              placeholder="Enter ZIP Code"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              maxLength={5}
              inputMode="numeric"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={!isZipValid}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
              isZipValid 
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-md'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Check Availability
          </button>
        </form>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-500 mr-2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-500 mr-2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>No Obligation</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Render the ZIP code step if it's the current step
  const renderStep = () => {
    switch (currentStep) {
      case "zipcode":
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
            {renderZipCodeStep()}
          </div>
        )
      case "selection":
        return (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Added Item Notifications */}
            <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
              {addedNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse"
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium">{notification.name} added!</span>
                  </div>
                </div>
              ))}
            </div>

            <style jsx>{`
              @keyframes slideInFadeOut {
                0% {
                  transform: translateX(100%) scale(0.8);
                }
                15% {
                  transform: translateX(0) scale(1);
                  opacity: 1;
                }
                85% {
                  transform: translateX(0) scale(1);
                  opacity: 1;
                }
                100% {
                  transform: translateX(100%) scale(0.8);
                  opacity: 0;
                }
              }
            `}</style>

            <div className="lg:w-2/3">
              <div className="mb-6">
                <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-2">
                  Don't See Your Item?
                </h3>
                <SearchBar onSearch={handleSearch} onItemSelect={addItem} IconComponent={JunkItemIcon} />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
                {displayItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addItem(item)}
                    className={`flex flex-col items-center justify-center p-3 sm:p-4 border rounded-lg transition-all duration-200 h-24 sm:h-36 bg-white ${
                      recentlyAdded.includes(item.id)
                        ? "border-red-400 scale-105"
                        : "border-gray-200 hover:border-primary-300"
                    }`}
                  >
                    <JunkItemIcon itemId={item.id} className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-2" />
                    <span className="text-xs sm:text-sm text-gray-900 text-center uppercase leading-tight font-medium">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>

              {selectedItems.length > 0 && (
                <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-4 sm:pt-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">My Items</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-white rounded-lg p-2 sm:p-3 border border-gray-200"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                            <JunkItemIcon itemId={item.id} className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center bg-white rounded-lg p-0.5 border border-gray-200 shadow-sm mr-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-300 transition-all duration-200 active:scale-95"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <div className="mx-1 sm:mx-2 min-w-[1.5rem] text-center">
                              <span className="text-sm sm:text-base font-semibold text-gray-900 bg-gray-50 px-1 sm:px-2 py-0.5 rounded-md border border-gray-200">
                                {item.quantity}
                              </span>
                            </div>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-300 transition-all duration-200 active:scale-95"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200 active:scale-95 touch-manipulation"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step Navigation */}
              <div className="mt-6 flex justify-between">
                {selectedItems.length > 0 && (
                  <Button 
                    onClick={() => setCurrentStep("summary")}
                    className="px-8 py-3 text-base font-medium"
                  >
                    Next: Review Order
                  </Button>
                )}
              </div>

            </div>

            <div className="lg:w-96">
              <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Serving {zipCode}</span> - We service your area!
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      All pricing includes labor, truck, and disposal fees.
                    </p>
                  </div>
                </div>
              </div>
              <OrderSummary selectedItems={selectedItems} totalPrice={totalPrice} />
            </div>
          </div>
        )
      case "summary":
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <OrderSummary selectedItems={selectedItems} totalPrice={totalPrice} />
              <div className="mt-6 flex justify-between">
                <Button onClick={() => setCurrentStep("selection")} variant="outline">
                  Back to Items
                </Button>
                <Button onClick={() => setCurrentStep("booking")}>
                  Book Service - ${totalPrice.toFixed(2)}
                </Button>
              </div>
            </div>
          </div>
        )
      case "booking":
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Book Your Service</h2>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <form onSubmit={(e) => {
                e.preventDefault()
                alert('Booking submitted! We will contact you soon.')
              }}>
              {/* Address Section */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-4 mb-6">
                <h3 className="font-semibold text-gray-800">Service Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      value={bookingData.address}
                      onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={bookingData.city}
                      onChange={(e) => setBookingData({ ...bookingData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                      placeholder="Phoenix"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <select
                      value={bookingData.state}
                      onChange={(e) => setBookingData({ ...bookingData, state: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                      required
                    >
                      <option value="">Select State</option>
                      <option value="AZ">Arizona</option>
                      <option value="TX">Texas</option>
                      <option value="CO">Colorado</option>
                      <option value="FL">Florida</option>
                      <option value="NC">North Carolina</option>
                      <option value="TN">Tennessee</option>
                      <option value="ID">Idaho</option>
                      <option value="UT">Utah</option>
                      <option value="OH">Ohio</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Appointment Section */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-4 mb-6">
                <h3 className="font-semibold text-gray-800">Appointment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                    <input
                      type="date"
                      value={bookingData.appointmentDate}
                      onChange={(e) => setBookingData({ ...bookingData, appointmentDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                    <select
                      value={bookingData.timeSlot}
                      onChange={(e) => setBookingData({ ...bookingData, timeSlot: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                      required
                    >
                      <option value="">Select Time</option>
                      <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
                      <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                      <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
                      <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                      <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Personal Details Section */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-4 mb-6">
                <h3 className="font-semibold text-gray-800">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={bookingData.firstName}
                      onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={bookingData.lastName}
                      onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      value={bookingData.specialInstructions}
                      onChange={(e) => setBookingData({ ...bookingData, specialInstructions: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                      rows={3}
                      placeholder="Any special instructions or notes for our team..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button 
                  type="button"
                  onClick={() => setCurrentStep("summary")}
                  variant="outline"
                  className="px-6 py-3"
                >
                  Back to Summary
                </Button>
                <Button type="submit" className="px-8 py-6 text-base sm:text-lg font-medium">
                  Confirm Booking - ${totalPrice.toFixed(2)}
                </Button>
              </div>
              </form>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return renderStep()
}
