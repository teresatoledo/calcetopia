import { useEffect, useState } from "react";
import { CategoryType } from "@/types/category";
export function useGetCategories() {
    const url = `/api/category`;
    const [result, setResult] = useState<CategoryType[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setResult(json.data);
                setLoading(false);
            } catch (error: any) {
                console.error('Failed to fetch categories:', error);
                setError(error.message);
                setLoading(false);
            }
        })();
    }, [url]);

    return { loading, result, error };
}
