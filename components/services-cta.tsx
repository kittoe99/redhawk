import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ServicesCTA() {
  return (
    <section className="bg-gradient-to-b from-secondary-900 to-secondary-950 text-white py-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ctaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaGrid)" />
        </svg>
      </div>

      {/* Hawk wing accent */}
      <div className="absolute top-0 right-0 w-1/4 h-full opacity-10">
        <svg viewBox="0 0 100 100" width="100%" height="100%" fill="white" preserveAspectRatio="none">
          <path d="M0,0 L100,0 L50,100 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 max-w-5xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Moving Help?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Contact us today for a free, no-obligation quote. Our platform connects you with independent moving
            professionals to make your move stress-free.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-primary-600 hover:bg-primary-700" asChild>
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
