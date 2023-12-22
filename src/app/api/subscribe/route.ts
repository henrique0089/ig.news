/* eslint-disable prettier/prettier */
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST() {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    return NextResponse.json(
      { message: 'Unauthorized action!' },
      { status: 401 },
    )
  }

  const user = await prisma.user.findUnique({
    where: {
      email: clerkUser?.emailAddresses[0].emailAddress
    }
  })

  let customerId = user ? user.stripe_customer_id : null

  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: clerkUser.emailAddresses[0].emailAddress,
    })

    await prisma.user.create({
      data: {
        email: clerkUser.emailAddresses[0].emailAddress,
        stripe_customer_id: stripeCustomer.id
      }
    })

    customerId = stripeCustomer.id
  }

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [
      { price: 'price_1OPrYQE7SjI6Paupfy9qIFYY', quantity: 1 }
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCESS_URL as string,
    cancel_url: process.env.STRIPE_CANCEL_URL as string
  })

  return NextResponse.json({ sessionId: stripeCheckoutSession.id })
}
