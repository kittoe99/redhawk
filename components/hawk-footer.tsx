"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"

const HawkIcon = ({ size = 24, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
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

export function HawkFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 pt-6 pb-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and copyright */}
          <div className="flex items-center mb-4 md:mb-0">
            <Logo />
            <p className="text-sm text-gray-500 ml-4">&copy; {year} Redhawk Relocation</p>
          </div>

          {/* Essential links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/about-us" className="text-gray-600 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-primary-600 transition-colors">
              Services
            </Link>
            <Link href="/locations" className="text-gray-600 hover:text-primary-600 transition-colors">
              Locations
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary-600 transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
              Terms
            </Link>
          </div>
        </div>

        {/* App download section */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-3">Get our mobile app</p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors"
              aria-label="Download on the App Store"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              <span className="text-xs font-medium">App Store</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors"
              aria-label="Get it on Google Play"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5,3L4.35,3.14L15.15,12L4.35,20.86L5,21L17,12L5,3M7,6.45L13.05,12L7,17.55V6.45Z" />
              </svg>
              <span className="text-xs font-medium">Google Play</span>
            </a>
          </div>
        </div>

        {/* Minimal disclaimer */}
        <div className="mt-6 text-xs text-center text-gray-400 max-w-2xl mx-auto">
          Redhawk Relocation is a technology platform connecting customers with independent moving professionals.
        </div>
      </div>
    </footer>
  )
}
