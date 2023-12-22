/* eslint-disable prettier/prettier */
import { stripe } from '@/lib/stripe'
import { supabaseClient } from '@/lib/supabase'
import { auth } from '@clerk/nextjs'

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
) {
  const { getToken } = auth()
  const token = await getToken({ template: 'supabase' })
  const supabase = await supabaseClient(String(token))

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('stripe_customer_id', customerId)
    .single()

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  if (createAction) {
    await supabase.from('subscriptions').insert({
      'id': subscription.id,
      'user_id': data.id,
      'status': subscription.status,
      'price_id': subscription.items.data[0].price.id,
    })
  } else {
    await supabase
    .from('subscriptions')
    .update({
      'user_id': data.id,
      'status': subscription.status,
      'price_id': subscription.items.data[0].price.id,
    })
    .eq('id', subscription.id)
  }
}
