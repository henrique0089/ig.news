import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CalendarRange, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface PostCardProps {
  post: {
    slug: string
    title: string
    excerpt: string
    coverImage: string
    createdAt: string
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post?.slug}`} className="post-card-a">
      <Card className="w-full max-w-[298px] overflow-hidden">
        <Image
          src={post?.coverImage}
          alt={post?.title}
          width={298}
          height={172}
          className="w-full"
        />

        <CardHeader>
          <CardTitle>{post?.title}</CardTitle>
          <CardDescription className="ellipsis-text">
            {post?.excerpt}
          </CardDescription>
        </CardHeader>

        <div className="px-4">
          <Separator />
        </div>

        <CardFooter className="flex items-center gap-6 p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarRange className="h-5 w-5" /> <span>{post.createdAt}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="h-5 w-5" /> <span>364</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
