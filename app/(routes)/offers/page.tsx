"use client"
import { useGetOffers } from "@/api/getOffers"
import SkeletonSchema from "@/components/SkeletonSchema";
import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/types/product";
import { ResponseType } from "@/types/response"
import { useRouter } from "next/navigation";
import OfferCard from "./components/OfferCard";

function Page() {
  const {result, loading}: ResponseType = useGetOffers();
  const router = useRouter()
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      
        <h3 className="px-6 text-3xl sm:pb-8">Ofertas</h3>
    
      <Separator/>
      <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
        {loading && (
          <SkeletonSchema grid={3} />
        )}
        {result !== null && !loading && (
          result.map((product: ProductType)=> (
            <OfferCard key={product.id} product={product}/>
          ))
        )}
      </div>
      
    </div>
  )
}

export default Page