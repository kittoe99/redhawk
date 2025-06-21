import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function FeaturesSection() {
  return (
    <section className="py-20 bg-[#FFF2F2] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#f8f9fa] to-white"></div>
      <div className="absolute -left-16 top-1/3 w-32 h-32 bg-primary-50 rounded-full opacity-70"></div>
      <div className="absolute -right-16 bottom-1/3 w-32 h-32 bg-primary-50 rounded-full opacity-70"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div>
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary-100 text-primary-600 font-medium text-sm">
              Moving Made Easy
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
              Relocation <span className="text-primary-600">Simplified</span>
            </h2>

            <p className="text-secondary-600 text-lg mb-8 max-w-lg">
              We've streamlined the moving process to make your transition as smooth as possible. From packing to
              unpacking, our professional team handles every detail with care and precision.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-600"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-secondary-700">Personalized moving plans tailored to your needs</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-600"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-secondary-700">Professional packing and unpacking services</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-600"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-secondary-700">Transparent pricing with no hidden fees</span>
              </li>
            </ul>

            <Button
              size="lg"
              className="rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-6 h-auto group"
              asChild
            >
              <Link href="#contact">
                Get Your Free Quote
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Right column - Image */}
          <div className="relative">
            <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary-50 to-blue-50 rounded-2xl transform rotate-3"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-8 border-white">
              <Image
                src="/moving-day-hustle.png"
                width={600}
                height={400}
                alt="Professional movers carefully handling boxes during relocation"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary-100 rounded-full opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
