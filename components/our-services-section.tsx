"use client"

import { useState } from "react"
import Link from "next/link"

export function OurServicesSection() {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("local")

  // Add this right after the useState declaration
  const handleTabClick = (id) => {
    console.log("Switching to tab:", id)
    setActiveTab(id)
  }

  // Custom hawk icon component
  const HawkIcon = ({ size = 16, className = "" }) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41 L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3 c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0 c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z" />
    </svg>
  )

  // Enhanced Local Moving Truck Icon
  const TruckIcon = ({ size = 16, className = "" }) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 6h13v10H3z" />
      <path d="M16 16H3a2 2 0 0 0 2 2h11" />
      <path d="M16 8h2.5a1.5 1.5 0 0 1 1.06.44l2.5 2.5a1.5 1.5 0 0 1 .44 1.06V16h-6.5V8Z" />
      <path d="M8 16v2" />
      <path d="M13 16v2" />
      <path d="M3 9h13" />
      <circle cx="7.5" cy="18.5" r="1.5" />
      <circle cx="18.5" cy="18.5" r="1.5" />
      <path d="M15 2v4" />
      <path d="M8 2v4" />
      <path d="M11 2v4" />
      <path d="M19 12h2" />
    </svg>
  )

  // Enhanced Commercial Building Icon
  const BuildingIcon = ({ size = 16, className = "" }) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 22V5c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v17H6Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
      <path d="M10 22v-4h4v4" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
      <path d="M14 6h.01" />
      <path d="M14 10h.01" />
      <path d="M14 14h.01" />
      <path d="M14 18h.01" />
      <path d="M10 6h-.01" />
      <path d="M10 10h-.01" />
      <path d="M10 14h-.01" />
      <path d="M10 18h-.01" />
    </svg>
  )

  // Enhanced Specialty Moving Icon (Grand Piano)
  const SpecialtyIcon = ({ size = 16, className = "" }) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
      <path d="M18 5H6v10h12V5Z" />
      <path d="M6 15v4" />
      <path d="M18 15v4" />
      <path d="M12 15v4" />
      <path d="M10 5v10" />
      <path d="M14 5v10" />
      <path d="M6 9h12" />
      <path d="M6 12h12" />
      <path d="M19 5 5 19" />
      <path d="m8 7 2 2" />
      <path d="m12 7 2 2" />
      <path d="m8 11 2 2" />
      <path d="m12 11 2 2" />
    </svg>
  )

  // Service data
  const services = [
    {
      id: "local",
      title: "Local Moving Help",
      icon: TruckIcon,
      features: ["Same-day service (New!)", "Hourly rates"],
    },
    {
      id: "commercial",
      title: "Commercial Moving Help",
      icon: BuildingIcon,
      features: ["After-hours service", "IT equipment handling"],
    },
    {
      id: "specialty",
      title: "Specialty Moving Help",
      icon: SpecialtyIcon,
      features: ["Piano & fine art", "Custom crating"],
    },
  ]

  // Function to handle tab switching
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  // Update the section to ensure proper width and prevent overflow
  return (
    // This section displays the core services, sourced directly from this component's data.
    <section id="services" className="pt-8 md:pt-12 pb-4 bg-[#FFF7F7] bg-pattern-mixed relative overflow-hidden">
      {/* Add a subtle texture overlay */}
      <div className="absolute inset-0 bg-pattern-diagonal-lines opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary-50/30 to-transparent pointer-events-none -z-10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary-100/20 blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary-100/30 blur-3xl pointer-events-none -z-10"></div>

      {/* Simplified header with hawk icon */}
      <div className="flex items-center justify-center mb-6 md:mb-8">
        <HawkIcon size={20} className="text-primary-600 mr-2 md:mr-3" />
        <h2 className="text-xl md:text-2xl font-bold text-secondary-900">Services</h2>
      </div>

      {/* Mobile view - Tab design */}
      <div className="md:hidden max-w-xs mx-auto px-2">
        {/* Tab navigation */}
        <div className="flex gap-1 mb-4 bg-transparent">
          {services.map((service, index) => {
            // Determine if this is first, last, or middle button
            const isFirst = index === 0
            const isLast = index === services.length - 1

            return (
              <button
                key={service.id}
                onClick={() => handleTabClick(service.id)}
                type="button"
                style={{
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                }}
                className={`flex-1 py-2 px-1 text-xs font-medium flex flex-col items-center justify-center transition-all duration-200 ${
                  activeTab === service.id
                    ? "bg-primary-600 text-white"
                    : "bg-white text-secondary-700 hover:bg-gray-50"
                } shadow-sm border border-gray-200`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${
                    activeTab === service.id ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <service.icon
                    size={16}
                    className={activeTab === service.id ? "text-primary-600" : "text-secondary-600"}
                  />
                </div>
                <span className="truncate">{service.title.split(" ")[0]}</span>
              </button>
            )
          })}
        </div>

        {/* Active tab content */}
        {services
          .filter((service) => service.id === activeTab)
          .map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-lg transition-all duration-300 w-full"
            >
              <div className="p-4 border-b-4 border-primary-600 bg-gradient-to-br from-white via-white to-gray-50 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-100/30 to-transparent rounded-bl-full"></div>

                <div className="flex items-center mb-3">
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mr-3 shadow-md shadow-primary-500/20"
                    style={{ borderRadius: "9999px" }}
                  >
                    <service.icon size={18} className="text-white" />
                  </div>
                  <h3 className="text-base font-bold text-secondary-900">{service.title}</h3>
                </div>

                <ul className="space-y-2 text-sm mb-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-secondary-700">
                      <span
                        className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mr-2 flex-shrink-0 shadow-sm"
                        style={{ borderRadius: "9999px" }}
                      >
                        <HawkIcon size={10} className="text-primary-600" />
                      </span>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-secondary-500 italic mb-4 bg-gray-50 p-2 rounded-md border border-gray-100">
                  Provided by independent professionals
                </p>

                <Link
                  href="#contact"
                  className="w-[90%] mx-auto relative overflow-hidden group bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300 py-2 rounded-lg flex items-center justify-center"
                  style={{ borderRadius: "0.5rem", display: "flex" }}
                >
                  <span className="relative z-10 text-sm font-medium flex items-center">
                    View Details
                    <HawkIcon size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0 bg-primary-600 group-hover:h-full transition-all duration-300 -z-0"></span>
                </Link>
              </div>
            </div>
          ))}
      </div>

      {/* Desktop view - show all cards in grid */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:max-w-5xl lg:max-w-6xl md:mx-auto">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="group rounded-xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white"
            style={{ borderRadius: "0.75rem" }}
          >
            <div
              className={`p-5 lg:p-6 relative border-b-4 ${index === 1 ? "border-secondary-600" : "border-primary-600"} bg-gradient-to-br from-white via-white to-gray-50`}
            >
              <div className="absolute top-0 right-0 w-32 h-32">
                <div
                  className={`absolute top-0 right-0 w-full h-full ${index === 1 ? "bg-secondary-100/20" : "bg-primary-100/20"} rounded-bl-full opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
                <div className="absolute top-3 right-3">
                  <HawkIcon
                    size={16}
                    className={`${index === 1 ? "text-secondary-500" : "text-primary-500"} opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-12`}
                  />
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12 rounded-full ${index === 1 ? "bg-gradient-to-br from-secondary-500 to-secondary-700" : "bg-gradient-to-br from-primary-500 to-primary-700"} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-500 shadow-md ${index === 1 ? "shadow-secondary-500/20" : "shadow-primary-500/20"}`}
                  style={{ borderRadius: "9999px" }}
                >
                  <service.icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-secondary-900 group-hover:text-secondary-800 transition-colors duration-300">
                  {service.title}
                </h3>
              </div>

              <ul className="space-y-3 text-base mb-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-secondary-700">
                    <span
                      className={`w-6 h-6 rounded-full ${service.id === "commercial" ? "bg-secondary-100" : "bg-primary-100"} flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm`}
                      style={{ borderRadius: "9999px" }}
                    >
                      <HawkIcon
                        size={12}
                        className={service.id === "commercial" ? "text-secondary-600" : "text-primary-600"}
                      />
                    </span>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-secondary-500 italic mb-4 bg-gray-50 p-2 rounded-md border border-gray-100">
                Provided by independent professionals
              </p>

              <Link
                href="#contact"
                className="w-full relative overflow-hidden group bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300 py-2.5 rounded-lg flex items-center justify-center"
                style={{ borderRadius: "0.5rem", display: "flex" }}
              >
                <span className="relative z-10 font-medium flex items-center">
                  View Details
                  <HawkIcon size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0 bg-primary-600 group-hover:h-full transition-all duration-300 -z-0"></span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Stylish CTA */}
      <div className="mt-10 md:mt-16 mb-6 md:mb-8">
        <Link
          href="#contact"
          className="w-[80%] max-w-sm mx-auto relative overflow-hidden group bg-primary-600 text-white border-2 border-primary-600 hover:bg-white hover:text-primary-600 transition-all duration-300 py-3 md:py-4 px-6 md:px-8 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/20"
          style={{ borderRadius: "9999px", display: "flex" }}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-500 to-primary-700 group-hover:opacity-0 transition-opacity duration-300"></span>
          <span className="absolute -inset-px bg-gradient-to-r from-primary-200 to-primary-400 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></span>
          <span className="relative z-10 font-bold text-base md:text-lg flex items-center">
            <HawkIcon size={18} className="mr-2 md:mr-3 group-hover:rotate-12 transition-transform duration-300" />
            Find Moving Help
          </span>
        </Link>
      </div>
      <div className="w-full h-6 bg-gradient-to-b from-transparent to-[#FFF7F7]/50"></div>
    </section>
  )
}
