export type ProductType = {
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
}
export type SizeType = {
  id: number;
  sizeName: string;
  sizeSlug: string;
};

export type ProductWithSizesType = ProductType & {
  sizes: SizeType[];
};

export type ResponseType = {
  result: ProductWithSizesType[];
  loading: boolean;
};
export type ProductWithSizeType = ProductType & {
  selectedSize?: string;
};
