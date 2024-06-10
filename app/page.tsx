import CarouselBanner from "@/components/CarouselBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import BannerDiscount from"@/components/BannerDiscount";
import ChooseCategory from "@/components/ChooseCategory";

export default function Home() {
  return (
    <main>
      <CarouselBanner/>
      <FeaturedProducts/>
      <BannerDiscount/>
      <ChooseCategory/>
    
    </main>
  );
}
