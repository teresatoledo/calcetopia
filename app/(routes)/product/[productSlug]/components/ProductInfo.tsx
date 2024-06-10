import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useFavouriteProducts } from '@/hooks/useFavourites';
import { formatPrice } from '@/lib/formatPrice';
import { ProductType, ProductWithSizeType } from '@/types/product';
import { Heart } from 'lucide-react';
import React, { useState } from 'react';
import { formatOfferPrice } from '@/lib/offerPrice';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export type InfoProductProps = {
    product: ProductType;
};

function ProductInfo(props: InfoProductProps) {
    const { product } = props;
    const { addItem } = useCart();
    const { addFavourite } = useFavouriteProducts();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const size36to40 = product.attributes.sizes.data.find(
        (size) => size.attributes.slug === 'talla-36-40'
    );
    const size41to46 = product.attributes.sizes.data.find(
        (size) => size.attributes.slug === 'talla-41-46'
    );

    const handleBuyClick = () => {
        if (!selectedSize) {
            setErrorMessage('Por favor selecciona una talla');
        } else {
            const productWithSize: ProductWithSizeType = {
                ...product,
                selectedSize,
            };
            addItem(productWithSize, selectedSize); // Asegúrate de pasar selectedSize aquí
            setErrorMessage(null);
        }
    };

    return (
        <div className="px-5 sm:px-1">
            <div className="justify-between mb-3 sm:flex">
                <h2 className="text-2xl">{product.attributes.productName}</h2>
            </div>
            <Separator className="my-4" />
            <p>{product.attributes.description}</p>
            <Separator className="my-4" />
            <Select onValueChange={(value) => setSelectedSize(value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Selecciona una talla" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="Talla 36-40" disabled={!size36to40}>
                            Talla 36-40
                        </SelectItem>
                        <SelectItem value="Talla 41-46" disabled={!size41to46}>
                            Talla 41-46
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {errorMessage && (
                <p className="text-red-600 mt-2">{errorMessage}</p>
            )}
            <Separator className="my-4" />
            {!product.attributes.offer ? (
                <p className="my-4 text-2xl">
                    {formatPrice(product.attributes.price)}
                </p>
            ) : (
                <div className="flex justify-start gap-4">
                    <p className="my-4 text-2xl">
                        {formatOfferPrice(product.attributes.price)}
                    </p>
                    <p className="my-4 text-2xl text-red-600 line-through">
                        {formatPrice(product.attributes.price)}
                    </p>
                </div>
            )}
            <div className="flex items-center gap-5">
                {!size36to40 && !size41to46 ? (
                    <Button
                        className={`w-full bg-black text-white hover:bg-black cursor-default`}
                    >
                        Agotado
                    </Button>
                ) : (
                    <Button className={`w-full `} onClick={handleBuyClick}>
                        Comprar
                    </Button>
                )}

                <Heart
                    width={30}
                    strokeWidth={1}
                    className="transition duration-300 cursor-pointer hover:fill-black"
                    onClick={() => addFavourite(product)}
                />
            </div>
        </div>
    );
}

export default ProductInfo;
