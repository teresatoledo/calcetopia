'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/formatPrice';
import CartItem from './components/CartItem';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { formatOfferPrice } from '@/lib/offerPrice';

export default function Page() {
    const { items, removeAll } = useCart();
    const [discountCode, setDiscountCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountMessage, setDiscountMessage] = useState('');
    const [discountStyle, setDiscountStyle] = useState('');

    const totalPrice = items.reduce((total, item) => {
        const itemPrice = item.offer
            ? item.price * 0.8 // Aplicar 20% de descuento
            : item.price;
        return total + itemPrice * item.quantity;
    }, 0);

    const applyDiscount = () => {
        if (totalPrice > 50 && discountCode === 'DESCUENTO10') {
            setDiscountApplied(true);
            setDiscountMessage('Código de descuento aplicado correctamente');
            setDiscountStyle('text-center');
        } else {
            setDiscountApplied(false);
            setDiscountMessage(
                'Código de descuento no válido o total del pedido inferior a 50€'
            );
            setDiscountStyle('text-red-600 mt-2');
        }
    };

    const discountedPrice = discountApplied ? totalPrice * 0.9 : totalPrice;
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

    const buyStripe = async () => {
        removeAll()
        try {
            const stripe = await stripePromise;

            if (!stripe) throw new Error('Stripe failed to initialize.');

            const checkoutResponse = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cartDetails: items, discountCode }),
            });

            if (!checkoutResponse.ok) {
                throw new Error('Error creating checkout session');
            }

            const { sessionId } = await checkoutResponse.json();

            if (!sessionId) {
                throw new Error('Missing sessionId in response');
            }

            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error(error);
            } else {
                removeAll();
            }

            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:min-h-[80vh]">
            <h2 className="mb-5 text-3xl font-bold">Carrito</h2>
            <div className="grid sm:grid-cols-2 sm:gap-5">
                <div>
                    {items.length === 0 && (
                        <p>No hay productos en el carrito</p>
                    )}
                    <ul>
                        {items.map((item) => (
                            <CartItem
                                key={`${item.id}-${item.selectedSize}`}
                                product={item}
                            />
                        ))}
                    </ul>
                </div>
                <div className="max-w-xl">
                    <div className="p-6 rounded-lg bg-slate-100">
                        <p className="mb-3 text-lg font-semibold">
                            Resumen del pedido
                        </p>
                        <Separator />
                        <div>
                            {items.map((item) => (
                                <div key={`${item.id}-${item.selectedSize}`}>
                                    <div className="flex justify-between">
                                        <p>
                                            {item.productName} (
                                            {item.selectedSize})
                                        </p>
                                        {!item.offer ? (
                                            <p>
                                                {formatPrice(
                                                    item.price *
                                                        item.quantity
                                                )}
                                            </p>
                                        ) : (
                                            <p>
                                                {formatOfferPrice(
                                                    item.price *
                                                        item.quantity
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between gap-5 my-4">
                            <p>Total del pedido</p>
                            <p>{formatPrice(discountedPrice)}</p>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Código de descuento"
                                value={discountCode}
                                onChange={(e) =>
                                    setDiscountCode(e.target.value)
                                }
                            />
                            <Button className="mt-2" onClick={applyDiscount}>
                                Aplicar Descuento
                            </Button>
                            <p className={discountStyle}>{discountMessage}</p>
                        </div>
                        <div className="flex items-center justify-center w-full mt-3">
                            <Button className="w-full" onClick={buyStripe}>
                                Comprar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
