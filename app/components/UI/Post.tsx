"use client"

import { TPost } from "@/app/types/Post"

interface IPostProps {
  post: TPost
}

const Post = ({ post }: IPostProps) => {
  return (
    <div>
      <h2 className="font-semibold">{post.content}</h2>
      <p className="text-sm text-gray-500">
        By: {post.author.name || post.author.wallet}
      </p>
      <p className="text-sm text-gray-500">
        Total tips: {post.totalTips} TON ({post.tipsCount} tips)
      </p>
    </div>
  )
}

export default Post
