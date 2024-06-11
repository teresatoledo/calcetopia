import { ProductType } from "./product";

export type ResponseType = {
  loading: boolean;
    result: ProductType[] | null;
    error: string | null;
}