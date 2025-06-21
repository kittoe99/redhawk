import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"
import { ContactPageContent } from "@/components/contact-page-content"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"

export const metadata: Metadata = {
  title: "Contact Us - Redhawk Relocation | Get Your Moving Quote Today",
  description:
    "Contact Redhawk Relocation for professional moving services. Get a free quote, ask questions, or schedule your move. Available nationwide with expert movers.",
  keywords:
    "contact redhawk relocation, moving company contact, get moving quote, schedule move, professional movers contact",
}

export default function ContactPage() {
  return (
    <>
      <ScrollProgressBar />
      <MainNav />
      <main className="min-h-screen bg-white">
        <ContactPageContent />
      </main>
      <HawkFooter />
    </>
  )
}
