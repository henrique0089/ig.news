'use client'

import { useAuth } from '@clerk/nextjs'
import { Power } from 'lucide-react'
import { Avatar } from '../avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface UserDropdownProps {
  name: string
  email: string
  avatar: string
}

export function UserDropdown({ name, email, avatar }: UserDropdownProps) {
  const { signOut } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar src={avatar} alt={name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => signOut()}>
            Log out
            <DropdownMenuShortcut>
              <Power className="h-5 w-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
