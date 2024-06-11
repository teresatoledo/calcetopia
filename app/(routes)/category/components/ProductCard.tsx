import IconButton from '@/components/IconButton';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { ProductType } from '@/types/product';
import { Expand, Heart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/formatPrice';
import { useFavouriteProducts } from '@/hooks/useFavourites';
import Image from 'next/image';

type ProductCardProps = {
    product: ProductType;
};

function ProductCard(props: ProductCardProps) {
    const { product } = props;
    const router = useRouter();
    const { addFavourite } = useFavouriteProducts();

    // Crear un array de imágenes basado en image1 e image2
    const images = [product.image1, product.image2].filter(Boolean);

    return (
        <Link
            href={`/product/${product.slug}`}
            className="relative mx-auto p-2 transition-all duration-100 rounded-lg hover:shadow-md"
        >
            <Carousel
                opts={{
                    align: 'start',
                }}
                className="w-full max-w-sm"
            >
                <CarouselContent>
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <CarouselItem key={index} className="group">
                                <Image
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    className="rounded-xl"
                                    width={300}
                                    height={300}
                                />
                                <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                    <div className="flex justify-center gap-x-4">
                                        <IconButton
                                            onClick={() => router.push(`/product/${product.slug}`)}
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
                        ))
                    ) : (
                        <div>No images available</div>
                    )}
                </CarouselContent>
            </Carousel>
            <p className="text-2xl text-center">
                {product.productName}
            </p>
            <p className="font-bold text-center">
                {formatPrice(product.price)}
            </p>
        </Link>
    );
}

export default ProductCard;
