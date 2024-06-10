import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
    slug: string,
    url: string
}

const ProductImage = (props: ProductImageProps) => {
    const { slug, url } = props
    const router = useRouter()

    return (
        <div onClick={() => router.push(`/product/${slug}`)} className="cursor-pointer">
            <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`}
                alt="Product"
                className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32" />
        </div>
    );
}

export default ProductImage;