import { NextResponse } from "next/server"

export async function GET() {
  // Use the actual domain name
  const baseUrl = "https://redhawkrelocation.com"

  // Get current date for lastModified
  const date = new Date().toISOString()

  // Create XML content with the correct domain
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`

  // Return the XML with the correct content type
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      // Add a user-agent header to help with firewall issues
      "User-Agent": "RedhawkRelocation-SitemapGenerator/1.0",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
