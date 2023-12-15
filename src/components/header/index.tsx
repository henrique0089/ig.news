import { Github, MoonStar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center bg-transparent px-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <div className="flex items-center gap-9">
          <Link href="/">
            <Image src="/logo.svg" alt="" width={40} height={40} />
          </Link>

          <nav>
            <ul className="flex items-center gap-8">
              <li>
                <NavLink href="/">Home</NavLink>
              </li>

              <li>
                <NavLink href="/posts">Posts</NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-9">
          <button className="flex h-7 w-7 items-center justify-center rounded-sm border-2 border-transparent transition-all hover:cursor-auto hover:bg-zinc-50 focus:border-zinc-200">
            <MoonStar className="h-5 w-5 stroke-sky-400" />
          </button>

          <Button>
            <Github className="h-5 w-5" /> <span>Sign in with github</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
