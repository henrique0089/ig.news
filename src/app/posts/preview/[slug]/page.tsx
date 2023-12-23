import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { fetchGQL } from '@/utils/fetch-gql'
import dayjs from 'dayjs'
import { CalendarRange, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type PostDetails = {
  post: {
    id: string
    title: string
    coverImage: {
      url: string
    }
    content: {
      html: string
    }
    createdBy: {
      name: string
      picture: string
    }
    createdAt: Date
  }
}

interface PreviewProps {
  params: {
    slug: string
  }
}

const getPostBySlug = async (slug: string) => {
  const query = `
    query Post {
      post(
        where: {slug: "${slug}"}
      ) {
        content {
          html
        }
        coverImage {
          url
        }
        createdAt
        createdBy {
          name
          picture
        }
        id
        title
      }
    }
  `

  const { post } = await fetchGQL<PostDetails>(query)

  const postData = {
    id: post.id,
    title: post.title,
    coverImage: post.coverImage.url,
    content: post.content.html.split('</p>').slice(0, 4).join('</p>'),
    createdBy: post.createdBy,
    createdAt: dayjs(post.createdAt).format('DD MMM[, ]YYYY'),
  }

  return postData
}

export default async function Preview({ params }: PreviewProps) {
  const post = await getPostBySlug(params.slug)

  const likesCount = await prisma.like.count()

  return (
    <main>
      <Image
        src={post.coverImage}
        alt={post.title}
        width={1200}
        height={1494}
        className="mt-20 h-[498px] w-full object-cover max-[500px]:h-[300px]"
      />

      <article className="prose prose-zinc mx-auto my-20 max-w-4xl px-4 prose-a:text-sky-400 prose-a:no-underline dark:text-zinc-300 dark:prose-strong:text-zinc-300 max-[500px]:my-10">
        <h1 className="text-4xl font-black dark:text-zinc-100 max-[500px]:text-center max-[500px]:text-3xl">
          {post.title}
        </h1>

        <div className="-mt-6 flex items-center gap-6 max-[500px]:-mt-4 max-[500px]:justify-center">
          <div className="flex items-center gap-2 text-muted-foreground dark:text-zinc-400">
            <CalendarRange className="h-5 w-5" /> <span>{post.createdAt}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground dark:text-zinc-400">
            <Heart className="h-5 w-5" /> <span>{likesCount}</span>
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="preview"
        />
      </article>

      <div className="my-8 flex justify-center px-4">
        <Button asChild className="h-14 w-full max-w-4xl">
          <div>
            😊 Wanna continue reading? <Link href="/">Subscribe now</Link>
          </div>
        </Button>
      </div>
    </main>
  )
}
