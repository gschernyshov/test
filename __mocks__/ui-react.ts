export const useTonAddress = jest.fn(() => "mockAddress")

export const useTonWallet = jest.fn(() => ({
  address: "mockAddress",
  balance: 100,
  name: "Mock Wallet",
  imageUrl: null,
}))