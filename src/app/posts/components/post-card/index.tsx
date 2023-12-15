import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CalendarRange, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function PostCard() {
  return (
    <Link href={`/post/1`}>
      <Card className="w-full max-w-[298px] overflow-hidden">
        <Image
          src="/mock-image.png"
          alt=""
          width={298}
          height={172}
          className="w-full"
        />

        <CardHeader>
          <CardTitle>
            Creating a Monorepo with Lerna & Yarn Workspaces
          </CardTitle>
          <CardDescription>
            In this guide, you will learn how to create a Monorepo to manage
            multipl...
          </CardDescription>
        </CardHeader>

        <div className="px-4">
          <Separator />
        </div>

        <CardFooter className="flex items-center gap-6 p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarRange className="h-5 w-5" /> <span>06 Dec, 2023</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="h-5 w-5" /> <span>364</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
