"use client";
import { ResponseType } from "@/types/response";
import SkeletonSchema from "./SkeletonSchema";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Expand, Heart } from "lucide-react";
import IconButton from "./IconButton";
import { useRouter } from "next/navigation";
import { useGetFeaturedProducts } from "@/hooks/useGetFeaturedProducts";
import { useState } from "react";
import { useFavouriteProducts } from "@/hooks/useFavourites";
import { formatPrice } from "@/lib/formatPrice";
import Image from "next/image";

function FeaturedProducts() {
  const {result, loading}: ResponseType = useGetFeaturedProducts();
  const router = useRouter();
  const {addFavourite} = useFavouriteProducts();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="max-w-6-xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Más vendidos</h3>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && (
            <SkeletonSchema grid={3} />
          )}
          {result && result.length > 0 && (
            result.map((product: ProductType, index: number) => {
              const { id, productName, slug, price, description, image1 } = product;

              return (
                <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3 group" onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}>
                  <div className="p-1">
                    <Card className="py-4 border border-gray-200 shadow-none">
                      <CardContent className="relative flex items-center justify-center px-6 py-2">
                        <Image 
                          src={`${image1}`} 
                          alt="Image featured" 
                          width={300} 
                          height={300} 
                        />
                        <div className={`absolute w-full px-6 transition duration-200 ${hovered === index ? 'opacity-100' : 'opacity-0'} bottom-5`}>
                          <div className="flex justify-center gap-x-4">
                            <IconButton 
                              onClick={() => router.push(`product/${slug}`)} 
                              icon={<Expand size={20}/>}
                              className="text-gray-600"
                            />
                            <IconButton 
                              onClick={() => addFavourite(product)} 
                              icon={<Heart size={20}/>}
                              className="text-gray-600"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <div className="flex justify-between gap-4 px-8">
                        <h3 className="text-lg font-bold">{productName}</h3>
                        <p className="text-md font-bold">{formatPrice(price)}</p>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex"/>
      </Carousel>
    </div>
  );
}

export default FeaturedProducts;
