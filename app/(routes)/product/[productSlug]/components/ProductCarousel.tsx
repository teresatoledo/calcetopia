import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductType } from '@/types/product';
import Image from 'next/image';
import React from 'react';

interface ProductCarouselProps {
    product: ProductType;
}

function ProductCarousel(props: ProductCarouselProps) {
    const { product } = props;
    console.log('Product in Carousel:', product);

    const size36to40 = product.sizes.find(
        (size) => size.sizeSlug === 'talla-36-40'
    );
    const size41to46 = product.sizes.find(
        (size) => size.sizeSlug === 'talla-41-46'
    );
    return (
        <div className="px-5 sm:px-16">
            <Carousel>
                <CarouselContent>
                    {product.images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="relative">
                                <Image
                                    src={image}
                                    alt="Product image"
                                    className="rounded-lg h-96 w-96"
                                    width={200}
                                    height={200}
                                    layout="responsive"
                                />
                                {!size36to40 && !size41to46 ? (
                                    <div className="bg-black w-28 text-white rounded-lg text-center absolute top-6 -right-5 rotate-45">
                                        AGOTADO
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default ProductCarousel;
