"use client"

import { TonConnectUIProvider } from "@tonconnect/ui-react"

interface IProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: IProvidersProps) {

  return (
    <TonConnectUIProvider manifestUrl="https://test-three-vert-63.vercel.app/tonconnect-manifest.json">
      {children}
    </TonConnectUIProvider>
  )
}