"use client"
import type React from "react"
import { useEffect, useRef } from "react"

type EstimatorEmbedFrameProps = React.ComponentProps<"iframe"> & {
  src?: string
};

export function EstimatorEmbedFrame({ src = "/embed/junk-estimator", ...rest }: EstimatorEmbedFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (typeof event.data === "object" && event.data?.widgetHeight) {
        const height = Number(event.data.widgetHeight)
        if (!Number.isNaN(height) && iframeRef.current) {
          iframeRef.current.style.height = `${height}px`
        }
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
<iframe
      ref={iframeRef}
      src={src}
      {...rest}
      className={rest.className ?? "w-full border-0"}
      style={{ height: "800px", ...rest.style }}
    />
  )
}
