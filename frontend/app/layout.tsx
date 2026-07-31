import type { Metadata } from "next"
import { IBM_Plex_Sans, Geist } from "next/font/google"
import Header from "./Header"
import "./globals.css"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Car Price Predictor",
  description: "AI powered vehicle valuation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={ibmPlexSans.className}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
