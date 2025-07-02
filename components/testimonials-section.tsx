"use client"

import { useState } from "react"
import Image from "next/image"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      content:
        "The team at Redhawk Relocation made our move so much easier than expected. They were professional, efficient, and handled our belongings with care. I would definitely use their services again!",
      author: "Sarah Johnson",
      location: "Local Move, Seattle",
      rating: 5,
      image: "/testimonial-1.png",
    },
    {
      id: 2,
      content:
        "Moving across the country was daunting, but Redhawk made it seamless. Their communication was excellent, and they delivered everything on time and in perfect condition. Highly recommend!",
      author: "Michael Rodriguez",
      location: "Long Distance Move, Boston to San Diego",
      rating: 5,
      image: "/testimonial-2.png",
    },
    {
      id: 3,
      content:
        "I was impressed by how carefully they packed my fragile items. Not a single thing was damaged in the move. The crew was friendly and worked quickly. Worth every penny for the peace of mind!",
      author: "Jennifer Lee",
      location: "Packing Services, Chicago",
      rating: 5,
      image: "/testimonial-3.png",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 bg-[#FFF2F2] relative overflow-hidden bg-pattern-circuit">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-600 rounded-full"></div>
        <div className="absolute top-1/4 right-0 w-60 h-60 bg-primary-600 rounded-full"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-primary-600 rounded-full"></div>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6">
            <Quote className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">What Our Customers Say</h2>
          <p className="text-secondary-600 max-w-2xl">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with
            Redhawk Relocation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <Quote className="h-8 w-8 text-primary-600" />
            </div>

            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="relative">
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={testimonials[activeIndex].image || "/placeholder.svg"}
                      width={300}
                      height={400}
                      alt={testimonials[activeIndex].author}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute top-4 -left-4 w-full h-full border-2 border-primary-200 rounded-2xl -z-10"></div>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="flex mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <blockquote className="mb-6">
                  <p className="text-lg text-secondary-700 italic">"{testimonials[activeIndex].content}"</p>
                </blockquote>

                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-secondary-900">{testimonials[activeIndex].author}</p>
                  <p className="text-sm text-secondary-600">{testimonials[activeIndex].location}</p>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-primary-200 hover:bg-primary-50"
                    onClick={prevTestimonial}
                  >
                    <ChevronLeft className="h-5 w-5 text-primary-600" />
                    <span className="sr-only">Previous testimonial</span>
                  </Button>

                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full ${
                          index === activeIndex ? "bg-primary-600" : "bg-primary-200"
                        }`}
                        onClick={() => setActiveIndex(index)}
                      >
                        <span className="sr-only">Testimonial {index + 1}</span>
                      </button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-primary-200 hover:bg-primary-50"
                    onClick={nextTestimonial}
                  >
                    <ChevronRight className="h-5 w-5 text-primary-600" />
                    <span className="sr-only">Next testimonial</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
