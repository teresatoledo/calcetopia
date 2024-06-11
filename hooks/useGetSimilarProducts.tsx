import { useEffect, useState } from 'react';

export function useGetSimilarProducts(productSlug: string | undefined) {
    const url = productSlug ? `/api/similarProducts?slug=${productSlug}` : '';
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!productSlug) return;

        (async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setResult(json.data);
                setLoading(false);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
                setLoading(false);
            }
        })();
    }, [url, productSlug]);

    return { loading, result, error };
}
