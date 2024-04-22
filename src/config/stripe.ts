export const stripeConfig = {
  yourDomain: process.env.YOUR_DOMAIN,
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  secretKey: process.env.STRIPE_SECRET_KEY,
  successUrl: process.env.STRIPE_SUCCESS_URL,
  cancelUrl: process.env.STRIPE_CANCEL_URL,
};
