// Create a reusable SEO component for consistent metadata across pages
import Head from "next/head"

interface SEOProps {
  title: string
  description: string
  canonicalUrl: string
  ogType?: string
  ogImage?: string
  ogImageAlt?: string
  keywords?: string
}

export function SEOHead({
  title,
  description,
  canonicalUrl,
  ogType = "website",
  ogImage = "/images/redhawk-movers-sofa.png",
  ogImageAlt = "Redhawk Relocation professional movers",
  keywords = "moving company, Phoenix movers, relocation services",
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />

      {/* Location information for local SEO */}
      <meta name="geo.placename" content="Austin, Texas" />
      <meta name="geo.position" content="30.4267;-97.7553" />
      <meta name="geo.region" content="US-TX" />
      <meta name="ICBM" content="30.4267, -97.7553" />
    </Head>
  )
}
