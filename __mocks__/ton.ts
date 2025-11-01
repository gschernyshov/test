export class TonClient {
  constructor(_opts: any) {}
  async getBalance(_address: any) {
    return "1000000000" // 1 TON
  }
}

export class Address {
  static parse(address: string) {
    if (address === "invalid") throw new Error("Unknown address type")
    return address
  }
}
