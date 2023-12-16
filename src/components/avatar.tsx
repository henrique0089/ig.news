import { User2 } from 'lucide-react'
import {
  Avatar as AvatarContainer,
  AvatarFallback,
  AvatarImage,
} from './ui/avatar'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'lg'
}

export function Avatar({ src, alt, size = 'sm' }: AvatarProps) {
  return (
    <AvatarContainer
      data-size={size}
      className="data-[size=lg]:h-24 data-[size=lg]:w-24"
    >
      <AvatarFallback>
        <User2
          data-size={size}
          className="h-5 w-5 data-[size=lg]:h-9 data-[size=lg]:w-9"
        />
      </AvatarFallback>
      <AvatarImage src={src} alt={alt} />
    </AvatarContainer>
  )
}
