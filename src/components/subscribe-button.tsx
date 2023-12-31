'use client'

import { api } from '@/lib/axios'
import { getStripeJs } from '@/lib/stripe-js'
import { useSignIn, useUser } from '@clerk/nextjs'
import { MoveRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

interface SubscribeButtonProps {
  hasActiveSubscription: boolean
}

export function SubscribeButton({
  hasActiveSubscription,
}: SubscribeButtonProps) {
  const { isSignedIn } = useUser()
  const { isLoaded, signIn } = useSignIn()
  const router = useRouter()

  async function handleSubscribe() {
    if (!isSignedIn) {
      if (!isLoaded) return

      return signIn.authenticateWithRedirect({
        strategy: 'oauth_github',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      })
    }

    if (hasActiveSubscription) {
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe?.redirectToCheckout({ sessionId })
    } catch (err: any) {
      alert(err)
    }
  }

  return (
    <Button onClick={handleSubscribe} className="mt-6">
      Subscribe now <MoveRight />
    </Button>
  )
}
