import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Poppins } from "next/font/google"
import { SearchProvider } from "@/components/search/SearchProvider"
import "./globals.css"
import { Suspense } from "react"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Heritage Havens Lucknow - Step Into Royal India",
  description: "Explore historic Havelis, experience timeless culture, and stay in heritage luxury in Lucknow.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${poppins.variable}`}>
      <body className="font-poppins">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchProvider>{children}</SearchProvider>
        </Suspense>
      </body>
    </html>
  )
}
