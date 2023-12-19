import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { AuthButton } from './auth-button'
import { NavLink } from './nav-link'
import { ThemeSwitcher } from './theme-switcher'
import { UserDropdown } from './user-dropdown'

export async function Header() {
  const user = await currentUser()

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center bg-white px-4 dark:bg-zinc-950">
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
          {user ? (
            <>
              <ThemeSwitcher />
              <UserDropdown
                name={`${user.firstName} ${user.lastName}`}
                email={user.emailAddresses[0].emailAddress}
                avatar={user.imageUrl}
              />
            </>
          ) : (
            <AuthButton />
          )}
        </div>
      </div>
    </header>
  )
}
