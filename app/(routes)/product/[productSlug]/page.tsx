'use client';

import { useGetProductBySlug } from '@/api/getProductBySlug';
import { ResponseType } from '@/types/response';
import { useParams } from 'next/navigation';
import SkeletonProduct from './components/SkeletonProduct';
import ProductCarousel from './components/ProductCarousel';
import ProductInfo from './components/ProductInfo';
import { useGetCategoryProduct } from '@/api/getProductCategory';
import SimilarProducts from './components/SimilarProducts';
import { ProductType } from '@/types/product';

export default function Page() {
    const params = useParams();
    const { productSlug } = params;
    const { result }: ResponseType = useGetProductBySlug(productSlug);
    if (result === null) {
        return <SkeletonProduct />;
    }
    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-16 lg:min-h-[80vh]">
            <div className="grid sm:grid-cols-2">
                <div>
                    <ProductCarousel
                        images={result[0].attributes.images}
                        product={result[0]}
                    />
                </div>
                <div className="sm:px-12">
                    <ProductInfo product={result[0]} />
                </div>
            </div>
            <div className="pt-2">
                <SimilarProducts />
            </div>
        </div>
    );
}
