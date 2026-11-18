import Hero from "@/components/Hero";
import FeaturedServices from "@/components/FeaturedServices";
import Categories from "@/components/Categories";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <FeaturedServices />
      <Categories />
      <WhyChooseUs />
    </main>
  );
}
