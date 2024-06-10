import ProductImage from '@/components/shared/ProductImage';
import { Button } from '@/components/ui/button';
import { useFavouriteProducts } from '@/hooks/useFavourites';
import { formatPrice } from '@/lib/formatPrice';
import { cn } from '@/lib/utils';
import { ProductType } from '@/types/product';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatOfferPrice } from '@/lib/offerPrice';
interface FavouriteProductProps {
    product: ProductType;
}

function FavouriteProduct(props: FavouriteProductProps) {
    const { product } = props;
    const router = useRouter();
    const { removeFavourite } = useFavouriteProducts();

    const seeDetail = () => {
        router.push(`/product/${product.attributes.slug}`);
    };
    return (
        <li className="flex p-6 border-b">
            <ProductImage
                slug={product.attributes.slug}
                url={product.attributes.images.data[0].attributes.url}
            />
            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h3 className="text-lg font-bold">
                        {product.attributes.productName}
                    </h3>
                    {!product.attributes.offer ? (
                        <p className="font-bold text-center flex justify-start pl-2">
                            {formatPrice(product.attributes.price)}
                        </p>
                    ) : (
                        <div className="flex justify-center gap-5">
                            <p className="font-bold text-center">
                                {formatOfferPrice(product.attributes.price)}
                            </p>
                            <p className="font-bold text-center text-red-600 line-through">
                                {formatPrice(product.attributes.price)}
                            </p>
                        </div>
                    )}
                    <Button className="mt-5 rounded-full" onClick={seeDetail}>
                        Ver producto
                    </Button>
                </div>
                <div>
                    <button
                        className={cn(
                            'rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition'
                        )}
                    >
                        <X
                            size={20}
                            onClick={() => removeFavourite(product.id)}
                        />
                    </button>
                </div>
            </div>
        </li>
    );
}

export default FavouriteProduct;
