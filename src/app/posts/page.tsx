import { PostCard } from './components/post-card'

export default function Posts() {
  return (
    <main>
      <section className="px-4">
        <div className="mx-auto mb-20 mt-40 flex max-w-5xl flex-wrap items-center justify-between">
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </section>
    </main>
  )
}
