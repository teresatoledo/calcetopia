export type ProductType = {
  id: number,
  attributes: {
    productName: string,
    slug: string,
    description: string,
    active: boolean,
    isFeatured: boolean,
    price: number,
    offer: boolean,
    soldOut: boolean,
    images: {
      data: {
        id: number,
        attributes: {
          url: string
        }
      }[]
    },
    category: {
      data: {
        attributes: {
          slug: string,
          categoryName: string,
        }
      }
    }
    sizes: {
      data: {
        find(arg0: (size: { attributes: { slug: string } }) => boolean): unknown
        attributes: {
          slug: string,
          size: string,
        }
      }
    }
  }
}

export type ProductWithSizeType = ProductType & {
  selectedSize?: string;
};