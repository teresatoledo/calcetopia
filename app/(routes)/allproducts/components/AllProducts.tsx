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
    const images = [product.image1, product.image2].filter(Boolean);

    return (
        <div className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md max-w-[300px] mx-auto">
            
                <Carousel opts={{ align: 'start' }} className="w-full">
                    <CarouselContent>
                        {product.offer ? (
                            <div className="absolute bg-red-600 text-white rounded-lg -right-4 w-24 text-center rotate-45 top-4">
                                Oferta
                            </div>
                        ) : (
                            <div></div>
                        )}
                        {images.map((image, index) => (
                            <CarouselItem key={index} className="group">
                                <Image
                                    src={image}
                                    alt="Image"
                                    className="rounded-xl"
                                    width={300}
                                    height={300}
                                />
                                <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                    <div className="flex justify-center gap-x-4">
                                        <IconButton
                                            onClick={() =>
                                                router.push(
                                                    `/product/${product.slug}`
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
                <Link
                href={`/product/${product.slug}`}
                className="block"
            >
                <p className="text-2xl text-center">
                    {product.productName}
                </p>
                {!product.offer ? (
                    <p className="font-bold text-center">
                        {formatPrice(product.price)}
                    </p>
                ) : (
                    <div className="flex justify-center gap-5">
                        <p className="font-bold text-center">
                            {formatOfferPrice(product.price)}
                        </p>
                        <p className="font-bold text-center text-red-600 line-through">
                            {formatPrice(product.price)}
                        </p>
                    </div>
                )}
            </Link>
        </div>
    );
}

export default ProductCard;