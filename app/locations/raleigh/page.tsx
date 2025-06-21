import type { Metadata } from "next"
import RaleighClientPage from "./RaleighClientPage"

export const metadata: Metadata = {
  title: "Moving Help in Raleigh, NC | Redhawk Relocation",
  description:
    "Find reliable moving helpers in Raleigh, NC. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
  keywords: "Raleigh moving help, Raleigh movers, Raleigh moving helpers, moving help Raleigh NC",
  alternates: {
    canonical: "https://redhawkrelocation.com/locations/raleigh",
  },
  openGraph: {
    title: "Moving Help in Raleigh, NC | Redhawk Relocation",
    description:
      "Find reliable moving helpers in Raleigh, NC. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
    url: "https://redhawkrelocation.com/locations/raleigh",
    images: [
      {
        url: "/raleigh-moving-day.png",
        width: 1200,
        height: 630,
        alt: "Raleigh moving help by Redhawk Relocation",
      },
    ],
  },
}

export default function RaleighPage() {
  return <RaleighClientPage />
}
