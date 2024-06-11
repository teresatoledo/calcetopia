import { useEffect, useState } from 'react';

export function useGetProductBySlug(slug: string) {
    const url = `/api/product?slug=${slug}`;
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                if (res.ok) {
                    setResult(json.data);
                } else {
                    setError(json.error);
                }
                setLoading(false);
            } catch (error: any) {
                console.error('Failed to fetch product:', error);
                setError(error.message);
                setLoading(false);
            }
        })();
    }, [url]);

    return { loading, result, error };
}
