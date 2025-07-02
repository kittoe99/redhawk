"use client"
import { useEffect } from "react"

export function EmbedHeightReporter() {
  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight
      window.parent.postMessage({ widgetHeight: height }, '*')
    }
    
    sendHeight()
    const observer = new ResizeObserver(sendHeight)
    observer.observe(document.body)
    window.addEventListener("load", sendHeight)
    
    return () => {
      observer.disconnect()
      window.removeEventListener("load", sendHeight)
    }
  }, [])
  
  return null
}
