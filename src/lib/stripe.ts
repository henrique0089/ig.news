import { Stripe } from 'stripe'

export const stripe = new Stripe(String(process.env.STRIPE_SECRET_API_KEY), {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Ignews-2',
    version: '0.1.0',
  },
})
