import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Login | Redhawk Relocation",
  description: "Sign in to your Redhawk Relocation account to track your moves and manage your bookings.",
}

export default function LoginPage() {
  return <ClientPage />
}
