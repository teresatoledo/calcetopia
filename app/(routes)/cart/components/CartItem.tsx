import ProductImage from '@/components/shared/ProductImage';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/formatPrice';
import { formatOfferPrice } from '@/lib/offerPrice';
import { cn } from '@/lib/utils';
import { ProductWithSizeType } from '@/types/product';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface CartItemProps {
    product: ProductWithSizeType & { quantity: number; selectedSize: string };
}

function CartItem(props: CartItemProps) {
    const { product } = props;
    const router = useRouter();
    const { removeItem, incrementItem, decrementItem } = useCart();

    return (
        <li className="flex py-6 border-b">
            <ProductImage
                slug={product.slug}
                url={product.images[0]}
            />
            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h2 className="text-lg font-bold">
                        {product.productName}
                    </h2>
                    <p>{product.selectedSize}</p>
                    <p className="font-bold">
                        {!product.offer
                            ? formatPrice(product.price)
                            : formatOfferPrice(product.price)}
                    </p>
                    <div className="flex items-center justify-between gap-3 mt-2 w-24">
                        <Button
                            className="rounded-full w-8 h-8"
                            onClick={() =>
                                decrementItem(product.id, product.selectedSize)
                            }
                        >
                            -
                        </Button>
                        <p>{product.quantity}</p>
                        <Button
                            className="rounded-full w-8 h-8"
                            onClick={() =>
                                incrementItem(product.id, product.selectedSize)
                            }
                        >
                            +
                        </Button>
                    </div>
                </div>
                <div>
                    <button
                        className={cn(
                            'rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition dark:bg-black'
                        )}
                        onClick={() =>
                            removeItem(product.id, product.selectedSize)
                        }
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </li>
    );
}

export default CartItem;
