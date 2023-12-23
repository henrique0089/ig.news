import { SubscribeButton } from '@/components/subscribe-button'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { currentUser } from '@clerk/nextjs'

export default async function Home() {
  const price = await stripe.prices.retrieve('price_1OPrYQE7SjI6Paupfy9qIFYY')
  const amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(price.unit_amount) / 100)

  const user = await currentUser()

  const userActiveSubscription = await prisma.subscripton.findFirst({
    where: {
      status: 'active',
      user_id: user?.id,
    },
  })

  return (
    <main className="bg-mask relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      <h2 className="text-2xl font-bold text-muted-foreground dark:text-zinc-300">
        👏 Hey, welcome
      </h2>

      <h1 className="mt-6 max-w-[820px] text-center text-6xl font-black text-zinc-900 dark:text-zinc-100 max-[500px]:text-3xl">
        Start your journey now - click to explore the exciting world of{' '}
        <span className="text-sky-400">React!</span>
      </h1>

      <p className="mt-4 max-w-[652px] text-center text-2xl text-muted-foreground dark:text-zinc-300">
        Get ready to transform your ideas into extraordinary interactive
        experiences!{' '}
        <strong className="font-medium text-sky-400">for {amount} month</strong>
      </p>

      <SubscribeButton hasActiveSubscription={!!userActiveSubscription} />

      <div className="absolute -bottom-20 -right-20 h-72 w-72  rounded-full bg-sky-400 blur-[160px] max-[500px]:-bottom-24 max-[500px]:-right-24" />
    </main>
  )
}
