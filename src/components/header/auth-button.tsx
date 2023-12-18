'use client'

import { useSignIn } from '@clerk/nextjs'
import { OAuthStrategy } from '@clerk/nextjs/server'
import { Github } from 'lucide-react'
import { Button } from '../ui/button'

export function AuthButton() {
  const { isLoaded, signIn } = useSignIn()

  function authWith(strategy: OAuthStrategy) {
    if (!isLoaded) return

    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/',
    })
  }

  return (
    <Button onClick={() => authWith('oauth_github')}>
      <Github className="h-5 w-5" /> <span>Sign in with github</span>
    </Button>
  )
}
