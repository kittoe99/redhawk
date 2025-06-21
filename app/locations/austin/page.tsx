import type { Metadata } from "next"
import AustinClientPage from "./AustinClientPage"

export const metadata: Metadata = {
  title: "Moving Help in Austin, TX | Redhawk Relocation",
  description:
    "Find reliable moving helpers in Austin, TX. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
  keywords: "Austin moving help, Austin movers, Austin moving helpers, moving help Austin TX",
  alternates: {
    canonical: "https://redhawkrelocation.com/locations/austin",
  },
  openGraph: {
    title: "Moving Help in Austin, TX | Redhawk Relocation",
    description:
      "Find reliable moving helpers in Austin, TX. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
    url: "https://redhawkrelocation.com/locations/austin",
    images: [
      {
        url: "/austin-move.png",
        width: 1200,
        height: 630,
        alt: "Austin moving help by Redhawk Relocation",
      },
    ],
  },
}

export default function AustinPage() {
  return <AustinClientPage />
}
