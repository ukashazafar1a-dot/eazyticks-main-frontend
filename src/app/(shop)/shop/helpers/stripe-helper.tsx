// lib/stripe-helper.ts
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

// Dummy payment intent creator (for testing only!)
export async function createDummyPaymentIntent(amount: number, currency: string = "usd") {
  // This is a dummy function that creates a fake client secret
  // In production, you would call your backend API
  // For testing with Stripe Elements, we need a real client secret
  
  // For DEMO purposes only - this creates a simulated payment intent
  // You'll need a real backend for actual payments
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // This is a dummy client secret format - NOT REAL!
      // For real integration, you MUST create payment intent on backend
      const dummyClientSecret = `pi_dummy_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`;
      
      console.warn("⚠️ Using dummy payment intent - for testing only!");
      console.warn("Real payments require backend API to create Stripe PaymentIntent");
      
      resolve({
        clientSecret: dummyClientSecret,
        success: true
      });
    }, 500);
  });
}

// Helper to format amount
export function formatAmount(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}