import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { MoverApplicationForm } from "@/components/mover-application-form"
import { CheckCircle, Truck, Clock, DollarSign, MapPin, Star } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Join as a Moving Helper | Earn $60-$90/Hour | Redhawk Relocation",
  description:
    "Join Redhawk Relocation as an independent moving helper. Earn $60-$90/hour, work flexible hours, and make up to $2,000-$3000/week. Apply now!",
  keywords: "moving helper jobs, independent contractor, flexible work, moving gigs, earn money moving",
}

const availableMarkets = [
  { city: "Austin", state: "TX", demand: "High" },
  { city: "Nashville", state: "TN", demand: "High" },
  { city: "Phoenix", state: "AZ", demand: "Very High" },
  { city: "Denver", state: "CO", demand: "High" },
  { city: "Tampa", state: "FL", demand: "Medium" },
  { city: "Charlotte", state: "NC", demand: "Medium" },
  { city: "Raleigh", state: "NC", demand: "Medium" },
  { city: "Columbus", state: "OH", demand: "Medium" },
  { city: "Boise", state: "ID", demand: "Medium" },
  { city: "Salt Lake City", state: "UT", demand: "Medium" },
  { city: "Baltimore", state: "MD", demand: "Medium" },
]

const benefits = [
  {
    icon: <DollarSign className="h-8 w-8 text-primary-600" />,
    title: "Competitive Earnings",
    description: "Earn $60-$90 per hour with potential weekly earnings of $2,000-$3,000",
  },
  {
    icon: <Clock className="h-8 w-8 text-primary-600" />,
    title: "Flexible Schedule",
    description: "Work when you want, where you want. You control your schedule completely",
  },
  {
    icon: <Truck className="h-8 w-8 text-primary-600" />,
    title: "Use Your Vehicle",
    description: "Cargo vans and box trucks from 2004+ accepted. Turn your vehicle into income",
  },
  {
    icon: <Star className="h-8 w-8 text-primary-600" />,
    title: "Be Your Own Boss",
    description: "Work as an independent contractor with full control over your business",
  },
]

const requirements = [
  "Valid driver's license and clean driving record",
  "Cargo van or box truck (2004 model year or newer)",
  "Ability to lift 50+ lbs and work physically demanding jobs",
  "Smartphone with internet access",
  "Professional attitude and customer service skills",
  "Background check and vehicle inspection required",
]

