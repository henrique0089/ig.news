/* eslint-disable prettier/prettier */
import { stripe } from '@/lib/stripe'
import { supabaseClient } from '@/lib/supabase'
import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

type UserData = {
  id: string
  email: string
  stripe_customer_id: string
}

export async function POST() {
  const clerkUser = await currentUser()
  const { getToken } = auth()
  const token = await getToken({ template: 'supabase' })

  if (!token || !clerkUser) {
    return NextResponse.json(
      { message: 'Unauthorized action!' },
      { status: 401 },
    )
  }

  const supabase = await supabaseClient(token)

  const { error, data } = await supabase
    .from('users')
    .select('*')
    .eq('email', clerkUser?.emailAddresses[0].emailAddress)

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }

  const user = data[0] as UserData

  let customerId = user ? user.stripe_customer_id : null

  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: clerkUser.emailAddresses[0].emailAddress,
    })

    await supabase.from('users').insert({
      'email': clerkUser.emailAddresses[0].emailAddress,
      'stripe_customer_id': stripeCustomer.id
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