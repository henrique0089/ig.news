'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

type NavLinkProps = ComponentProps<typeof Link>

export function NavLink({ href, ...rest }: NavLinkProps) {
  const path = usePathname()
  const isActive = path === href

  return (
    <Link
      data-active={isActive}
      href={href}
      {...rest}
      className="text-base font-normal text-zinc-400 transition-colors data-[active=true]:font-medium data-[active=true]:text-zinc-950 data-[active=false]:hover:text-zinc-950 dark:text-zinc-600 dark:data-[active=true]:text-zinc-100 dark:data-[active=false]:hover:text-zinc-100"
    />
  )
}
