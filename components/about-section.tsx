import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#FFF9F9] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-50 rounded-full translate-y-1/2 -translate-x-1/2"></div>

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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">About Redhawk Relocation</h2>
          <p className="text-secondary-600 max-w-2xl">
            We're more than just movers – we're your partners in transition, committed to making your move as smooth as
            possible.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/team-photo.png"
                width={600}
                height={700}
                alt="Our professional moving team"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-4 -left-4 w-full h-full border-2 border-primary-200 rounded-2xl -z-10"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-600 rounded-full opacity-10"></div>

            {/* Stats overlay */}
            <div className="absolute -bottom-10 right-10 bg-white rounded-lg shadow-xl p-4 w-40">
              <div className="text-4xl font-bold text-primary-600">15+</div>
              <div className="text-sm text-secondary-600">Years Experience</div>
            </div>
          </div>

          <div className="md:col-span-7 md:pl-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-secondary-900">Our Mission</h3>
                <p className="text-secondary-600">
                  At Redhawk Relocation, we're committed to providing exceptional moving services that take the stress
                  out of relocating. With years of experience and a dedicated team, we ensure your belongings arrive
                  safely at your new destination.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-secondary-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-600"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-secondary-900">Reliability</h4>
                  <p className="text-secondary-600">
                    We show up on time, every time, with the right equipment and expertise.
                  </p>
                </div>

                <div className="bg-secondary-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-600"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-secondary-900">Care</h4>
                  <p className="text-secondary-600">
                    We treat your belongings as if they were our own, with the utmost care and attention.
                  </p>
                </div>

                <div className="bg-secondary-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-600"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-secondary-900">Transparency</h4>
                  <p className="text-secondary-600">No hidden fees or surprises—just honest, upfront pricing.</p>
                </div>

                <div className="bg-secondary-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-600"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-secondary-900">Excellence</h4>
                  <p className="text-secondary-600">
                    We continuously strive to exceed expectations in every aspect of our service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
