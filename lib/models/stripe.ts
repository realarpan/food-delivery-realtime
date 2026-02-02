import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function createCheckoutSession(orderId: string, amount: number) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Food Delivery Order',
        },
        unit_amount: Math.round(amount * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/cancel`,
    metadata: {
      orderId,
    },
  });
  
  return session;
}
