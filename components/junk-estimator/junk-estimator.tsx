"use client"

import { useState } from "react"
import { OrderSummary } from "@/components/junk-estimator/order-summary"
import { ServiceFeatures } from "@/components/junk-estimator/service-features"
import { SearchBar } from "@/components/junk-estimator/search-bar"
import { Button } from "@/components/ui/button"
import { junkItems } from "@/components/junk-estimator/junk-items-data"
import { ChevronDown } from "lucide-react"
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
  const [currentStep, setCurrentStep] = useState<"selection" | "summary" | "booking">("selection")
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

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Added Item Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
        {addedNotifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-500 ease-out animate-in slide-in-from-right-5 fade-in"
            style={{
              animation: "slideInFadeOut 2s ease-out forwards",
            }}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            opacity: 0;
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
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {currentStep === "selection" && (
          <>
            <div className="flex items-center mb-6">
              <div className="bg-primary-50 p-2 rounded-lg mr-3 border border-primary-100">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 !text-gray-900">
                Please select your items for removal
              </h1>
            </div>

            <div className="mb-6">
              <h3 className="text-sm sm:text-base font-medium text-gray-800 !text-gray-800 mb-2">
                Don't See Your Item?
              </h3>
              <SearchBar onSearch={handleSearch} onItemSelect={addItem} IconComponent={JunkItemIcon} />

              {searchQuery && (
                <div className="mt-4">
                  {displayItems.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                      {displayItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => addItem(item)}
                          className={`flex flex-col items-center justify-center p-3 sm:p-4 border rounded-lg transition-all duration-200 h-24 sm:h-36 ${
                            recentlyAdded.includes(item.id)
                              ? "border-red-400 bg-red-50 scale-105"
                              : "border-gray-200 hover:border-primary-300 hover:bg-primary-50"
                          }`}
                        >
                          <JunkItemIcon itemId={item.id} className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-2" />
                          <span className="text-xs sm:text-sm !text-gray-900 text-center uppercase leading-tight font-medium">
                            {item.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-600 !text-gray-600">
                      No items found. Please try another search term.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
              {displayItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className={`flex flex-col items-center justify-center p-3 sm:p-4 border rounded-lg transition-all duration-200 h-24 sm:h-36 shadow-xl bg-transparent ${
                    recentlyAdded.includes(item.id)
                      ? "border-red-400 bg-red-50 scale-105"
                      : "border-gray-200 bg-slate-50 hover:border-primary-300 hover:bg-primary-50"
                  }`}
                >
                  <JunkItemIcon itemId={item.id} className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-2" />
                  <span className="text-xs sm:text-sm !text-gray-900 text-center uppercase leading-tight font-medium">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>

            {!showAllItems && !searchQuery && (
              <button
                onClick={() => setShowAllItems(true)}
                className="flex items-center justify-center w-full py-2 text-sm sm:text-base text-primary-600 hover:text-primary-700 font-medium border border-primary-100 rounded-lg hover:bg-primary-50"
              >
                Show More Items
                <ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            )}

            {selectedItems.length > 0 && (
              <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-4 sm:pt-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 !text-gray-800 mb-3 sm:mb-4">My Items</h2>
                <div className="space-y-3 sm:space-y-4">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                          <JunkItemIcon itemId={item.id} className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-900 !text-gray-900 truncate">
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

            <div className="mt-8 flex justify-end">
              <Button
                className="px-8 py-6 text-base sm:text-lg font-medium border border-primary-600"
                disabled={selectedItems.length === 0}
                onClick={() => setCurrentStep("summary")}
              >
                NEXT
              </Button>
            </div>
          </>
        )}

        {currentStep === "summary" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Order Summary</h1>
              <button
                onClick={() => setCurrentStep("selection")}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                ← Back to Items
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-gray-900">Selected Items:</h3>
              {selectedItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="text-gray-900">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between items-center font-bold text-lg">
                <span className="text-gray-900">Total:</span>
                <span className="text-primary-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="px-8 py-6 text-base sm:text-lg font-medium" onClick={() => setCurrentStep("booking")}>
                Book Appointment
              </Button>
            </div>
          </div>
        )}

        {currentStep === "booking" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Book Your Appointment</h1>
              <button
                onClick={() => setCurrentStep("summary")}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                ← Back to Summary
              </button>
            </div>

            <form className="space-y-6">
              {/* Address Section */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
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
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
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
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
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

              <div className="flex justify-end">
                <Button type="submit" className="px-8 py-6 text-base sm:text-lg font-medium">
                  Confirm Booking - ${totalPrice.toFixed(2)}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="lg:w-96">
        <OrderSummary selectedItems={selectedItems} totalPrice={totalPrice} />
        <div className="mt-6">
          <ServiceFeatures />
        </div>
      </div>
    </div>
  )
}
