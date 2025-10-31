"use client"

import { TonConnectUIProvider } from "@tonconnect/ui-react"

interface IProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: IProvidersProps) {

  return (
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
      {children}
    </TonConnectUIProvider>
  )
}