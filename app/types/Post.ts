export type TPost = {
  id: string
  content: string
  author: { 
    id: string
    wallet: string
    name?: string 
  }
  totalTips: number
  tipsCount: number
  createdAt: string
}

export type TPostWithTips = {
  id: string
  content: string
  author: { 
    id: string
    wallet: string
    name?: string 
  }
  totalTips: number
  tipsCount: number
  createdAt: string
}