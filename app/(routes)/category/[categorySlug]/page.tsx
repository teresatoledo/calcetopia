'use client';

import { Button } from '@/components/ui/button';
import { useGetCategoryProduct } from '@/hooks/useGetProductCategory';
import { useParams } from 'next/navigation';
import { ResponseType } from '@/types/response';
import { Separator } from '@/components/ui/separator';
import SkeletonSchema from '@/components/SkeletonSchema';
import ProductCard from '../components/ProductCard';
import { ProductType } from '@/types/product';
import { useState } from 'react';

export default function Page() {
    const params = useParams();
    const categorySlug = params?.categorySlug as string; // Asegúrate de que categorySlug tenga el tipo correcto
    const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug);
    const [showMore, setShowMore] = useState(false);

    const handleClick = () => {
        setShowMore(true);
    };

    // Verificar si el resultado es un array de productos
    const hasResults = Array.isArray(result) && result.length > 0;

    // Obtener el categoryName del primer producto, asumiendo que todos los productos son de la misma categoría
    const categoryName = hasResults ? result[0].categoryName : '';

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            {hasResults && !loading && (
                <h2 className="text-3xl font-medium">
                    {categoryName}
                </h2>
            )}
            <Separator />
            <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
                {loading && <SkeletonSchema grid={3} />}
                {/* @ts-ignore */}
                {hasResults && !loading && result.slice(0, showMore ? result.length : 6).map((product: ProductType) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
            </div>
            {!showMore && hasResults && result.length > 6 && (
                <div className="flex justify-center pt-4">
                    <Button onClick={handleClick}>Mostrar más</Button>
                </div>
            )}
        </div>
    );
}
