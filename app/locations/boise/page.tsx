import type { Metadata } from "next"
import BoisePageClient from "./BoisePageClient"

export const metadata: Metadata = {
  title: "Moving Help in Boise, ID | Redhawk Relocation",
  description:
    "Find reliable moving helpers in Boise, ID. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
  keywords: "Boise moving help, Boise movers, Boise moving helpers, moving help Boise ID",
  alternates: {
    canonical: "https://redhawkrelocation.com/locations/boise",
  },
  openGraph: {
    title: "Moving Help in Boise, ID | Redhawk Relocation",
    description:
      "Find reliable moving helpers in Boise, ID. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
    url: "https://redhawkrelocation.com/locations/boise",
    images: [
      {
        url: "/boise-move.png",
        width: 1200,
        height: 630,
        alt: "Boise moving help by Redhawk Relocation",
      },
    ],
  },
}

export default function BoisePage() {
  return <BoisePageClient />
}
