import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ServicesContent() {
  // Custom hawk icon component
  const HawkIcon = ({ size = 16, className = "" }) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41 L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3 c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0 c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z" />
    </svg>
  )

  // Enhanced Local Moving Truck Icon
  const TruckIcon = ({ size = 16, className = "" }) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 6h13v10H3z" />
      <path d="M16 16H3a2 2 0 0 0 2 2h11" />
      <path d="M16 8h2.5a1.5 1.5 0 0 1 1.06.44l2.5 2.5a1.5 1.5 0 0 1 .44 1.06V16h-6.5V8Z" />
      <path d="M8 16v2" />
      <path d="M13 16v2" />
      <path d="M3 9h13" />
      <circle cx="7.5" cy="18.5" r="1.5" />
      <circle cx="18.5" cy="18.5" r="1.5" />
      <path d="M15 2v4" />
      <path d="M8 2v4" />
      <path d="M11 2v4" />
      <path d="M19 12h2" />
    </svg>
  )

  // Enhanced Commercial Building Icon
  const BuildingIcon = ({ size = 16, className = "" }) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 22V5c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v17H6Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
      <path d="M10 22v-4h4v4" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  )

  // Enhanced Specialty Moving Icon (Grand Piano)
  const MusicIcon = ({ size = 16, className = "" }) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
      <path d="M18 5H6v10h12V5Z" />
      <path d="M6 15v4" />
      <path d="M18 15v4" />
      <path d="M12 15v4" />
      <path d="M10 5v10" />
      <path d="M14 5v10" />
    </svg>
  )

  // Enhanced Package Icon
  const PackageIcon = ({ size = 16, className = "" }) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-8 4.5v9L12 21l8-4.5v-9L12 3z" />
      <path d="M12 12v9" />
      <path d="M12 12 4 7.5" />
      <path d="m12 12 8-4.5" />
      <path d="M16 5.25 8 9.75" />
    </svg>
  )

  // Service data - removed long distance and storage services
  const services = [
    {
      id: "local",
      title: "Local Moving Help",
      icon: TruckIcon,
      features: [
        "Connect with same-day service providers",
        "Transparent hourly rates",
        "Experienced local moving professionals",
      ],
      color: "bg-gradient-to-br from-primary-500 to-primary-700",
    },
    {
      id: "commercial",
      title: "Commercial Moving Help",
      icon: BuildingIcon,
      features: [
        "Find after-hours moving specialists",
        "Connect with IT equipment handling experts",
        "Providers focused on minimal business disruption",
      ],
      color: "bg-gradient-to-br from-secondary-700 to-secondary-900",
    },
    {
      id: "specialty",
      title: "Specialty Moving Help",
      icon: MusicIcon,
      features: [
        "Find piano and fine art specialists",
        "Connect with custom crating experts",
        "Providers with extra insurance options",
      ],
      color: "bg-gradient-to-br from-primary-500 to-primary-700",
    },
    {
      id: "packing",
      title: "Packing Help",
      icon: PackageIcon,
      features: [
        "Full and partial packing specialists",
        "Providers with quality materials",
        "Unpacking and debris removal experts",
      ],
      color: "bg-gradient-to-br from-secondary-700 to-secondary-900",
    },
  ]

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      {/* Introduction */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">Our Platform Services</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-6"></div>
        <p className="text-secondary-700 text-lg">
          Connect with independent moving professionals for homes, businesses, and specialty items through our platform.
        </p>
      </div>

      {/* Services Grid - Improved layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            id={service.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
          >
            <div className={`${service.color} p-6 text-white relative overflow-hidden`}>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full transform -translate-y-8 translate-x-8"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/5 rounded-tr-full"></div>

              <div className="flex items-center">
                <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-5 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>
            </div>

            <div className="p-6 flex-grow">
              <p className="text-sm text-secondary-500 italic mb-4">
                *All services provided by independent moving professionals through our platform
              </p>
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 mr-2 mt-1 flex-shrink-0">
                      <HawkIcon size={14} />
                    </span>
                    <span className="text-secondary-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-6 pb-6 mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white border-none"
                asChild
              >
                <Link href="/quote">Get Quote</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us - Improved design */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 mt-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center justify-center">
            <span className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
              <HawkIcon size={20} className="text-primary-600" />
            </span>
            Why Choose Redhawk Relocation Platform
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Vetted Professionals",
                description: "We connect you with experienced, pre-screened movers",
              },
              {
                title: "Customized Matching",
                description: "Find the right moving help for your specific needs",
              },
              {
                title: "Transparent Pricing",
                description: "Clear rates with no hidden fees or surprise charges",
              },
            ].map((item, index) => (
              <div key={index} className="grid grid-cols-[auto_1fr] gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <HawkIcon size={16} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-1">{item.title}</h3>
                  <p className="text-secondary-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
