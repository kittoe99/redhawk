import type { Metadata } from "next"
import PhoenixClientPage from "./PhoenixClientPage"

export const metadata: Metadata = {
  title: "Moving Help in Phoenix, AZ | Redhawk Relocation",
  description:
    "Find reliable moving helpers in Phoenix, AZ. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
  keywords: "Phoenix moving help, Phoenix movers, Phoenix moving helpers, moving help Phoenix AZ",
  alternates: {
    canonical: "https://redhawkrelocation.com/locations/phoenix",
  },
  openGraph: {
    title: "Moving Help in Phoenix, AZ | Redhawk Relocation",
    description:
      "Find reliable moving helpers in Phoenix, AZ. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
    url: "https://redhawkrelocation.com/locations/phoenix",
    images: [
      {
        url: "/phoenix-service-area-map.png",
        width: 1200,
        height: 630,
        alt: "Phoenix moving help by Redhawk Relocation",
      },
    ],
  },
}

export default function PhoenixPage() {
  return <PhoenixClientPage />
}
