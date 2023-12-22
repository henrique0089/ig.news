/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const config = {
  api: {
    bodyParser: false,
  },
}

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export async function POST(req: NextRequest) {
  const buf = await req.text()
  const secret = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      String(secret),
      'whsec_f19c0e8bc69996b52d02eb2975f839b98e33899d5d62e8f9599c80864607d04d',
    )
  } catch (err: any) {
    return NextResponse.json(
      { message: `Webhook error: ${err.message}` },
      { status: 400 },
    )
  }

  const { type } = event

  if (relevantEvents.has(type)) {
    try {
      switch (type) {
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted': {
          const subscriptionObj = event.data.object as Stripe.Subscription

          const user = await prisma.user.findUnique({
            where: {
              stripe_customer_id: subscriptionObj.customer.toString(),
            }
          })

          const subscription = await stripe.subscriptions.retrieve(
            subscriptionObj.id,
          )

          await prisma.subscripton.update({
            where: {
              id: subscription.id,
            },
            data: {
              user_id: user!.id,
              status: subscription.status,
              price_id: subscription.items.data[0].price.id
            }
          })

          break
        }
        case 'checkout.session.completed': {
          const checkoutSession = event.data.object as Stripe.Checkout.Session

          const user = await prisma.user.findUnique({
            where: {
              stripe_customer_id: checkoutSession.customer?.toString(),
            }
          })

          const subscription = await stripe.subscriptions.retrieve(
            checkoutSession.subscription?.toString() as string,
          )

          await prisma.subscripton.create({
            data: {
              user_id: user!.id,
              status: subscription.status,
              price_id: subscription.items.data[0].price.id
            }
          })

          break
        }
        default:
          throw new Error('Unhandled event.')
      }
    } catch (error) {
      return NextResponse.json(
        { message: 'Webhook handler failed!' },
        { status: 400 },
      )
    }
  }

  return NextResponse.json({ received: true })
}
