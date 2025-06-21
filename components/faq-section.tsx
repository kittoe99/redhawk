"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How soon can I book moving help through your platform?",
      answer:
        "Our platform allows you to book moving help on demand, based on the availability of independent movers in your area. There's no specific advance booking requirement - you can request help for same-day service or schedule weeks ahead, depending on your needs and the current availability of providers in your area.",
    },
    {
      question: "Do the independent movers on your platform provide packing materials?",
      answer:
        "Many of the independent moving professionals on our platform offer packing materials including boxes, bubble wrap, packing paper, and tape. When booking through our platform, you can specify if you need packing materials and we'll connect you with providers who offer these supplies, either separately or as part of their service packages.",
    },
    {
      question: "How are fragile or valuable items handled by movers on your platform?",
      answer:
        "The independent moving professionals on our platform are experienced in handling fragile and valuable items. When booking, you can specify any special handling requirements, and we'll match you with providers who have the appropriate expertise. For extremely valuable or irreplaceable items, we recommend requesting providers who offer specialty moving services including custom crating and additional insurance options.",
    },
    {
      question: "What is your platform's cancellation policy?",
      answer:
        "Our platform offers full refunds for cancellations made at least 24 hours before your scheduled move time. Cancellations with less than 24 hours' notice may not be eligible for a refund. The specific cancellation terms are clearly displayed before you confirm your booking.",
    },
    {
      question: "What services do the independent movers on your platform provide?",
      answer:
        "The independent moving professionals on our platform provide labor services such as loading, unloading, and rearranging furniture. They do not provide storage services or transportation of goods. Our platform is designed to connect you with the moving help you need for the specific tasks at hand.",
    },
    {
      question: "Is Redhawk Relocation a moving company?",
      answer:
        "No, Redhawk Relocation is not a moving company. We are a technology platform that connects customers with independent moving professionals. We do not own trucks, employ movers, or transport goods ourselves. All moving services are performed by independent third-party providers who use our platform to offer their services.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
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

  return (
    <section className="py-16 bg-[#FFF7F7]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-200 to-primary-400 rounded-full opacity-70 blur-sm"></div>
              <div className="relative bg-white p-2 rounded-full">
                <HawkIcon size={24} className="text-primary-600" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">Frequently Asked Questions About Our Platform</h2>
          <p className="text-secondary-700 max-w-2xl mx-auto">
            Find answers to common questions about our booking platform and the independent moving professionals we
            connect you with. If you don't see your question here, please contact us.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-secondary-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-primary-600 transition-transform ${openIndex === index ? "transform rotate-180" : ""}`}
                />
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-secondary-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 p-4 bg-white rounded-lg border border-primary-100 text-center">
          <p className="text-secondary-700 text-sm">
            <strong>Important:</strong> Redhawk Relocation is a booking platform that connects customers with
            independent moving professionals. We are not a moving company and do not transport goods ourselves. All
            services are provided by independent third-party contractors.
          </p>
        </div>
      </div>
    </section>
  )
}
