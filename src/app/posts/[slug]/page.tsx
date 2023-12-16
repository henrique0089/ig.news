import { Avatar } from '@/components/avatar'
import { CalendarRange, Heart } from 'lucide-react'
import Image from 'next/image'

interface PostProps {
  params: {
    slug: string
  }
}

export default function Post({ params }: PostProps) {
  return (
    <main className="relative">
      <Image
        src="/rocketseat.png"
        alt=""
        width={1200}
        height={1494}
        className="mt-20 h-[498px] w-full object-cover"
      />

      <article className="prose prose-zinc prose-a:text-sky-400 prose-a:no-underline mx-auto my-20 max-w-4xl px-4">
        <h1 className="text-4xl font-black">
          Past, Present, and Future of React State Management
        </h1>

        <div className="-mt-6 flex items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarRange className="h-5 w-5" /> <span>06 Dec, 2023</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="h-5 w-5" /> <span>364</span>
          </div>
        </div>

        <div>
          <p>
            React was introduced in May 2013. Its paradigm shift was that your
            UI was a function of your state. Given some component state, React
            can determine what your component will look like. React is built
            upon the idea of state. However, state has long been one of the most
            difficult parts of building a React application. Let's imagine state
            management in React as a rugged tool belt. You've used this tool
            belt for years, slowly adding new tools as needed. Each tool serves
            a very specific purpose. You don't use your hammer to screw in
            bolts. As a craftsman, you've learned the right time and place to
            use each tool. State management with React is a rugged tool belt,
            but not everyone has the prior experience to know which tool to
            reach for. This post will explain the past, present, and future of
            state management to help you make the correct decision for your
            team, project, or organization. UI State – State used for
            controlling interactive parts of our application (e.g. dark mode
            toggle, modals). Server Cache State – State from the server, which
            we cache on the client-side for quick access (e.g. call an API,
            store the result, use it in multiple places). Form State – The many
            different states of a form (e.g. loading, submitting, disabled,
            validation, retrying). There's also controlled & uncontrolled form
            state. URL State – State managed by the browser (e.g. filter
            products, saving to query parameters, and refreshing the page to see
            the same products filtered) State Machine – An explicit model of
            your state over time (e.g. a stoplight goes from green → yellow →
            red, but never green → red). React was introduced in May 2013. Its
            paradigm shift was that your UI was a function of your state. Given
            some component state, React can determine what your component will
            look like. React is built upon the idea of state. However, state has
            long been one of the most difficult parts of building a React
            application. Let's imagine state management in React as a rugged
            tool belt. You've used this tool belt for years, slowly adding new
            tools as needed. Each tool serves a very specific purpose. You don't
            use your hammer to screw in bolts. As a craftsman, you've learned
            the right time and place to use each tool. State management with
            React is a rugged tool belt, but not everyone has the prior
            experience to know which tool to reach for. This post will explain
            the past, present, and future of state management to help you make
            the correct decision for your team, project, or organization. UI
            State – State used for controlling interactive parts of our
            application (e.g. dark mode toggle, modals). Server Cache State –
            State from the server, which we cache on the client-side for quick
            access (e.g. call an API, store the result, use it in multiple
            places). Form State – The many different states of a form (e.g.
            loading, submitting, disabled, validation, retrying). There's also
            controlled & uncontrolled form state. URL State – State managed by
            the browser (e.g. filter products, saving to query parameters, and
            refreshing the page to see the same products filtered) State Machine
            – An explicit model of your state over time (e.g. a stoplight goes
            from green → yellow → red, but never green → red).
          </p>
        </div>

        <div className="mt-20 flex w-full flex-col items-center gap-3">
          <Avatar size="lg" />
          <span className="text-2xl font-medium">Henrique Monteiro</span>
        </div>
      </article>

      <button className="like-btn fixed bottom-10 right-10 flex h-12 w-12 items-center justify-center rounded-full border bg-white transition-all">
        <Heart className="stroke-zinc-700 transition-colors" />
      </button>
    </main>
  )
}
