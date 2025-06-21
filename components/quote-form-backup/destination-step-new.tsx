"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"

interface Coordinates {
  lat: number
  lng: number
}

type StepPhase = "pickup" | "destination" | "map"

const DestinationStep: React.FC = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useQuoteWizard()
  const [error, setError] = useState<string>("")
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  const [currentPhase, setCurrentPhase] = useState<StepPhase>("pickup")
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([])
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([])
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)
  const [isValidatingPickup, setIsValidatingPickup] = useState(false)
  const [isValidatingDestination, setIsValidatingDestination] = useState(false)

  const [pickupCoords, setPickupCoords] = useState<Coordinates | null>(null)
  const [destinationCoords, setDestinationCoords] = useState<Coordinates | null>(null)
  const [userState, setUserState] = useState<string>("")

  const [tempPickupAddress, setTempPickupAddress] = useState<string>("")
  const [tempDestinationAddress, setTempDestinationAddress] = useState<string>("")

  const [pickupUnit, setPickupUnit] = useState<string>("")
  const [destinationUnit, setDestinationUnit] = useState<string>("")
  const [showPickupUnit, setShowPickupUnit] = useState(false)
  const [showDestinationUnit, setShowDestinationUnit] = useState(false)

  // Add useEffect to detect user location
  useEffect(() => {
    const detectUserLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        if (data.region) {
          setUserState(data.region)
        }
      } catch (error) {
        console.error("Location detection error:", error)
        if (formData.zipCode) {
          const coords = await getCoordinates(formData.zipCode)
          if (coords) {
            const zipResponse = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&countrycodes=us&q=${encodeURIComponent(formData.zipCode)}`,
            )
            const zipData = await zipResponse.json()
            if (zipData.length > 0 && zipData[0].address?.state) {
              setUserState(zipData[0].address.state)
            }
          }
        }
      }
    }

    detectUserLocation()
  }, [formData.zipCode])

  // Initialize map when reaching map phase
  useEffect(() => {
    if (currentPhase === "map") {
      initMap()
    }
  }, [currentPhase])

  // Update map when coordinates change
  useEffect(() => {
    if (currentPhase === "map") {
      updateMapView()
    }
  }, [pickupCoords, destinationCoords, currentPhase])

  const initMap = async () => {
    if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
      const L = (await import("leaflet")).default

      mapInstanceRef.current = L.map(mapRef.current).setView([39.8283, -98.5795], 3)

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(mapInstanceRef.current)

      updateMapView()
    }
  }

  const getCoordinates = async (address: string): Promise<Coordinates | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&q=${encodeURIComponent(address)}`,
      )
      const data = await response.json()

      if (data.length > 0) {
        return {
          lat: Number.parseFloat(data[0].lat),
          lng: Number.parseFloat(data[0].lon),
        }
      }
      return null
    } catch (error) {
      console.error("Geocoding error:", error)
      return null
    }
  }

  const getRoute = async (start: Coordinates, end: Coordinates): Promise<Coordinates[]> => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`,
      )
      const data = await response.json()

      if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry.coordinates.map((coord: number[]) => ({
          lat: coord[1],
          lng: coord[0],
        }))
      }
      return []
    } catch (error) {
      console.error("Routing error:", error)
      return []
    }
  }

  const updateMapView = async () => {
    if (!mapInstanceRef.current) return

    const L = (await import("leaflet")).default

    mapInstanceRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapInstanceRef.current.removeLayer(layer)
      }
    })

    const markers: any[] = []

    if (pickupCoords) {
      const pickupIcon = L.divIcon({
        html: `<div style="background-color: #dc2626; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">A</div>`,
        className: "custom-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const pickupMarker = L.marker([pickupCoords.lat, pickupCoords.lng], { icon: pickupIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup("Pickup Location")

      markers.push(pickupMarker)
    }

    if (destinationCoords) {
      const destinationIcon = L.divIcon({
        html: `<div style="background-color: #16a34a; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">B</div>`,
        className: "custom-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const destinationMarker = L.marker([destinationCoords.lat, destinationCoords.lng], { icon: destinationIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup("Destination Location")

      markers.push(destinationMarker)
    }

    if (pickupCoords && destinationCoords) {
      const routeCoords = await getRoute(pickupCoords, destinationCoords)
      if (routeCoords.length > 0) {
        const routeLine = L.polyline(
          routeCoords.map((coord) => [coord.lat, coord.lng]),
          {
            color: "#dc2626",
            weight: 3,
            opacity: 0.7,
          },
        ).addTo(mapInstanceRef.current)

        const group = L.featureGroup([...markers, routeLine])
        mapInstanceRef.current.fitBounds(group.getBounds(), { padding: [30, 30], maxZoom: 10 })
      } else {
        if (markers.length > 0) {
          const group = L.featureGroup(markers)
          mapInstanceRef.current.fitBounds(group.getBounds(), { padding: [50, 50] })
        }
      }
    } else if (markers.length > 0) {
      const group = L.featureGroup(markers)
      mapInstanceRef.current.fitBounds(group.getBounds(), { padding: [50, 50] })
    }
  }

  const searchAddresses = async (query: string): Promise<string[]> => {
    if (query.length < 3) return []

    try {
      let searchQuery = query

      const hasStateInQuery =
        /,\s*[A-Z]{2}\s*\d{5}?/.test(query) ||
        /,\s*[A-Za-z\s]+,\s*[A-Z]{2}/.test(query) ||
        /\b(Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming|AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\b/i.test(
          query,
        )

      if (!hasStateInQuery && userState) {
        searchQuery = `${query}, ${userState}`
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=8&countrycodes=us&q=${encodeURIComponent(searchQuery)}`,
      )
      const data = await response.json()

      let results = data
        .map((item: any) => item.display_name)
        .filter((address: string) => address.includes("United States"))

      if (results.length < 3 && userState && !hasStateInQuery) {
        const nationalResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=us&q=${encodeURIComponent(query)}`,
        )
        const nationalData = await nationalResponse.json()
        const nationalResults = nationalData
          .map((item: any) => item.display_name)
          .filter((address: string) => address.includes("United States"))

        results = [...results, ...nationalResults].slice(0, 8)
      }

      return results.slice(0, 5)
    } catch (error) {
      console.error("Address search error:", error)
      return []
    }
  }

  const validateAddress = async (address: string): Promise<boolean> => {
    if (!address || address.length < 10) return false

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&q=${encodeURIComponent(address)}`,
      )
      const data = await response.json()
      return data.length > 0
    } catch (error) {
      console.error("Address validation error:", error)
      return false
    }
  }

  const handlePickupAdd = async () => {
    if (!tempPickupAddress || tempPickupAddress.length < 10) {
      setError("Please enter a valid pickup address")
      return
    }

    setIsValidatingPickup(true)
    setError("")

    try {
      const suggestions = await searchAddresses(tempPickupAddress)
      if (suggestions.length === 0) {
        setError("No matching addresses found. Please try a different address.")
        setIsValidatingPickup(false)
        return
      }

      setPickupSuggestions(suggestions)
      setShowPickupSuggestions(true)
      setIsValidatingPickup(false)
    } catch (error) {
      setError("Error validating address. Please try again.")
      setIsValidatingPickup(false)
    }
  }

  const handleDestinationAdd = async () => {
    if (!tempDestinationAddress || tempDestinationAddress.length < 10) {
      setError("Please enter a valid destination address")
      return
    }

    setIsValidatingDestination(true)
    setError("")

    try {
      const suggestions = await searchAddresses(tempDestinationAddress)
      if (suggestions.length === 0) {
        setError("No matching addresses found. Please try a different address.")
        setIsValidatingDestination(false)
        return
      }

      setDestinationSuggestions(suggestions)
      setShowDestinationSuggestions(true)
      setIsValidatingDestination(false)
    } catch (error) {
      setError("Error validating address. Please try again.")
      setIsValidatingDestination(false)
    }
  }

  const selectPickupSuggestion = async (suggestion: string) => {
    updateFormData({ pickupAddress: suggestion })
    setShowPickupSuggestions(false)
    setShowPickupUnit(true) // Show unit input
    setError("")

    const coords = await getCoordinates(suggestion)
    if (coords) {
      setPickupCoords(coords)
    }
  }

  const selectDestinationSuggestion = async (suggestion: string) => {
    updateFormData({ destinationAddress: suggestion })
    setShowDestinationSuggestions(false)
    setShowDestinationUnit(true) // Show unit input
    setError("")

    const coords = await getCoordinates(suggestion)
    if (coords) {
      setDestinationCoords(coords)
    }
  }

  const handlePickupUnitConfirm = () => {
    const fullAddress = pickupUnit ? `${formData.pickupAddress}, Unit ${pickupUnit}` : formData.pickupAddress
    updateFormData({ pickupAddress: fullAddress })
    setCurrentPhase("destination")
  }

  const handleDestinationUnitConfirm = () => {
    const fullAddress = destinationUnit
      ? `${formData.destinationAddress}, Unit ${destinationUnit}`
      : formData.destinationAddress
    updateFormData({ destinationAddress: fullAddress })
    setCurrentPhase("map")
  }

  const handleSkipDestination = () => {
    updateFormData({
      destinationAddress: "",
      destinationCity: "",
      destinationState: "",
      destinationZip: "",
    })
    setCurrentPhase("map")
  }

  const handleContinue = () => {
    goToNextStep()
  }

  const handleBack = () => {
    if (currentPhase === "destination") {
      setCurrentPhase("pickup")
      updateFormData({ pickupAddress: "" })
      setPickupCoords(null)
    } else if (currentPhase === "map") {
      if (formData.destinationAddress) {
        setCurrentPhase("destination")
      } else {
        setCurrentPhase("pickup")
      }
    } else {
      goToPreviousStep()
    }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-2 md:space-y-3">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">Where to?</h3>
        <p className="text-sm md:text-base text-gray-600">
          {currentPhase === "pickup" && "First, let's confirm your pickup address."}
          {currentPhase === "destination" && "Now, where would you like us to deliver?"}
          {currentPhase === "map" && "Here's your route overview."}
        </p>
      </div>

      <div className="border-2 border-gray-200 rounded-lg p-3 md:p-6 space-y-4 md:space-y-6">
        {/* Pickup Address Phase */}
        {currentPhase === "pickup" && (
          <div className="space-y-4">
            {userState && (
              <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-md">
                📍 Showing addresses in {userState} first
              </div>
            )}

            <div className="relative">
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-2">
                Pick up address
              </label>
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    id="pickupLocation"
                    name="pickupAddress"
                    placeholder="123 Main Street, City, State 12345"
                    value={tempPickupAddress}
                    onChange={(e) => {
                      setTempPickupAddress(e.target.value)
                      setError("")
                    }}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="words"
                    spellCheck="false"
                    className="bg-white border-gray-300 focus:border-primary-500 focus:ring-primary-500 placeholder:text-gray-400 placeholder:font-normal text-base md:text-xl"
                  />
                  {!tempPickupAddress && (
                    <p className="text-xs text-gray-400 mt-1">Based on ZIP code: {formData.zipCode}</p>
                  )}
                </div>
                <Button
                  type="button"
                  onClick={handlePickupAdd}
                  disabled={isValidatingPickup || !tempPickupAddress}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 text-sm font-medium"
                >
                  {isValidatingPickup ? "..." : "Search"}
                </Button>
              </div>

              {/* Pickup Address Suggestions */}
              {showPickupSuggestions && pickupSuggestions.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Select the best match:</p>
                  <div className="space-y-2">
                    {pickupSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-900"
                        onClick={() => selectPickupSuggestion(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Unit/Apt Number Input for Pickup */}
            {showPickupUnit && (
              <div className="mt-4 space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-800 mb-2">Selected Address:</p>
                  <p className="text-sm text-blue-700">{formData.pickupAddress}</p>
                </div>
                <div>
                  <label htmlFor="pickupUnit" className="block text-sm font-medium text-gray-700 mb-2">
                    Unit or Apt # (Optional)
                  </label>
                  <div className="flex space-x-3">
                    <Input
                      type="text"
                      id="pickupUnit"
                      placeholder="Unit 123, Apt 4B, etc."
                      value={pickupUnit}
                      onChange={(e) => setPickupUnit(e.target.value)}
                      className="flex-1 placeholder:text-gray-400"
                    />
                    <Button
                      type="button"
                      onClick={handlePickupUnitConfirm}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-6"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Destination Address Phase */}
        {currentPhase === "destination" && (
          <div className="space-y-4">
            {/* Show selected pickup address */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-green-800">Pickup Address</p>
                  <p className="text-sm text-green-700">{formData.pickupAddress}</p>
                </div>
              </div>
            </div>

            {userState && (
              <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-md">
                📍 Showing addresses in {userState} first
              </div>
            )}

            <div className="relative">
              <label htmlFor="destinationAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Drop off address
              </label>
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    id="destinationAddress"
                    name="destinationAddress"
                    placeholder="456 Oak Avenue, City, State 67890"
                    value={tempDestinationAddress}
                    onChange={(e) => {
                      setTempDestinationAddress(e.target.value)
                      setError("")
                    }}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="words"
                    spellCheck="false"
                    className="bg-white border-gray-300 focus:border-primary-500 focus:ring-primary-500 placeholder:text-gray-400 placeholder:font-normal text-base md:text-xl"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleDestinationAdd}
                  disabled={isValidatingDestination || !tempDestinationAddress}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 text-sm font-medium"
                >
                  {isValidatingDestination ? "..." : "Search"}
                </Button>
              </div>

              {/* Destination Address Suggestions */}
              {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Select the best match:</p>
                  <div className="space-y-2">
                    {destinationSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-900"
                        onClick={() => selectDestinationSuggestion(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Unit/Apt Number Input for Destination */}
            {showDestinationUnit && (
              <div className="mt-4 space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-800 mb-2">Selected Address:</p>
                  <p className="text-sm text-blue-700">{formData.destinationAddress}</p>
                </div>
                <div>
                  <label htmlFor="destinationUnit" className="block text-sm font-medium text-gray-700 mb-2">
                    Unit or Apt # (Optional)
                  </label>
                  <div className="flex space-x-3">
                    <Input
                      type="text"
                      id="destinationUnit"
                      placeholder="Unit 123, Apt 4B, etc."
                      value={destinationUnit}
                      onChange={(e) => setDestinationUnit(e.target.value)}
                      className="flex-1 placeholder:text-gray-400"
                    />
                    <Button
                      type="button"
                      onClick={handleDestinationUnitConfirm}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-6"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                type="button"
                className="text-primary-600 hover:text-primary-800 text-sm font-medium underline"
                onClick={handleSkipDestination}
              >
                Skip destination address
              </button>
            </div>
          </div>
        )}

        {/* Map Phase */}
        {currentPhase === "map" && (
          <div className="space-y-4">
            {/* Show selected addresses */}
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    A
                  </div>
                  <div>
                    <p className="text-xs font-medium text-green-800">Pickup Address</p>
                    <p className="text-sm text-green-700">{formData.pickupAddress}</p>
                  </div>
                </div>
              </div>

              {formData.destinationAddress && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      B
                    </div>
                    <div>
                      <p className="text-xs font-medium text-green-800">Destination Address</p>
                      <p className="text-sm text-green-700">{formData.destinationAddress}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Map with Route */}
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">Route Map</h4>
                <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span>Pickup (A)</span>
                  </div>
                  {formData.destinationAddress && (
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span>Destination (B)</span>
                    </div>
                  )}
                </div>
              </div>
              <div
                ref={mapRef}
                className="h-48 md:h-64 bg-gray-50 rounded-lg border border-gray-200 touch-manipulation"
                style={{ minHeight: "192px" }}
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center">
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

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          className="flex-1 py-5 md:py-6 text-sm md:text-base border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
        >
          Back
        </Button>

        {currentPhase === "map" && (
          <Button
            type="button"
            onClick={handleContinue}
            className="flex-1 bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white py-5 md:py-6 text-sm md:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Continue
          </Button>
        )}
      </div>

      {/* Add Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
    </div>
  )
}

export default DestinationStep
