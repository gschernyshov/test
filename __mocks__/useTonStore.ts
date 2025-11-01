export const useTonStore = jest.fn(() => ({
  setInitialized: jest.fn(),
  setWallet: jest.fn(),
  clearWallet: jest.fn()
}))