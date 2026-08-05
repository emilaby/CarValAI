import type { Metadata } from "next"
import { IBM_Plex_Sans } from "next/font/google"
import Header from "@/components/Header"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Car Price Predictor",
  description: "AI powered vehicle valuation",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ibmPlexSans.className}>
        <Header/>
        {children}
        <Analytics/>
      </body>
    </html>
  )
}
