import { ProductType, SizeType } from "./product";
export interface CartType {
  id: number,
  productName: string,
  slug: string,
  description: string,
  active: boolean,
  isFeatured: boolean,
  price: number,
  offer: boolean,
  soldOut: boolean,
  image1: string,
  image2: string,
  images: [image1: string, image2: string]
  categoryId: number,
  category: {
    slug: string,
    categoryName: string,
    mainImage: string,
  },
  mainImage: string,
  sizes: SizeType[],
  categoryName: string;
  quantity: number;
}
export default CartType;