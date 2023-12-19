import dayjs from 'dayjs'

import { fetchGQL } from '@/utils/fetch-gql'
import { PostCard } from './components/post-card'

type PostData = {
  id: string
  title: string
  excerpt: string
  slug: string
  coverImage: {
    url: string
  }
  createdAt: Date
}

const getPostsData = async () => {
  const query = `
    query Posts {
      posts {
        id
        title
        excerpt
        slug
        coverImage {
          url
        }
        createdAt
      }
    }
  `

  return await fetchGQL<{ posts: PostData[] }>(query)
}

export default async function Posts() {
  const res = await getPostsData()
  const posts = res.posts?.map((post) => {
    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      coverImage: post.coverImage.url,
      createdAt: dayjs(post.createdAt).format('DD MMM[, ]YYYY'),
    }
  })

  return (
    <main>
      <section className="px-4">
        <div className="mx-auto mb-20 mt-40 flex max-w-5xl flex-wrap items-center justify-between max-[500px]:mt-28 max-[500px]:flex-col max-[500px]:flex-nowrap max-[500px]:justify-normal max-[500px]:gap-12">
          {posts?.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </section>
    </main>
  )
}
