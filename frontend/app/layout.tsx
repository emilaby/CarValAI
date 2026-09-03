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
  viewport: "width=device-width, initial-scale=1",
  title: "CarValAI | AI Powered Car Valuations",
  description: "Predicts current vehicle value and a forecast for the next 5 years",
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
