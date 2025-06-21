import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL for your site
  const baseUrl = "https://redhawkrelocation.com"

  // Get current date for lastModified
  const currentDate = new Date()

  // City data for better SEO
  const cities = [
    { slug: "phoenix", priority: 0.8 },
    { slug: "austin", priority: 0.8 },
    { slug: "nashville", priority: 0.7 },
    { slug: "boise", priority: 0.7 },
    { slug: "raleigh", priority: 0.7 },
    { slug: "tampa", priority: 0.7 },
    { slug: "charlotte", priority: 0.7 },
    { slug: "denver", priority: 0.7 },
    { slug: "columbus", priority: 0.7 },
    { slug: "salt-lake-city", priority: 0.7 },
    { slug: "baltimore", priority: 0.7 },
  ]

  const basePages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/quote`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service-type`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/junk-estimator`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]

  // Add city-specific pages
  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/locations/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: city.priority,
  }))

  // Add service-specific pages for SEO
  const servicePages = [
    {
      url: `${baseUrl}/services/local-moving`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/long-distance-moving`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/commercial-moving`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/specialty-moving`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/apartment-moving`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services/house-moving`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services/labor-only`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services/junk-removal`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]

  return [...basePages, ...cityPages, ...servicePages]
}
