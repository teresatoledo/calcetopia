import { CategoryType } from "./category";

export type ResponseType = {
    loading: boolean;
    result: Array<CategoryType> | null;
    error: string | null;
};