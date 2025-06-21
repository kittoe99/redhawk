import { Home, MapPin, PackageCheck, Truck, Building, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-[#FFF9F9] to-primary-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary-600"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6">
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
              <rect width="16" height="16" x="4" y="4" rx="2"></rect>
              <rect width="6" height="6" x="9" y="9" rx="1"></rect>
              <path d="M15 2v2"></path>
              <path d="M15 20v2"></path>
              <path d="M2 15h2"></path>
              <path d="M20 15h2"></path>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">Our Premium Services</h2>
          <p className="text-secondary-600 max-w-2xl">
            Our platform connects you with independent professionals offering comprehensive moving solutions tailored to
            your specific needs, ensuring a smooth transition to your new location.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Service cards with hover effects */}
          <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary-600"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                <Home className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-secondary-900">Local Moving</h3>
              <p className="text-secondary-600 mb-6">
                Moving within the same city or nearby? Connect with independent local movers through our platform who
                provide efficient, careful transportation of your belongings with minimal disruption to your schedule.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-secondary-600">
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
                    className="text-primary-600 mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span>Same-day service available</span>
                </li>
                <li className="flex items-center text-secondary-600">
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
                    className="text-primary-600 mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span>Hourly rates</span>
                </li>
                <li className="flex items-center text-secondary-600">
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
                    className="text-primary-600 mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span>Experienced local crews</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full rounded-full border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
                asChild
              >
                <Link href="#contact">Find Providers</Link>
              </Button>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary-600"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                <MapPin className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-secondary-900">Long Distance Moving</h3>
              <p className="text-secondary-600 mb-6">
                Relocating to another state? Connect with independent long-distance movers through our platform who
                ensure your belongings arrive safely and on time, no matter how far you're going.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-secondary-600">
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
                    className="text-primary-600 mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span>Guaranteed delivery dates</span>
                </li>
                <li className="flex items-center text-secondary-600">
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
                    className="text-primary-600 mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span>GPS tracking</span>
                </li>
                <li className="flex items-center text-secondary-600">
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
                    className="text-primary-600 mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span>Comprehensive insurance</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full rounded-full border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
                asChild
              >
                <Link href="#contact">Find Providers</Link>
              </Button>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary-600"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                <PackageCheck className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-secondary-900">Packing Services</h3>
              <p className="text-secondary-600 mb-6">
                Let independent packing experts found through our platform handle the packing for a truly stress-free
                move. They use quality materials and proven techniques to protect your valuables.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-secondary-600">
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
                    className="text-primary-600 mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span>Full and partial packing options</span>
                </li>
                <li className="flex items-center text-secondary-600">
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
                    className="text-primary-600 mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span>Custom crating for valuables</span>
                </li>
                <li className="flex items-center text-secondary-600">
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
                    className="text-primary-600 mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span>Unpacking assistance</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full rounded-full border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
                asChild
              >
                <Link href="#contact">Find Providers</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Additional services showcase */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block px-4 py-1 mb-6 rounded-full bg-primary-100 text-primary-600 font-medium text-sm">
                Additional Services
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-secondary-900">Comprehensive Moving Solutions</h3>
              <p className="text-secondary-600 mb-8">
                Beyond our core services, we offer specialized solutions to meet all your moving needs. From storage
                options to specialty item moving, we've got you covered.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-primary-100 rounded-lg">
                    <Building className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Storage Solutions</h4>
                    <p className="text-sm text-secondary-600">Secure, climate-controlled storage options</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-primary-100 rounded-lg">
                    <Truck className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Commercial Moving</h4>
                    <p className="text-sm text-secondary-600">Office and business relocation services</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-primary-100 rounded-lg">
                    <ShieldCheck className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Insurance Options</h4>
                    <p className="text-sm text-secondary-600">Comprehensive coverage for your valuables</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-primary-100 rounded-lg">
                    <PackageCheck className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Specialty Items</h4>
                    <p className="text-sm text-secondary-600">Piano, art, and antique moving specialists</p>
                  </div>
                </div>
              </div>

              <Button className="mt-8 rounded-full self-start" asChild>
                <Link href="#contact">Get a Custom Quote</Link>
              </Button>
            </div>

            <div className="relative">
              <Image
                src="/specialty-moving.png"
                width={600}
                height={600}
                alt="Specialty moving services"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
