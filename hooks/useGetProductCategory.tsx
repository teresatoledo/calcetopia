import { useEffect, useState } from 'react';
import { ProductType } from '@/types/product';

export function useGetCategoryProduct(slug: string | string[]): { result: ProductType[] | null, loading: boolean, error: string } {
    const url = `/api/categoryProducts?slug=${slug}`;
    const [result, setResult] = useState<ProductType[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setResult(json.data);
                setLoading(false);
            } catch (error: any) {
                setError(error.toString());
                setLoading(false);
            }
        })();
    }, [url]);

    return { result, loading, error };
}
