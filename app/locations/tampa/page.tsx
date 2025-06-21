import type { Metadata } from "next"
import TampaClientPage from "./TampaClientPage"

export const metadata: Metadata = {
  title: "Moving Help in Tampa, FL | Redhawk Relocation",
  description:
    "Find reliable moving helpers in Tampa, FL. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
  keywords: "Tampa moving help, Tampa movers, Tampa moving helpers, moving help Tampa FL",
  alternates: {
    canonical: "https://redhawkrelocation.com/locations/tampa",
  },
  openGraph: {
    title: "Moving Help in Tampa, FL | Redhawk Relocation",
    description:
      "Find reliable moving helpers in Tampa, FL. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
    url: "https://redhawkrelocation.com/locations/tampa",
    images: [
      {
        url: "/tampa-move.png",
        width: 1200,
        height: 630,
        alt: "Tampa moving help by Redhawk Relocation",
      },
    ],
  },
}

export default function TampaPage() {
  return <TampaClientPage />
}
