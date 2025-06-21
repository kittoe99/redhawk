"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { LoginForm } from "@/components/login-form"
import { Building2, Shield, Clock } from "lucide-react"

export default function ClientPage() {
  return (
    <>
      <MainNav />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-32 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary-100/20 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-blue-100/20 blur-2xl pointer-events-none"></div>
        </div>

        <div className="relative z-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-100">
                <Logo />
              </div>
            </div>
            <h2 className="mt-8 text-center text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="mt-3 text-center text-lg text-gray-600">
              Sign in to your account to continue
            </p>
            <p className="mt-2 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Create one here
              </Link>
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white/80 backdrop-blur-sm py-10 px-6 shadow-2xl border border-white/20 sm:rounded-3xl sm:px-12 relative">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <LoginForm />
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Secure & Private</h3>
                <p className="text-xs text-gray-600">Your data is protected with enterprise-grade security</p>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Trusted Platform</h3>
                <p className="text-xs text-gray-600">Over 1,200+ successful moves completed</p>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">24/7 Support</h3>
                <p className="text-xs text-gray-600">Get help whenever you need it</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HawkFooter />
    </>
  )
}
