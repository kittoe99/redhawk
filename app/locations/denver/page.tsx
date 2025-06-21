import type { Metadata } from "next"
import DenverPageClient from "./DenverPageClient"

export const metadata: Metadata = {
  title: "Moving Help in Denver, CO | Redhawk Relocation",
  description:
    "Find reliable moving helpers in Denver, CO. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
  keywords: "Denver moving help, Denver movers, Denver moving helpers, moving help Denver CO",
  alternates: {
    canonical: "https://redhawkrelocation.com/locations/denver",
  },
  openGraph: {
    title: "Moving Help in Denver, CO | Redhawk Relocation",
    description:
      "Find reliable moving helpers in Denver, CO. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
    url: "https://redhawkrelocation.com/locations/denver",
    images: [
      {
        url: "/denver-move.png",
        width: 1200,
        height: 630,
        alt: "Denver moving help by Redhawk Relocation",
      },
    ],
  },
}

export default function DenverPage() {
  return <DenverPageClient />
}
