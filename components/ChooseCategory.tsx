'use client';

import { useGetCategories } from '@/hooks/useGetCategories';
import { CategoryType } from '@/types/category';
import { ResponseType } from '@/types/response';
import Link from 'next/link';
import Image from 'next/image';

function ChooseCategory() {
    const { result, loading, error }: ResponseType = useGetCategories();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 pb-4 text-3xl sm:pb-8">Temáticas</h3>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {result && result.map((category: CategoryType) => (
                    <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
                    >
                        <Image
                            src={`${category.mainImage}`}
                            alt={category.categoryName}
                            className="max-w-[270px] transition duration-300 ease-in-out rounded-lg hover:scale-110"
                            width={300}
                            height={300}
                        />
                        <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-md">
                            {category.categoryName}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ChooseCategory;
