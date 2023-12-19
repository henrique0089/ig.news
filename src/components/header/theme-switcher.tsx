'use client'

import { MoonStar, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {theme === 'light' ? (
        <button
          onClick={() => setTheme('dark')}
          className="flex h-7 w-7 items-center justify-center rounded-sm border-2 border-transparent transition-all hover:cursor-auto hover:bg-zinc-50 focus:border-zinc-200"
        >
          <MoonStar className="h-5 w-5 stroke-sky-400" />
        </button>
      ) : (
        <button
          onClick={() => setTheme('light')}
          className="flex h-7 w-7 items-center justify-center rounded-sm border-2 border-transparent transition-all hover:cursor-auto hover:bg-zinc-50 focus:border-zinc-200"
        >
          <Sun className="h-5 w-5 stroke-sky-400" />
        </button>
      )}
    </>
  )
}
