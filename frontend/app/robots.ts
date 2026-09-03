import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.carvalai.co.uk/"

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/predict"
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}