export default function MoverPage() {
  return (
    <div className="min-h-screen bg-white">
      <MainNav />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative pt-16 pb-0 md:pt-24 md:pb-0 bg-pattern-primary-dots w-full">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl mt-8 md:mt-12 lg:mt-16">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Left Column - Text Content */}
              <div className="relative z-10">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-50 rounded-full opacity-20 blur-xl"></div>

                <div className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-6 rounded-full bg-primary-600 text-white font-medium text-xs sm:text-sm border-[1px] border-primary-700 shadow-sm">
                  <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white animate-pulse"></span>
                  Join Our Team
                  <Truck className="ml-1 h-3 w-3 opacity-80" />
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-4 sm:mb-6 leading-tight">
                  Earn{" "}
                  <span className="text-primary-600 relative">
                    $60-$90/Hour
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      height="6"
                      viewBox="0 0 200 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 3C50 -1 150 7 200 3" stroke="#D10A0A" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                  </span>{" "}
                  as a Moving Helper
                </h1>

                <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-lg leading-relaxed text-secondary-600">
                  Work flexible hours, be your own boss, and earn up to $2,000-$3,000 per week helping people move.
                </p>

                {/* Earnings Display */}
                <div className="mb-6 sm:mb-8 p-4 bg-white/50 rounded-xl border border-gray-100">
                  <div className="flex flex-row gap-4 justify-center sm:justify-start">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">$60-$90</div>
                      <div className="text-sm text-secondary-600">Per Hour</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">$2K-$3K</div>
                      <div className="text-sm text-secondary-600">Weekly Potential</div>
                    </div>
                  </div>
                </div>

                <div className="mb-8 sm:mb-10 relative">
                  {/* Main container - clean light design */}
                  <div className="relative bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    {/* Subtle accent in corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary-50 rounded-bl-full -z-10"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <a
                          href="#apply"
                          className="bg-primary-600 hover:bg-primary-700 text-white inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium transition-colors"
                        >
                          Apply Now
                          <CheckCircle className="h-4 w-4" />
                        </a>
                        <a
                          href="#requirements"
                          className="border-gray-300 text-gray-800 hover:bg-gray-100 rounded-xl px-6 py-3 font-medium border transition-colors inline-flex items-center justify-center"
                        >
                          View Requirements
                        </a>
                      </div>

                      <div className="flex items-center gap-4 pt-4">
                        <div className="flex items-center">
                          <div className="flex items-center mr-2">
                            <Star className="text-yellow-400 w-4 h-4 fill-current" />
                            <span className="text-sm font-medium text-gray-900 ml-1">4.8</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">500+</span> active helpers
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative flex justify-center md:justify-end">
                {/* Decorative elements */}
                <div className="absolute -z-10 w-4/5 h-4/5 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 blur-md"></div>
                <div className="absolute -z-10 w-1/3 h-1/3 -top-4 -right-4 rounded-full bg-primary-100 opacity-50"></div>
                <div className="absolute -z-10 w-1/4 h-1/4 -bottom-2 -left-2 rounded-full bg-primary-200 opacity-40"></div>

                {/* Clean image presentation with subtle design */}
                <div className="relative rounded-full overflow-hidden shadow-lg w-[70%] sm:w-[60%] md:w-[90%] border-[2px] border-primary-100 aspect-square transform hover:scale-[1.02] transition-all duration-500 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/10 to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary-200 to-white opacity-50 blur-sm"></div>
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center relative z-0">
                    <Image
                      src="/movers-carrying-furniture.png"
                      width={400}
                      height={400}
                      alt="Professional moving helpers earning money"
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  {/* Enhanced image styling */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 to-transparent mix-blend-overlay"></div>

                    {/* Decorative border with gradient - minimalistic design */}
                    <div className="absolute inset-0 border-[10px] border-white/20 rounded-xl"></div>
                    <div className="absolute inset-0 border-[4px] border-primary-600/15 rounded-xl"></div>

                    {/* Subtle shine effect */}
                    <div className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-tr from-white/40 via-transparent to-transparent rotate-12 opacity-30 animate-[spin_15s_linear_infinite]"></div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-6 left-6 w-12 h-12">
                    <div className="absolute w-full h-0.5 bg-white/50 rounded-full transform -rotate-45"></div>
                    <div className="absolute h-full w-0.5 bg-white/50 rounded-full transform -rotate-45"></div>
                  </div>
                  <div className="absolute bottom-6 right-6 w-12 h-12">
                    <div className="absolute w-full h-0.5 bg-white/50 rounded-full transform -rotate-45"></div>
                    <div className="absolute h-full w-0.5 bg-white/50 rounded-full transform -rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section-divider-mixed w-full mt-8 rounded-full" aria-hidden="true"></div>
          </div>
        </section>

        {/* Available Markets */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Markets</h2>
              <p className="text-lg text-gray-600">
                We're currently accepting applications in these high-demand markets
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {availableMarkets.map((market, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-primary-600 mr-2" />
                    <span className="font-semibold text-gray-900">
                      {market.city}, {market.state}
                    </span>
                  </div>
                  <div
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      market.demand === "Very High"
                        ? "bg-red-100 text-red-800"
                        : market.demand === "High"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {market.demand} Demand
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="apply" className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-gray-600">
                Fill out our application form and we'll get back to you within 24 hours
              </p>
            </div>
            <MoverApplicationForm />
          </div>
        </section>
      </main>

      <HawkFooter />
    </div>
  )
}
