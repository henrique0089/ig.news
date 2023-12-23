'use client'

import { api } from '@/lib/axios'
import { Heart } from 'lucide-react'
import { useState } from 'react'

type Like = {
  userId: string
  postId: string
}

interface LikeButtonProps {
  likesData: Like[]
  currentUserId: string
  postId: string
}

export function LikeButton({
  likesData,
  currentUserId,
  postId,
}: LikeButtonProps) {
  const [likes, setLikes] = useState(likesData)
  const alreadyLiked = likes.find((like) => {
    return like.postId === postId && like.userId === currentUserId
  })

  async function handleLike() {
    if (alreadyLiked) {
      try {
        await api.delete('/likes', {
          params: {
            userId: currentUserId,
            postId,
          },
        })

        const likesArr = likes.filter(
          (like) => like.userId !== currentUserId && like.postId !== postId,
        )

        setLikes(likesArr)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await api.post('/likes', {
          userId: currentUserId,
          postId,
        })

        setLikes((state) => [...state, { userId: currentUserId, postId }])
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <button
      onClick={handleLike}
      className="fixed bottom-10 right-10 flex h-12 w-12 items-center justify-center rounded-full border bg-white transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 max-[500px]:bottom-5 max-[500px]:right-5"
    >
      <Heart
        data-liked={!!alreadyLiked}
        className="stroke-zinc-700 transition-colors data-[liked=true]:fill-sky-400 data-[liked=true]:stroke-sky-400 dark:stroke-zinc-400 dark:data-[liked=true]:stroke-sky-400"
      />
    </button>
  )
}
