import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import Link from "next/link"
import Image from "next/image"
import {
  Building2,
  Music,
  Mountain,
  Trees,
  Sun,
  Palmtree,
  Building,
  MountainIcon as Mountains,
  Landmark,
  MountainIcon,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Service Areas | Moving Help Marketplace | Redhawk Relocation",
  description:
    "Redhawk Relocation's marketplace connects you with independent moving helpers in Austin, Nashville, Boise, Raleigh, Phoenix, Tampa, Charlotte, Denver, Columbus, Salt Lake City and surrounding areas.",
  alternates: {
    canonical: "https://redhawkrelocation.com/locations",
  },
}

export default function LocationsPage() {
  const cities = [
    {
      name: "Austin",
      slug: "austin",
      icon: <Building2 className="h-5 w-5" />,
      color: "bg-emerald-100",
    },
    {
      name: "Nashville",
      slug: "nashville",
      icon: <Music className="h-5 w-5" />,
      color: "bg-blue-100",
    },
    {
      name: "Boise",
      slug: "boise",
      icon: <Mountain className="h-5 w-5" />,
      color: "bg-indigo-100",
    },
    {
      name: "Raleigh",
      slug: "raleigh",
      icon: <Trees className="h-5 w-5" />,
      color: "bg-green-100",
    },
    {
      name: "Phoenix",
      slug: "phoenix",
      icon: <Sun className="h-5 w-5" />,
      color: "bg-amber-100",
    },
    {
      name: "Tampa",
      slug: "tampa",
      icon: <Palmtree className="h-5 w-5" />,
      color: "bg-cyan-100",
    },
    {
      name: "Charlotte",
      slug: "charlotte",
      icon: <Building className="h-5 w-5" />,
      color: "bg-violet-100",
    },
    {
      name: "Denver",
      slug: "denver",
      icon: <Mountains className="h-5 w-5" />,
      color: "bg-sky-100",
    },
    {
      name: "Columbus",
      slug: "columbus",
      icon: <Landmark className="h-5 w-5" />,
      color: "bg-red-100",
    },
    {
      name: "Salt Lake City",
      slug: "salt-lake-city",
      icon: <MountainIcon className="h-5 w-5" />,
      color: "bg-blue-100",
    },
    {
      name: "Baltimore",
      slug: "baltimore",
      icon: <Building2 className="h-5 w-5" />,
      color: "bg-teal-100",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <ScrollProgressBar />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Service Areas</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Redhawk Relocation connects you with independent moving helpers in these cities and their surrounding
              areas.
            </p>
          </div>

          <div className="relative mb-16">
            <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/usa-service-areas-light.png"
                alt="USA Service Areas Map with Light Theme"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cities.map((city) => (
              <Link key={city.slug} href={`/locations/${city.slug}`} className="group">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-full transition-all duration-200 hover:shadow-md hover:border-primary-200 hover:scale-105">
                  <div
                    className={`${city.color} rounded-full w-12 h-12 flex items-center justify-center mb-3 text-gray-700`}
                  >
                    {city.icon}
                  </div>
                  <h2 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    {city.name}
                  </h2>
                  <div className="mt-2 text-xs text-gray-500">View details →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <HawkFooter />
    </div>
  )
}
