"use client"

import { useState } from "react"
import { Check, Heart, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AboutContent() {
  const [activeTab, setActiveTab] = useState("story")

  // Custom hawk icon component
  const HawkIcon = ({ size = 16, className = "", fill = "#d30000", opacity = 1 }) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      style={{ opacity }}
      className={className}
    >
      <path
        d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
      L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
      c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
      c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
      />
    </svg>
  )

  // Company values
  const companyValues = [
    {
      icon: (
        <div className="relative">
          <Shield className="h-8 w-8 text-primary-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <HawkIcon size={14} className="text-primary-600 translate-y-1" />
          </div>
        </div>
      ),
      title: "Reliability",
      description: "We connect you with professionals who show up when promised and deliver on their commitments.",
    },
    {
      icon: (
        <div className="relative">
          <Heart className="h-8 w-8 text-primary-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <HawkIcon size={12} className="text-primary-600 translate-y-1" />
          </div>
        </div>
      ),
      title: "Compassion",
      description:
        "We understand that moving can be stressful. Our platform is designed to make finding help as smooth as possible.",
    },
    {
      icon: (
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-600"
          >
            <path d="m2 20 2-2m10-10 2-2" />
            <path d="M4 14a4 4 0 0 1 0-8 4 4 0 0 1 6 0 4 4 0 0 1 6 0 4 4 0 0 1-6 6H4" />
            <path d="M14 18a4 4 0 0 0 0-8 3.98 3.98 0 0 0-2 .54" />
            <path d="m22 20-2-2" />
          </svg>
        </div>
      ),
      title: "Excellence",
      description:
        "We continuously strive to improve our platform and exceed expectations in connecting you with quality moving help.",
    },
    {
      icon: (
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-600"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
            <path d="M8.5 8.5 7 7" />
            <path d="M16 16l-1.5-1.5" />
            <path d="M16 8.5 17 7" />
            <path d="m8 16 1.5-1.5" />
          </svg>
        </div>
      ),
      title: "Efficiency",
      description: "Our platform is designed to quickly match you with available moving professionals in your area.",
    },
  ]

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      {/* Introduction */}
      <div className="max-w-3xl mx-auto text-center relative">
        {/* Small decorative hawk icon */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <HawkIcon size={24} opacity={0.2} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4">Our Platform Story</h2>
        <p className="text-secondary-700">
          Since 2005, Redhawk Relocation has been connecting thousands of residents and businesses with trusted moving
          professionals across 10 major cities. Our platform simplifies finding reliable moving help for your new
          beginnings.
        </p>
        <div className="mt-4 bg-primary-50 p-4 rounded-lg inline-block">
          <p className="text-primary-800 font-medium text-sm">
            <strong>Note:</strong> Redhawk Relocation is a booking platform that connects customers with independent
            moving professionals. We are not a moving company and do not transport goods ourselves.
          </p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex justify-center border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("story")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "story"
              ? "border-b-2 border-primary-600 text-primary-600"
              : "text-secondary-600 hover:text-primary-600"
          }`}
        >
          Our Story
        </button>
        <button
          onClick={() => setActiveTab("values")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "values"
              ? "border-b-2 border-primary-600 text-primary-600"
              : "text-secondary-600 hover:text-primary-600"
          }`}
        >
          Our Values
        </button>
        <button
          onClick={() => setActiveTab("careers")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "careers"
              ? "border-b-2 border-primary-600 text-primary-600"
              : "text-secondary-600 hover:text-primary-600"
          }`}
        >
          Join Our Team
        </button>
      </div>

      {/* Our Story */}
      {activeTab === "story" && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold text-secondary-900 mb-4">The Redhawk Relocation Story</h3>
                <div className="space-y-4 text-secondary-700">
                  <p>
                    Redhawk Relocation was founded in 2005 by Michael Redhawk, who saw an opportunity to transform the
                    moving industry. After experiencing his own frustrating moves, Michael was determined to create a
                    platform that connected customers with reliable, independent moving professionals.
                  </p>
                  <p>
                    Today, we operate a sophisticated booking platform that connects customers with hundreds of vetted,
                    independent moving professionals across Austin, Nashville, Boise, Raleigh, Phoenix, Tampa,
                    Charlotte, Denver, Columbus, and Salt Lake City. Our commitment to personalized service and
                    attention to detail sets us apart.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="/images/redhawk-movers-sofa.png"
                    alt="Independent movers connected through Redhawk platform"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <div className="text-3xl font-bold text-primary-600">15+</div>
                      <div className="text-xs text-secondary-500">Years of Service</div>
                    </div>
                    <div className="h-10 w-px bg-gray-200 mx-2"></div>
                    <div className="ml-3">
                      <div className="text-3xl font-bold text-primary-600">10k+</div>
                      <div className="text-xs text-secondary-500">Successful Connections</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Our Team - Shortened */}
      {activeTab === "careers" && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="text-center mb-6 relative">
              <h3 className="text-xl font-bold text-secondary-900 mb-2 flex items-center justify-center">
                <div className="relative w-6 h-6 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-600"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    <path d="m9 11 5-5" />
                    <path d="m9 6 5 5" />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="#d30000"
                    className="absolute top-0 right-0"
                  >
                    <path d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41 L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3 c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0 c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z" />
                  </svg>
                </div>
                Join Our Team
              </h3>
              <p className="text-secondary-700 max-w-2xl mx-auto">
                Become part of the Redhawk family and help us connect customers with exceptional moving professionals.
              </p>
            </div>

            {/* Current Openings - Shortened */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                <div className="relative w-5 h-5 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-600"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                    <path d="m9 16 2 2 4-4" />
                  </svg>
                </div>
                Current Openings
              </h4>

              <div className="space-y-4">
                {[
                  {
                    title: "Platform Support Specialist",
                    type: "Full-time",
                    location: "Phoenix, AZ",
                    description:
                      "Help customers use our platform to find the right moving professionals for their needs.",
                    isNew: true,
                  },
                  {
                    title: "Provider Relations Manager",
                    type: "Full-time",
                    location: "Phoenix, AZ",
                    description: "Manage relationships with independent moving professionals on our platform.",
                    isNew: false,
                  },
                ].map((job, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold text-secondary-900 flex items-center">
                          {job.title}
                          {job.isNew && (
                            <span className="ml-2 bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full flex items-center">
                              <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                                fill="currentColor"
                                className="mr-1"
                              >
                                <path d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41 L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3 c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0 c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z" />
                              </svg>
                              New
                            </span>
                          )}
                        </h5>
                        <div className="flex items-center text-sm text-secondary-600 mt-1">
                          <span className="flex items-center mr-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3 mr-1"
                            >
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                              <polyline points="3.29 7 12 12 20.71 7" />
                              <line x1="12" y1="22" x2="12" y2="12" />
                            </svg>
                            {job.type}
                          </span>
                          <span className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3 mr-1"
                            >
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <button className="bg-primary-600 hover:bg-primary-700 text-white text-sm px-4 py-1 rounded-full flex items-center">
                        Apply Now
                      </button>
                    </div>
                    <p className="text-secondary-700 text-sm mt-3">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Our Values */}
      {activeTab === "values" && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="text-center mb-6 relative">
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Our Core Values</h3>
              <p className="text-secondary-700 max-w-2xl mx-auto">
                These principles guide our platform and how we connect customers with moving professionals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {companyValues.map((value, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4 shadow-sm">
                    {value.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-secondary-900 mb-2">{value.title}</h4>
                  <p className="text-secondary-700">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Additional information - Shortened */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <HawkIcon size={18} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900">Our Approach</h3>
            </div>
            <p className="text-secondary-700 mb-4">
              At Redhawk Relocation, we believe that moving should be an exciting new beginning, not a stressful
              experience. Our platform is designed to connect you with the right moving help quickly and easily.
            </p>
            <ul className="space-y-2">
              {[
                "Easy-to-use booking platform",
                "Transparent pricing with no hidden fees",
                "Access to vetted moving professionals",
                "Secure payment processing",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span className="text-secondary-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-secondary-700 mt-4 bg-secondary-50 p-3 rounded-lg border border-secondary-200">
              <strong>Important:</strong> Redhawk Relocation is not a moving company. We are a technology platform that
              connects customers with independent moving professionals. All services are provided by third-party
              contractors who use our platform.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-600"
                >
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary-900">Customer Testimonials</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-secondary-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-400"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-secondary-900">5.0</span>
                </div>
                <p className="text-sm text-secondary-700 italic">
                  "Redhawk's platform made finding reliable movers so easy. The helpers I connected with were
                  professional and efficient. Highly recommend!"
                </p>
                <div className="mt-2 text-xs text-secondary-500">— Jennifer T., Scottsdale</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg overflow-hidden mt-8 relative">
        <div className="p-6 text-center text-white relative z-10">
          <h3 className="text-xl font-bold mb-3 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              className="mr-2"
            >
              <path d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41 L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3 c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0 c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z" />
            </svg>
            Ready to Find Moving Help?
          </h3>
          <p className="text-white/80 mb-4 max-w-2xl mx-auto">
            Connect with reliable moving professionals through our platform in 10 major cities.
          </p>
          <Button className="bg-white text-primary-600 hover:bg-white/90 group" size="lg" asChild>
            <Link href="/contact" className="flex items-center">
              Get a Free Quote
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="ml-2 group-hover:translate-x-1 transition-transform"
              >
                <path d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41 L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3 c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0 c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
