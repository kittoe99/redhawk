import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center group">
      <div className="bg-primary-600 p-1.5 rounded-md mr-2 relative overflow-hidden transition-all duration-300 group-hover:shadow-lg">
        {/* Custom Hawk SVG */}
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="white"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          <path
            d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
          L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
          c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
          c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
          />
        </svg>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white rounded-full opacity-20"></div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xl text-secondary-900 font-montserrat tracking-tight leading-none">
          REDHAWK
        </span>
        <span className="text-xs text-primary-600 font-medium tracking-wider leading-none">RELOCATION</span>
      </div>
    </Link>
  )
}
