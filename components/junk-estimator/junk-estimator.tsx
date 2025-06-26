"use client"

"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, ChevronDown, MapPin, Shield, ArrowRight, Plus, Minus, X, Calendar, Clock, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

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
    <div className="w-full max-w-md mx-auto p-6 sm:p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-4 shadow-md">
          <MapPin className="w-7 h-7 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Where's your junk located?
        </h2>
        <p className="text-gray-600 text-base">
          Enter your ZIP code to check availability and get an instant estimate
        </p>
      </div>

      {/* ZIP Code Input */}
      <div className="mb-8">
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={zipCode}
              onChange={(e) => onZipCodeChange(e.target.value)}
              placeholder="e.g. 12345"
              className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200 text-center font-medium text-gray-900 placeholder-gray-400 shadow-sm"
              maxLength={10}
              autoComplete="postal-code"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            {zipCode && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {isValidZip ? (
                  <CheckCircle className="w-6 h-6 text-green-500" strokeWidth={2} />
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                )}
              </div>
            )}
          </div>
          {zipCode && !isValidZip && (
            <p className="text-red-500 text-sm mt-2 text-center">Please enter a valid 5-digit ZIP code</p>
          )}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-gray-600">
        <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
          <Shield className="w-5 h-5 text-green-500 mb-1.5" strokeWidth={2} />
          <span className="text-center">Free, No-Obligation Estimate</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-blue-500 mb-1.5" strokeWidth={2} />
          <span className="text-center">Secure & Confidential</span>
        </div>
      </div>

      {/* Continue Button */}
      <Button
        onClick={onSubmit}
        disabled={!isValidZip}
        className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-200 ${
          isValidZip 
            ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        Continue to Estimator
        <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2} />
      </Button>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>We service all major cities in the US</p>
      </div>
    </div>
  )
}

