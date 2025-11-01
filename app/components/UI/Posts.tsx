"use client"

import { useEffect, useState } from "react"
import Post from "./Post"
import { TPost } from "@/app/types/Post"

const Posts = () => {
  const [posts, setPosts] = useState<TPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const loadPosts = async () => {
      try {
        const res = await fetch("/api/posts", { 
          signal,
        })
        const data = await res.json()

        if (signal.aborted) return

        if (data.success) {
          setPosts(data.posts)
        } else {
          setError(data.error)
        }
      } catch (e: unknown) {
        if (signal.aborted) return
        if (e instanceof Error) {
          console.error("При загрузке постов возникла ошибка: ", e.message)
          setError("При загрузке постов возникла ошибка")
        } else {
          console.error("При загрузке постов возникла неизвестная ошибка: ", e)
          setError("При загрузке постов возникла неизвестная ошибка")
        }
      } finally {
        if (!signal.aborted) setLoading(false)
      }
    }

    loadPosts()

    return () => {
      abortController.abort()
    }
  }, [])

    
  if (loading) return <p>Loading posts...</p>
  
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="">
      {posts.length === 0 ? (
        <p>К сожалению, постов пока нет. Хотите добавить?</p>
      ) : (
        posts.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  )
}

export default Posts
