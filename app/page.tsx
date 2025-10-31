"use client"

import Posts from "./components/UI/Posts"
import Account from "./components/UI/Account"

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-4">
      <Posts />
      <Account />
    </main>
  )
}
