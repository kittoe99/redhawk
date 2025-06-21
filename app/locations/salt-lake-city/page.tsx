import type { Metadata } from "next"
import SaltLakeCityClientPage from "./SaltLakeCityClientPage"

export const metadata: Metadata = {
  title: "Moving Help in Salt Lake City, UT | Redhawk Relocation",
  description:
    "Find reliable moving helpers in Salt Lake City, UT. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
  keywords:
    "Salt Lake City moving help, Salt Lake City movers, Salt Lake City moving helpers, moving help Salt Lake City UT",
  alternates: {
    canonical: "https://redhawkrelocation.com/locations/salt-lake-city",
  },
  openGraph: {
    title: "Moving Help in Salt Lake City, UT | Redhawk Relocation",
    description:
      "Find reliable moving helpers in Salt Lake City, UT. Our platform connects you with independent moving professionals for loading, unloading, packing and more.",
    url: "https://redhawkrelocation.com/locations/salt-lake-city",
    images: [
      {
        url: "/salt-lake-city-move.png",
        width: 1200,
        height: 630,
        alt: "Salt Lake City moving help by Redhawk Relocation",
      },
    ],
  },
}

export default function SaltLakeCityPage() {
  return <SaltLakeCityClientPage />
}
