'use client';
import { Button } from '@/components/ui/button';
import { useGetAllProducts } from '@/api/getAllProducts';
import SkeletonSchema from '@/components/SkeletonSchema';
import { Separator } from '@/components/ui/separator';
import { ProductType } from '@/types/product';
import { ResponseType } from '@/types/response';
import { useRouter } from 'next/navigation';
import AllProducts from './components/AllProducts';
import { useState } from 'react';

function Page() {
    const { result, loading }: ResponseType = useGetAllProducts();
    const router = useRouter();
    const [showMore, setShowMore] = useState(false);
    const [visibleProducts, setVisibleProducts] = useState(6);

    const handleClick = () => {
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6);
    };
    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 text-3xl sm:pb-8">Todos los productos</h3>
            <Separator />
            <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
                {loading && <SkeletonSchema grid={3} />}
                {result !== null &&
                    !loading &&
                    result
                        .slice(0, visibleProducts)
                        .map((product: ProductType) => (
                            <AllProducts key={product.id} product={product} />
                        ))}
            </div>
            {!showMore && result && result.length > visibleProducts && (
                <div className="flex justify-center pt-4">
                    <Button onClick={handleClick}>Mostrar más</Button>
                </div>
            )}
        </div>
    );
}

export default Page;
