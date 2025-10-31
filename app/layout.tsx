import type { Metadata } from "next"
import { Providers } from "./providers/providers"
import { AppLoader } from "./hoc/AppLoader"
import ConnectButton from "./components/common/ConnectButton"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Ton Tipping App",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="ru"
      className="md:p-5"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased md:border-2 md:border-blue-900 md:rounded-4xl`}
      >
        <Providers>
          <AppLoader>
            {children}
            <ConnectButton />
          </AppLoader>
        </Providers>
      </body>
    </html>
  )
}
