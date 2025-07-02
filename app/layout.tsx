import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import "./hawk-loader.css"
import { ThemeProvider } from "@/components/theme-provider"
import { HawkLoader } from "@/components/hawk-loader"
import { LoaderProvider } from "@/contexts/loader-context"
import { MainNavWrapper } from "@/components/main-nav-wrapper"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: {
    default: "Redhawk Relocation: On-Demand Moving Help Marketplace | Phoenix, AZ",
    template: "%s | Redhawk Relocation Marketplace",
  },
  description:
    "Redhawk Relocation is a marketplace connecting customers with independent moving helpers. Find verified, affordable moving assistance starting at $35/hour in 10 major US cities.",
  keywords:
    "moving help marketplace, find moving helpers, book moving help, moving labor platform, independent movers, moving assistance, moving help booking",
  authors: [{ name: "Redhawk Relocation" }],
  creator: "Redhawk Relocation",
  publisher: "Redhawk Relocation",
  formatDetection: {
    email: false,
    telephone: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://redhawkrelocation.com",
    title: "Redhawk Relocation: On-Demand Moving Help Marketplace | Phoenix, AZ",
    description:
      "Book verified, independent moving helpers through our marketplace. Find affordable moving assistance in 10 major US cities with transparent pricing and no hidden fees.",
    siteName: "Redhawk Relocation Marketplace",
    images: [
      {
        url: "/images/redhawk-movers-sofa.png",
        width: 1200,
        height: 630,
        alt: "Redhawk Relocation - Moving Help Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redhawk Relocation: On-Demand Moving Help Marketplace | Phoenix, AZ",
    description:
      "Book verified, independent moving helpers through our marketplace. Find affordable moving assistance in 10 major US cities with transparent pricing and no hidden fees.",
    images: ["/images/redhawk-movers-sofa.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://redhawkrelocation.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d30000" },
    { media: "(prefers-color-scheme: dark)", color: "#b30000" },
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="bg-white min-h-screen flex flex-col">
        <LoaderProvider>
          <HawkLoader />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <MainNavWrapper />
            <main className="flex-1 w-full pt-20 md:pt-24">
              <div className="w-full">
                {children}
              </div>
            </main>
          </ThemeProvider>
        </LoaderProvider>
      </body>
    </html>
  )
}
