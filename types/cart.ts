import { ProductType } from "./product";
export interface CartType {
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
        attributes: {
          slug: string,
          size: string,
        }
      }
    }
  }
  quantity: number;
}
export default CartType;