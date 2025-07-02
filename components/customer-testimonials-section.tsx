import { Star } from "lucide-react"

interface Testimonial {
  id: number
  content: string
  author: string
  location: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content:
      "Perfect for our U-Haul move! The team loaded everything efficiently and carefully. Saved us so much time and our backs! Great value for money.",
    author: "Jennifer L.",
    location: "Tampa, FL",
  },
  {
    id: 2,
    content:
      "We rented our own truck but needed help with the heavy lifting. These guys were professional, fast, and very careful with our furniture.",
    author: "Robert C.",
    location: "Charlotte, NC",
  },
  {
    id: 3,
    content:
      "Used them for loading our PODS container. They fit everything perfectly and protected all our items. Highly recommend for labor-only moves!",
    author: "Amy K.",
    location: "Columbus, OH",
  },
]

export function CustomerTestimonialsSection() {
  const renderStars = () => (
    <div className="flex text-yellow-400 mr-2">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  )

  const renderAvatar = (name: string) => {
    const initial = name.trim().charAt(0)
    return (
      <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold mr-3">
        {initial}
      </div>
    )
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50/30 to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-secondary-600">
            Real reviews from DIY movers who got professional help when they needed it most.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
            >
              <div className="flex items-center mb-4">
                {renderStars()}
                <span className="ml-1 font-medium text-secondary-900">5.0</span>
              </div>

              <p className="text-secondary-700 mb-6">“{t.content}”</p>

              <div className="flex items-center">
                {renderAvatar(t.author)}
                <div>
                  <p className="font-semibold text-secondary-900 leading-none">
                    {t.author}
                  </p>
                  <p className="text-sm text-secondary-600 leading-none">
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
