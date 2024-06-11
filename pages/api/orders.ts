import type { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/lib/stripe';
import { getProductsByIds } from '@/lib/product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { products, discountCode } = req.body;

        try {
            const productIds = products.map((item: any) => item.id);
            const productData = await getProductsByIds(productIds);

            const lineItems = products.map((item: any) => {
                const product = productData.find((p: any) => p.id === item.id);
                const unitAmount = Math.round(
                    (item.offer ? product.price * 0.8 : product.price) * 100
                );
                return {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: product.productName,
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: item.quantity,
                };
            });

            if (discountCode === 'DESCUENTO10') {
                lineItems.push({
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Descuento 10%',
                        },
                        unit_amount: -Math.round(totalAmount * 0.1 * 100),
                    },
                    quantity: 1,
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/cancel`,
            });

            res.status(200).json({ stripeSession: session });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
