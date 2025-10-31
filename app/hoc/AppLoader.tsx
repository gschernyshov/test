"use client"

import { useEffect, useState } from "react"
import { useTonWallet, useTonAddress } from "@tonconnect/ui-react"
import { TonClient, Address } from "ton"
import { useTonStore } from "../store/useTonStore"
import { CircularProgress } from "@heroui/react"

export const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)

  const userFriendlyAddress = useTonAddress()
  const wallet = useTonWallet()

  const { setInitialized, setWallet, clearWallet } = useTonStore()

  useEffect(() => {
    if (!userFriendlyAddress || !wallet) {
      clearWallet()
      return
    }

    const init = async () => {
      const client = new TonClient({ endpoint: "https://toncenter.com/api/v2/jsonRPC" })
      const balanceRaw = await client.getBalance(Address.parse(userFriendlyAddress))
      const balance = (Number(balanceRaw) / 1e9).toFixed(3) 

      setWallet({
        address: userFriendlyAddress,
        balance,
        name: "name" in wallet ? wallet.name : undefined,
        imageUrl: "imageUrl" in wallet ? wallet.imageUrl : undefined,
      })

      setInitialized(true)
      setIsLoading(false)
    }

    init()
  }, [setInitialized, userFriendlyAddress, wallet, setWallet, clearWallet])

  if (isLoading) {
    return (
      <CircularProgress aria-label="Loading..." size="lg" />
    )
  }

  return (
    <>
      {children}
    </>
  )    
}
