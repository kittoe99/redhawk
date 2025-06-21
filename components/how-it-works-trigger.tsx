"use client"

import { Button } from "@/components/ui/button"
import { useHowItWorksPopup } from "./how-it-works-popup"

export function HowItWorksTrigger() {
  const { openPopup, HowItWorksPopup } = useHowItWorksPopup()

  return (
    <>
      <Button variant="outline" onClick={openPopup} className="text-primary-600 border-primary-600 hover:bg-primary-50">
        How It Works
      </Button>
      <HowItWorksPopup />
    </>
  )
}
