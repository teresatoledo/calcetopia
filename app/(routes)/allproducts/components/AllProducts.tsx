import IconButton from '@/components/IconButton';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { ProductType } from '@/types/product';
import { Expand, ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/formatPrice';
import { useFavouriteProducts } from '@/hooks/useFavourites';
import { formatOfferPrice } from '@/lib/offerPrice';
import Image from 'next/image';


type ProductCardProps = {
    product: ProductType;
};
function ProductCard(props: ProductCardProps) {
    const { product } = props;
    const router = useRouter();
    const { addFavourite } = useFavouriteProducts();
    return (
        <Link
            href={`/product/${product.attributes.slug}`}
            className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md"
        >
            <Carousel opts={{ align: 'start' }} className="w-full max-w-sm">
                <CarouselContent>
                    {product.attributes.offer ? (
                        <div className="absolute bg-red-600 text-white rounded-lg -right-4 w-24 text-center rotate-45 top-4">
                            Oferta
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {product.attributes.images.data.map((image) => (
                        <CarouselItem key={image.id} className="group">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`}
                                alt="Image"
                                className="rounded-xl"
                            />
                            <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                <div className="flex justify-center gap-x-4">
                                    <IconButton
                                        onClick={() =>
                                            router.push(
                                                `/product/${product.attributes.slug}`
                                            )
                                        }
                                        icon={
                                            <Expand
                                                size={20}
                                                className="text-gray-600"
                                            />
                                        }
                                    />
                                    <IconButton
                                        onClick={() => addFavourite(product)}
                                        icon={<Heart size={20} />}
                                        className="text-gray-600"
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <p className="text-2xl text-center">
                {product.attributes.productName}
            </p>
            {!product.attributes.offer ? (
                <p className="font-bold text-center">
                    {formatPrice(product.attributes.price)}
                </p>
            ) : (
                <div className="flex justify-center gap-5">
                    <p className="font-bold text-center">
                        {formatOfferPrice(product.attributes.price)}
                    </p>
                    <p className="font-bold text-center text-red-600 line-through">
                        {formatPrice(product.attributes.price)}
                    </p>
                </div>
            )}
        </Link>
    );
}

export default ProductCard;
