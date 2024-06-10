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
  images: {
      data: {
          id: number;
          attributes: {
              url: string;
          };
      }[];
  };
}

function ProductCarousel(props: ProductCarouselProps) {
  const { product, images } = props;
  const size36to40 = product.attributes.sizes.data.find(
      (size: { attributes: { slug: string } }) =>
          size.attributes.slug === 'talla-36-40'
  );
  const size41to46 = product.attributes.sizes.data.find(
      (size: { attributes: { slug: string } }) =>
          size.attributes.slug === 'talla-41-46'
  );
  return (
      <div className="px-5 sm:px-16">
          <Carousel>
              <CarouselContent>
                  {images.data.map((image) => (
                      <CarouselItem key={image.id}>
                          <div className="relative">
                              <Image
                                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`}
                                  alt="Product image"
                                  className="rounded-lg h-96 w-96"
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
