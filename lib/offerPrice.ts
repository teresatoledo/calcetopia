import { formatPrice } from './formatPrice';

export function formatOfferPrice(originalPrice: number, quantity: number = 1) {
    const discount = 0.2;
    const discountedPrice = originalPrice * (1 - discount) * quantity;
    const discountedPriceFormatted = formatPrice(discountedPrice);

    return discountedPriceFormatted;
}
