import Stripe from 'stripe';

if (!process.env.STRIPE_KEY) {
    throw new Error('STRIPE_KEY is missing. Please set the environment variable.');
}

const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: "2024-04-10",
});

export default stripe;