import "@/styles/global.scss"
import type { Metadata } from "next"
import { Albert_Sans, Mukta } from "next/font/google"
import "./globals.css"
import Providers from "@/components/providers"
import { SmoothLayout } from "@/layouts/smooth"

const albertSans = Albert_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-albert-sans",
})

const mukta = Mukta({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-mukta",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${albertSans.variable} ${mukta.variable} antialiased`}>
        <Providers>
          <SmoothLayout>{children}</SmoothLayout>
        </Providers>
      </body>
    </html>
  )
}
