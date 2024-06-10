import { useGetCategoryProduct } from '@/api/getProductCategory';
import { ResponseType } from '@/types/response';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useFavouriteProducts } from '@/hooks/useFavourites';
import { useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import SkeletonSchema from '@/components/SkeletonSchema';
import { ProductType } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import IconButton from '@/components/IconButton';
import { Expand, Heart, ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/lib/formatPrice';
import { useGetSimilarProducts } from '@/api/getSimilarProducts';
import Image from 'next/image';

function SimilarProducts() {
    const router = useRouter();
    const { addFavourite } = useFavouriteProducts();
    const [hovered, setHovered] = useState<number | null>(null);
    const params = useParams();
    const { productSlug } = params;
    const { result, loading }: ResponseType = useGetSimilarProducts();

    const filteredResults = result
        ? result.filter(
              (product: ProductType) => product.attributes.slug !== productSlug
          )
        : [];

    return (
        <div className="sm:hidden md:flex md:flex-col">
            <h3 className="px-6 text-3xl sm:pb-8">Productos similares</h3>
            <Carousel>
                <CarouselContent className="-ml-2 md:-ml-4">
                    {loading && <SkeletonSchema grid={3} />}
                    {filteredResults.length > 0 &&
                        filteredResults.map(
                            (product: ProductType, index: number) => {
                                const { attributes, id } = product;
                                const { slug, images, productName } =
                                    attributes;

                                return (
                                    <CarouselItem
                                        key={id}
                                        className="md:basis-1/2 lg:basis-1/3 group"
                                        onMouseEnter={() => setHovered(index)}
                                        onMouseLeave={() => setHovered(null)}
                                    >
                                        <div className="p-1">
                                            <Card className="py-4 border border-gray-200 shadow-none">
                                                <CardContent className="relative flex items-center justify-center px-6 py-2">
                                                    <Image
                                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${images.data[0].attributes.url}`}
                                                        alt={productName}
                                                    />
                                                    <div
                                                        className={`absolute w-full px-6 transition duration-200 ${
                                                            hovered === index
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        } bottom-5`}
                                                    >
                                                        <div className="flex justify-center gap-x-4">
                                                            <IconButton
                                                                onClick={() =>
                                                                    router.push(
                                                                        `${slug}`
                                                                    )
                                                                }
                                                                icon={
                                                                    <Expand
                                                                        size={
                                                                            20
                                                                        }
                                                                    />
                                                                }
                                                                className="text-gray-600"
                                                            />
                                                            <IconButton
                                                                onClick={() =>
                                                                    addFavourite(
                                                                        product
                                                                    )
                                                                }
                                                                icon={
                                                                    <Heart
                                                                        size={
                                                                            20
                                                                        }
                                                                    />
                                                                }
                                                                className="text-gray-600"
                                                            />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <div className="flex justify-between gap-4 px-8">
                                                    <h3 className="text-lg font-bold">
                                                        {productName}
                                                    </h3>
                                                    <p className="text-md font-bold">
                                                        {formatPrice(
                                                            product.attributes
                                                                .price
                                                        )}
                                                    </p>
                                                </div>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                );
                            }
                        )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    );
}

export default SimilarProducts;
