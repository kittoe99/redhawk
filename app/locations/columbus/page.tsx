import type { Metadata } from "next"
import ColumbusClientPage from "./ColumbusClientPage"

export const metadata: Metadata = {
  title: "Moving Help in Columbus, OH | Redhawk Relocation",
  description:
    "Find reliable moving helpers in Columbus, OH. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
  keywords: "Columbus moving help, Columbus movers, Columbus moving helpers, moving help Columbus OH",
  alternates: {
    canonical: "https://redhawkrelocation.com/locations/columbus",
  },
  openGraph: {
    title: "Moving Help in Columbus, OH | Redhawk Relocation",
    description:
      "Find reliable moving helpers in Columbus, OH. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
    url: "https://redhawkrelocation.com/locations/columbus",
    images: [
      {
        url: "/columbus-move.png",
        width: 1200,
        height: 630,
        alt: "Columbus moving help by Redhawk Relocation",
      },
    ],
  },
}

export default function ColumbusPage() {
  return <ColumbusClientPage />
}
