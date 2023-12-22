import { Avatar } from '@/components/avatar'
import { prisma } from '@/lib/prisma'
import { fetchGQL } from '@/utils/fetch-gql'
import { auth } from '@clerk/nextjs'
import dayjs from 'dayjs'
import { CalendarRange, Heart } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

interface PostProps {
  params: {
    slug: string
  }
}

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
    content: post.content.html,
    createdBy: post.createdBy,
    createdAt: dayjs(post.createdAt).format('DD MMM[, ]YYYY'),
  }

  return postData
}

export default async function Post({ params }: PostProps) {
  const { sessionId, user } = auth()

  if (!sessionId) redirect('/')

  const prismaUser = await prisma.user.findFirst({
    where: {
      email: user?.emailAddresses[0].emailAddress,
    },
  })

  const userActiveSubscription = await prisma.subscripton.findFirst({
    where: {
      status: 'active',
      user_id: prismaUser?.id,
    },
  })

  if (sessionId && !userActiveSubscription) {
    redirect(`/posts/preview/${params.slug}`)
  }

  const post = await getPostBySlug(params.slug)

  return (
    <main className="relative">
      <Image
        src={post.coverImage}
        alt={post.title}
        width={1200}
        height={1494}
        className="mt-20 h-[498px] w-full object-cover max-[500px]:h-[300px]"
      />

      <article className="prose prose-zinc mx-auto my-20  max-w-4xl px-4 prose-a:text-sky-400 prose-a:no-underline dark:text-zinc-300 dark:prose-strong:text-zinc-300 max-[500px]:my-10">
        <h1 className="text-4xl font-black dark:text-zinc-100 max-[500px]:text-center max-[500px]:text-3xl">
          {post.title}
        </h1>

        <div className="-mt-6 flex items-center gap-6 max-[500px]:-mt-4 max-[500px]:justify-center">
          <div className="flex items-center gap-2 text-muted-foreground dark:text-zinc-400">
            <CalendarRange className="h-5 w-5" /> <span>{post.createdAt}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground dark:text-zinc-400">
            <Heart className="h-5 w-5" /> <span>364</span>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-20 flex w-full flex-col items-center gap-3">
          <Avatar size="lg" src={post.createdBy.picture} />
          <span className="text-2xl font-medium">{post.createdBy.name}</span>
        </div>
      </article>

      <button className="fixed bottom-10 right-10 flex h-12 w-12 items-center justify-center rounded-full border bg-white transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 max-[500px]:bottom-5 max-[500px]:right-5">
        <Heart className="stroke-zinc-700 transition-colors dark:stroke-zinc-400" />
      </button>
    </main>
  )
}
