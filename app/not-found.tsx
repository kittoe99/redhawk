import Link from "next/link"
import { SearchIcon } from "@/components/search-icon"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF7F7] p-4">
      <div className="text-center max-w-md">
        <SearchIcon size={80} className="mx-auto mb-6 text-[#d30000]" />
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Page Not Found</h1>
        <p className="text-lg mb-8 text-gray-600">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-[#d30000] hover:bg-[#b30000] text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Return to Home
          </Link>
          <Link
            href="/services"
            className="block w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
          >
            View Our Services
          </Link>
          <Link
            href="/contact"
            className="block w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
