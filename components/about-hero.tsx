export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-b from-primary-600 to-primary-700 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="aboutGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aboutGrid)" />
        </svg>
      </div>

      {/* Hawk wing accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <svg viewBox="0 0 100 100" width="100%" height="100%" fill="white" preserveAspectRatio="none">
          <path d="M0,0 L100,0 L50,100 Z" />
        </svg>
      </div>

      <div
        className="container mx-auto px-4 max-w-5xl relative z-10"
        style={{
          position: "relative",
          backgroundImage: "url('/redhawk-team.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Red overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary-700/90 to-primary-600/85 mix-blend-multiply"
          style={{ zIndex: -1 }}
        ></div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white">
              <path
                d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
              L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
              c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
              c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About Redhawk Relocation</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Your trusted platform connecting you with the best independent moving professionals across 10 major cities
            for a seamless relocation experience.
          </p>
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-auto text-[#FFF7F7]"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 55C840 50 960 40 1080 30C1200 20 1320 10 1380 5L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}
