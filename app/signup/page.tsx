import type { Metadata } from "next"
import SignupClientPage from "./SignupClientPage"

export const metadata: Metadata = {
  title: "Sign Up | Redhawk Relocation",
  description: "Create your Redhawk Relocation account to book moves, track progress, and manage your relocations.",
}

export default function SignupPage() {
  return <SignupClientPage />
}
