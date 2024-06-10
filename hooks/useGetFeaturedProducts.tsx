import { ProductType } from "@/types/product";
import { useEffect, useState } from "react";

export function useGetFeaturedProducts() {
  const url = `/api/featuredProducts`;
  const [result, setResult] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setResult(json.data || []);
        setLoading(false);
      } catch (error: any) {
        console.error('Failed to fetch featured products:', error);
        setError(error.message);
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error };
}
