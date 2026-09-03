import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.carvalai.co.uk"
    return [
    {
        url: baseUrl,
        lastModified: new Date()
    },
    {
        url: `${baseUrl}/predict`,
        lastModified: new Date()
    }
    ]
}