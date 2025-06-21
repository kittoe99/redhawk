import type { Metadata } from "next"
import CharlotteClientPage from "./CharlotteClientPage"

export const metadata: Metadata = {
  title: "Moving Help in Charlotte, NC | Redhawk Relocation",
  description:
    "Find reliable moving helpers in Charlotte, NC. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
  keywords: "Charlotte moving help, Charlotte movers, Charlotte moving helpers, moving help Charlotte NC",
  alternates: {
    canonical: "https://redhawkrelocation.com/locations/charlotte",
  },
  openGraph: {
    title: "Moving Help in Charlotte, NC | Redhawk Relocation",
    description:
      "Find reliable moving helpers in Charlotte, NC. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
    url: "https://redhawkrelocation.com/locations/charlotte",
    images: [
      {
        url: "/charlotte-move.png",
        width: 1200,
        height: 630,
        alt: "Charlotte moving help by Redhawk Relocation",
      },
    ],
  },
}

export default function CharlottePage() {
  return <CharlotteClientPage />
}
