import { NextApiRequest, NextApiResponse } from 'next';
import stripe from '@/config/stripe';
import { CartType } from '@/types/cart';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { cartDetails, discountCode } = req.body;

      if (!cartDetails) {
        return res.status(400).json({ error: 'cartDetails is required' });
      }

      const cartDetailsArray = cartDetails as CartType[];

      const lineItems = cartDetailsArray.map((item: CartType) => {
        const unitAmount = item.offer ? item.price * 0.8 : item.price;
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: item.productName,
            },
            unit_amount: unitAmount * 100, // Stripe requiere el precio en centavos
          },
          quantity: item.quantity,
        };
      });

      const origin = req.headers.origin;

      let discount = null;
      if (discountCode === 'DESCUENTO10') {
        const coupon = await stripe.coupons.retrieve('DESCUENTO10'); 
        discount = {
          discounts: [
            {
              coupon: coupon.id,
            },
          ],
        };
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${origin}/success`,
        cancel_url: `${origin}/successError`,
        ...discount,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Error creating checkout session' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
