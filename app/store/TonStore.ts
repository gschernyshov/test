import { create } from "zustand"

interface ITonState {
  address: string | null
  balance: string | null
  walletName: string | null
  walletImage: string | null
  isInitialized: boolean
  setInitialized: (isInitialized: boolean) => void
  setWallet: (data: { address: string; balance: string; name?: string; imageUrl?: string }) => void
  clearWallet: () => void
}

export const useTonStore = create<ITonState>((set) => ({
  isInitialized: false,
  address: null,
  balance: null,
  walletName: null,
  walletImage: null,

  setInitialized: (isInitialized) => set({ isInitialized }),

  setWallet: ({ address, balance, name, imageUrl }) =>
    set({ 
        address, 
        balance,
        walletName: name ?? null, 
        walletImage: imageUrl ?? null, 
    }),

  clearWallet: () =>
    set({
      address: null,
      balance: null,
      walletName: null,
      walletImage: null,
    }),
}))
