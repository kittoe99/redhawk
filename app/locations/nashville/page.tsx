import type { Metadata } from "next"

import NashvilleClientPage from "./nashville-client-page"

export const metadata: Metadata = {
  title: "Moving Help in Nashville, TN | Redhawk Relocation",
  description:
    "Find reliable moving helpers in Nashville, TN. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
  keywords: "Nashville moving help, Nashville movers, Nashville moving helpers, moving help Nashville TN",
  alternates: {
    canonical: "https://redhawkrelocation.com/locations/nashville",
  },
  openGraph: {
    title: "Moving Help in Nashville, TN | Redhawk Relocation",
    description:
      "Find reliable moving helpers in Nashville, TN. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
    url: "https://redhawkrelocation.com/locations/nashville",
    images: [
      {
        url: "/nashville-move.png",
        width: 1200,
        height: 630,
        alt: "Nashville moving help by Redhawk Relocation",
      },
    ],
  },
}

export default function NashvillePage() {
  return <NashvilleClientPage />
}
