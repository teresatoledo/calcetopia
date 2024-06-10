'use client';
import { Button } from '@/components/ui/button';
import { useGetCategoryProduct } from '@/api/getProductCategory';
import { useParams, useRouter } from 'next/navigation';
import { ResponseType } from '@/types/response';
import { Separator } from '@/components/ui/separator';
import SkeletonSchema from '@/components/SkeletonSchema';
import ProductCard from '../components/ProductCard';
import { ProductType } from '@/types/product';
import { useState } from 'react';

export default function Page() {
    const params = useParams();
    //Lo llammo categorySlug porque es el nombre de la carpeta en la que está este archivo
    const { categorySlug } = params;
    const { result, loading }: ResponseType =
        useGetCategoryProduct(categorySlug);
    const router = useRouter();
    const [showMore, setShowMore] = useState(false);

    const handleClick = () => {
        setShowMore(true);
    };

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            {result !== null && !loading && (
                <h2 className="text-3xl font-medium">
                    {result[0].attributes.category.data.attributes.categoryName}
                </h2>
            )}
            <Separator />
            <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
                {loading && <SkeletonSchema grid={3} />}
                {result !== null &&
                    !loading &&
                    result
                        .slice(0, showMore ? result.length : 6)
                        .map((product: ProductType) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
            </div>
            {!showMore && result && result.length > 6 && (
                <div className="flex justify-center pt-4">
                    <Button onClick={handleClick}>Mostrar más</Button>
                </div>
            )}
        </div>
    );
}
