"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, MapPin, Phone, Truck, Menu } from "lucide-react"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-[#FFF2F2] border-b border-gray-200 z-50">
      {/* Top utility navigation */}
      <div className="bg-[#0F172A] text-white">
        <div className="container mx-auto flex items-center justify-between h-10 px-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              <span>Seattle, WA</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-3 w-3 mr-1" />
              <span>(555) 123-4567</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/track" className="text-sm font-medium hover:text-[#FF5252] flex items-center">
              TRACK MY MOVE
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-[#FF5252] flex items-center">
                EN
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  EN
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  ES
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  FR
                </Link>
              </div>
            </div>
            <Link href="/login" className="text-sm font-medium hover:text-[#FF5252]">
              LOG IN
            </Link>
            <button className="text-sm font-medium bg-[#D10A0A] hover:bg-[#B30000] text-white px-3 py-1 rounded-full">
              SIGN UP
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-[#D10A0A] p-2 rounded-md mr-2">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-[#1E293B]">REDHAWK</span>
              <span className="sr-only">Relocation</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex ml-10 space-x-8">
            <Link href="/services" className="text-[#1E293B] font-bold hover:text-[#D10A0A] transition-colors">
              SERVICES
            </Link>
            <Link href="/locations" className="text-[#1E293B] font-bold hover:text-[#D10A0A] transition-colors">
              LOCATIONS
            </Link>
            <Link href="/pricing" className="text-[#1E293B] font-bold hover:text-[#D10A0A] transition-colors">
              PRICING
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button className="hidden md:block bg-[#D10A0A] hover:bg-[#B30000] text-white px-4 py-2 rounded-md">
            START YOUR QUOTE
          </button>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="space-y-2">
              <Link
                href="/services"
                className="block text-[#1E293B] font-bold hover:text-[#D10A0A] transition-colors py-2"
              >
                SERVICES
              </Link>
              <Link
                href="/locations"
                className="block text-[#1E293B] font-bold hover:text-[#D10A0A] transition-colors py-2"
              >
                LOCATIONS
              </Link>
              <Link
                href="/pricing"
                className="block text-[#1E293B] font-bold hover:text-[#D10A0A] transition-colors py-2"
              >
                PRICING
              </Link>
            </nav>
            <button className="w-full bg-[#D10A0A] hover:bg-[#B30000] text-white px-4 py-2 rounded-md">
              START YOUR QUOTE
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
