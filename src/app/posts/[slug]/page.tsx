import { Avatar } from '@/components/avatar'
import { fetchGQL } from '@/utils/fetch-gql'
import dayjs from 'dayjs'
import { CalendarRange, Heart } from 'lucide-react'
import Image from 'next/image'

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
  const post = await getPostBySlug(params.slug)

  return (
    <main className="relative">
      <Image
        src={post.coverImage}
        alt={post.title}
        width={1200}
        height={1494}
        className="mt-20 h-[498px] w-full object-cover"
      />

      <article className="prose prose-zinc mx-auto my-20 max-w-4xl px-4 prose-a:text-sky-400 prose-a:no-underline">
        <h1 className="text-4xl font-black">{post.title}</h1>

        <div className="-mt-6 flex items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarRange className="h-5 w-5" /> <span>{post.createdAt}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="h-5 w-5" /> <span>364</span>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-20 flex w-full flex-col items-center gap-3">
          <Avatar size="lg" src={post.createdBy.picture} />
          <span className="text-2xl font-medium">{post.createdBy.name}</span>
        </div>
      </article>

      <button className="like-btn fixed bottom-10 right-10 flex h-12 w-12 items-center justify-center rounded-full border bg-white transition-all">
        <Heart className="stroke-zinc-700 transition-colors" />
      </button>
    </main>
  )
}
