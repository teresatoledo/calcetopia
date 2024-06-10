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
  categoryId: number,
  category: {
    slug: string,
    categoryName: string,
  },
  sizes: {
    find(arg0: (size: { slug: string }) => boolean): unknown,
    slug: string,
    sizeName: string
  }[]
}

export type ProductWithSizeType = ProductType & {
  selectedSize?: string;
};