export function JunkEstimator() {
  type Step = "zip_code" | "selection" | "summary" | "booking" | "thank_you"
  const [currentStep, setCurrentStep] = useState<Step>("zip_code")
  const [zipCode, setZipCode] = useState("")
  const [isValidZip, setIsValidZip] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: zipCode,
    preferredDate: "",
    timeWindow: "",
    specialInstructions: ""
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

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
      setFormData((prev) => ({ ...prev, zipCode: value }))
    }
  }

  const handleZipCodeSubmit = () => {
    if (isValidZip) {
      setCurrentStep("selection")
    }
  }

  const addItem = (item: JunkItem) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    // Show notification
    const notification = {
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      timestamp: Date.now(),
    };
    setAddedNotifications((prev) => [...prev, notification]);

    // Remove notification after animation
    setTimeout(() => {
      setAddedNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    }, 2000);

    // Add brief scale animation to clicked item
    setRecentlyAdded((prev) => [...prev, item.id]);
    setTimeout(() => {
      setRecentlyAdded((prev) => prev.filter((id) => id !== item.id));
    }, 300);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setSelectedItems((prev) => 
      prev.map((item) => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Calculate total price
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const errors: Record<string, string> = {}
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'preferredDate']
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = 'This field is required'
      }
    })

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message
      toast({
        title: "Booking Confirmed!",
        description: "We've received your booking request. Our team will contact you shortly to confirm the details.",
      })
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: zipCode,
        preferredDate: "",
        timeWindow: "",
        specialInstructions: ""
      })
      
      // Go to thank you page
      setCurrentStep("thank_you")
      
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was an error submitting your booking. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <div className="bg-white p-6 md:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left column - Item selection */}
              <div className="lg:col-span-8 space-y-8">
                <div className="text-center">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    What would you like to remove?
                  </h1>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Select the items you need removed to get an instant estimate. We'll help you dispose of them responsibly.
                  </p>
                </div>

                <div className="bg-gray-50 p-1 rounded-xl">
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
                </div>

                {/* Popular Items Section */}
                {!searchQuery && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                        <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded-full mr-2">POPULAR</span>
                        Frequently Removed Items
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {popularItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() =>
                            addItem({
                              id: item.id,
                              name: item.name,
                              quantity: 1,
                              price: item.price,
                              icon: item.icon,
                            })
                          }
                          className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-primary-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300"
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="relative">
                              <div className="absolute inset-0 bg-primary-50 rounded-lg group-hover:bg-primary-100/50 transition-colors duration-200"></div>
                              <div className="relative z-10 p-3 mb-3 bg-white rounded-lg border border-gray-100 group-hover:bg-white/90 transition-colors duration-200">
                                <JunkItemIcon itemId={item.id} className="w-8 h-8 text-primary-600" />
                              </div>
                            </div>
                            <h3 className="font-medium text-sm text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2 h-10 flex items-center justify-center">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-primary-600 font-semibold text-sm bg-primary-50 px-2 py-1 rounded-full">
                              ${item.price}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Items Section */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {searchQuery ? `Search Results (${displayItems.length})` : "All Items"}
                    </h2>
                    {!searchQuery && !showAllItems && (
                      <button
                        onClick={() => setShowAllItems(true)}
                        className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1.5 group"
                      >
                        Show All
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                      </button>
                    )}
                  </div>

                  {displayItems.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {displayItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() =>
                            addItem({
                              id: item.id,
                              name: item.name,
                              quantity: 1,
                              price: item.price,
                              icon: item.icon,
                            })
                          }
                          className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-primary-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300"
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gray-50 rounded-lg group-hover:bg-primary-50/50 transition-colors duration-200"></div>
                              <div className="relative z-10 p-3 mb-3 bg-white rounded-lg border border-gray-100 group-hover:bg-white/90 transition-colors duration-200">
                                <JunkItemIcon itemId={item.id} className="w-8 h-8 text-gray-700 group-hover:text-primary-600 transition-colors" />
                              </div>
                            </div>
                            <h3 className="font-medium text-sm text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2 h-10 flex items-center justify-center">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-primary-600 font-semibold text-sm bg-gray-50 group-hover:bg-primary-50 px-2 py-1 rounded-full transition-colors duration-200">
                              ${item.price}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-xl">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No items found</h3>
                      <p className="text-gray-500 max-w-xs mx-auto">Try a different search term or browse our categories</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right column - Order summary */}
              <div className="lg:col-span-4">
                <div className="sticky top-6 space-y-6">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-25 rounded-2xl p-6 border border-primary-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Estimate</h2>
                    <OrderSummary
                      selectedItems={selectedItems}
                      totalPrice={totalPrice}
                    />
                    {selectedItems.length > 0 && (
                      <div className="mt-6 space-y-3">
                        {selectedItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                              <div className="w-8 h-8 flex items-center justify-center bg-primary-50 rounded-lg mr-3">
                                <JunkItemIcon itemId={item.id} className="w-5 h-5 text-primary-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-500">${item.price} each</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(item.id, item.quantity - 1);
                                  }}
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-800 border-x border-gray-100">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(item.id, item.quantity + 1);
                                  }}
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeItem(item.id);
                                }}
                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                        <Button
                          onClick={() => setCurrentStep("summary")}
                          className="w-full mt-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                          Continue to Booking - ${totalPrice.toFixed(2)}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "summary":
        return (
          <div className="bg-white p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Selected Items</h3>
                <div className="space-y-3">
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-primary-50 rounded-lg mr-3">
                          <JunkItemIcon itemId={item.id} className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("selection")}
                  className="px-6 py-3"
                >
                  Back to Selection
                </Button>
                <Button
                  onClick={() => setCurrentStep("booking")}
                  className="bg-primary-600 hover:bg-primary-700 px-6 py-3"
                >
                  Proceed to Booking
                </Button>
              </div>
            </div>
          </div>
        )
      case "booking":
        return (
          <div className="bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Book Your Junk Removal
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Complete your booking details and our team will contact you shortly</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Left Column - Booking Form */}
                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-8">
                      <div className="w-1.5 h-8 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3"></div>
                      <h3 className="text-2xl font-bold text-gray-900">Service Details</h3>
                    </div>
                    
                    <div className="space-y-8">
                      {/* Contact Information */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                          <div className="relative">
                            <Input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="John"
                              className="w-full px-4 pl-12 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                              required
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            {formErrors.firstName && (
                              <p className="text-red-500 text-sm mt-2">{formErrors.firstName}</p>
                            )}
                          </div>
                        </div>
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                          <div className="relative">
                            <Input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Doe"
                              className="w-full px-4 pl-12 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                              required
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            {formErrors.lastName && (
                              <p className="text-red-500 text-sm mt-2">{formErrors.lastName}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                          <div className="relative">
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your@email.com"
                              className="w-full px-4 pl-12 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                              required
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                            </div>
                            {formErrors.email && (
                              <p className="text-red-500 text-sm mt-2">{formErrors.email}</p>
                            )}
                          </div>
                        </div>
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                          <div className="relative">
                            <Input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="(555) 123-4567"
                              className="w-full px-4 pl-12 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                              required
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                            </div>
                            {formErrors.phone && (
                              <p className="text-red-500 text-sm mt-2">{formErrors.phone}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Service Address */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          Service Address
                        </h4>
                        <div className="relative">
                          <Input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter street address"
                            className="w-full px-4 pl-12 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                            required
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          {formErrors.address && (
                            <p className="text-red-500 text-sm mt-2">{formErrors.address}</p>
                          )}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="relative">
                            <Input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="City"
                              className="w-full px-4 pl-12 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                              required
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            {formErrors.city && (
                              <p className="text-red-500 text-sm mt-2">{formErrors.city}</p>
                            )}
                          </div>
                          <div>
                            <select 
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white text-gray-700"
                              required
                            >
                              <option value="">Select State</option>
                              <option value="CA">California</option>
                              <option value="NY">New York</option>
                              <option value="TX">Texas</option>
                            </select>
                            {formErrors.state && (
                              <p className="text-red-500 text-sm mt-2">{formErrors.state}</p>
                            )}
                          </div>
                          <div className="relative">
                            <Input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              placeholder="ZIP Code"
                              className="w-full px-4 pl-12 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                              required
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            {formErrors.zipCode && (
                              <p className="text-red-500 text-sm mt-2">{formErrors.zipCode}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Preferred Date & Time */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                          <Input
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors"
                          />
                          {formErrors.preferredDate && (
                            <p className="text-red-500 text-sm mt-2">{formErrors.preferredDate}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                          <select 
                            name="timeWindow"
                            value={formData.timeWindow}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors bg-white"
                          >
                            <option value="">Select time</option>
                            <option value="morning">Morning (8AM - 12PM)</option>
                            <option value="afternoon">Afternoon (12PM - 4PM)</option>
                            <option value="evening">Evening (4PM - 8PM)</option>
                          </select>
                        </div>
                      </div>

                      {/* Special Instructions */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                        <textarea
                          name="specialInstructions"
                          value={formData.specialInstructions}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Any special instructions or access notes..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-25 rounded-2xl p-6 border border-primary-100 sticky top-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                    
                    {/* Items List */}
                    <div className="space-y-3 mb-6">
                      {selectedItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
                          <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center bg-primary-50 rounded-lg mr-3">
                              <JunkItemIcon itemId={item.id} className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{item.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total Estimate:</span>
                        <span className="text-primary-600">${totalPrice.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Final price determined on-site</p>
                    </div>

                    {/* Trust Indicators */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Shield className="w-4 h-4 text-green-500 mr-2" />
                        <span>Licensed & Insured</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Same-Day Service Available</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Eco-Friendly Disposal</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-md"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            Book Now - ${totalPrice.toFixed(2)}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep("summary")}
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-xl transition-colors"
                      >
                        Back to Summary
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "thank_you":
        return (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Booking!</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              We've received your booking request. Our team will contact you shortly to confirm the details.
            </p>
            <Button
              onClick={() => {
                setCurrentStep("zip_code")
                setSelectedItems([])
              }}
              className="bg-primary-600 hover:bg-primary-700 px-8 py-3 text-base font-medium"
            >
              Start New Estimate
            </Button>
          </div>
        )  
      default:
        return (
          <ZipCodeStep
            zipCode={zipCode}
            isValidZip={isValidZip}
            onZipCodeChange={handleZipCodeChange}
            onSubmit={handleZipCodeSubmit}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress indicator */}
      {currentStep !== "zip_code" ? (
        <div className="bg-white border-b border-gray-200 py-3 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <span className="text-primary-600 font-semibold">ZIP: {zipCode}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-800">Junk Removal Estimator</span>
              </div>
              <button 
                onClick={() => setCurrentStep("zip_code")}
                className="text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
              >
                Change ZIP
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Step content */}
      <div className="container mx-auto px-4 py-8">
        {renderStep()}
      </div>

      {/* Added item notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {addedNotifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-xl shadow-lg animate-in slide-in-from-right-5 fade-in-0 duration-300 flex items-center backdrop-blur-sm"
          >
            <div className="bg-white/20 p-1.5 rounded-full mr-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-medium">{notification.name} added</p>
              <p className="text-xs opacity-90">Added to your estimate</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
