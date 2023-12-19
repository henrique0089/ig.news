import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="bg-mask relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      <h2 className="text-2xl font-bold text-muted-foreground">
        👏 Hey, welcome
      </h2>

      <h1 className="mt-6 max-w-[820px] text-center text-6xl font-black text-zinc-900 dark:text-white">
        Start your journey now - click to explore the exciting world of{' '}
        <span className="text-sky-400">React!</span>
      </h1>

      <p className="mt-4 max-w-[652px] text-center text-2xl text-muted-foreground">
        Get ready to transform your ideas into extraordinary interactive
        experiences!{' '}
        <strong className="font-medium text-sky-400">for $9,90 month</strong>
      </p>

      <Button className="mt-6">
        Subscribe now <MoveRight />
      </Button>

      <div className="absolute -bottom-20 -right-20 h-72 w-72  rounded-full bg-sky-400 blur-[160px]" />
    </main>
  )
}
