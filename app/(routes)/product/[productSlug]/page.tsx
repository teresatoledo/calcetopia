'use client';

import { useGetProductBySlug } from '@/hooks/useGetProductBySlug';
import { ResponseType } from '@/types/response';
import { useParams } from 'next/navigation';
import SkeletonProduct from './components/SkeletonProduct';
import ProductCarousel from './components/ProductCarousel';
import ProductInfo from './components/ProductInfo';
import SimilarProducts from './components/SimilarProducts';
import { ProductType } from '@/types/product';

export default function Page() {
    const params = useParams();
    const productSlug = params?.productSlug as string;

    const { result, loading, error }: ResponseType = useGetProductBySlug(productSlug);

    if (loading) {
        return <SkeletonProduct />;
    }

    if (error || result === null) {
        return <div>Error: {error}</div>;
    }

    const product: ProductType = result;

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-16 lg:min-h-[80vh]">
            <div className="grid sm:grid-cols-2">
                <div>
                    <ProductCarousel
                        product={product}
                    />
                </div>
                <div className="sm:px-12">
                    <ProductInfo product={product} />
                </div>
            </div>
            <div className="pt-2">
                <SimilarProducts currentProduct={product} />
            </div>
        </div>
    );
}
