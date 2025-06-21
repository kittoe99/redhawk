import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-primary-600 p-6 text-white">
          <h2 className="text-xl font-bold flex items-center">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              className="mr-2"
            >
              <path
                d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
                L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
                c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
                c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
              />
            </svg>
            Contact Information
          </h2>
          <p className="mt-2 text-white/80">Reach out to us through any of these channels</p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div className="flex group">
              <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mr-4 shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden border border-primary-200">
                <div className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Phone className="h-5 w-5 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-secondary-900 group-hover:text-primary-600 transition-colors duration-300">
                  Phone
                </h3>
                <a href="tel:+17208429167" className="text-primary-600 font-semibold hover:underline">
                  (720) 842-9167
                </a>
              </div>
            </div>

            <div className="flex group">
              <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mr-4 shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden border border-primary-200">
                <div className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Mail className="h-5 w-5 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-secondary-900 group-hover:text-primary-600 transition-colors duration-300">
                  Email
                </h3>
                <a href="mailto:info@redhawkrelocation.com" className="text-primary-600 font-semibold hover:underline">
                  info@redhawkrelocation.com
                </a>
              </div>
            </div>

            <div className="flex group">
              <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mr-4 shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden border border-primary-200">
                <div className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <MapPin className="h-5 w-5 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-secondary-900 group-hover:text-primary-600 transition-colors duration-300">
                  Service Areas
                </h3>
                <address className="not-italic text-secondary-700">
                  6001 W Parmer Lane
                  <br />
                  Ste 370, Austin, TX 78727, United States
                  <br />
                  Austin • Nashville • Boise • Raleigh
                  <br />
                  Phoenix • Tampa • Charlotte • Denver
                  <br />
                  Columbus • Salt Lake City
                </address>
              </div>
            </div>

            <div className="flex group">
              <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mr-4 shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden border border-primary-200">
                <div className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Clock className="h-5 w-5 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-secondary-900 group-hover:text-primary-600 transition-colors duration-300">
                  Business Hours
                </h3>
                <ul className="text-secondary-700">
                  <li className="flex justify-between text-sm">
                    <span>Monday - Friday:</span>
                    <span className="ml-4">8:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Saturday:</span>
                    <span className="ml-4">9:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Sunday:</span>
                    <span className="ml-4">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#D10A0A"
              className="mr-2"
            >
              <path
                d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
                L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
                c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
                c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
              />
            </svg>
            Need a Quote?
          </h3>
          <p className="text-secondary-600 text-sm mb-4">Get a free, no-obligation quote for your upcoming move.</p>
          <Button className="w-full bg-primary-600 hover:bg-primary-700" asChild>
            <Link href="/quote">Request a Quote</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
