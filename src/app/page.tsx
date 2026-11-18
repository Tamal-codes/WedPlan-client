import Hero from "@/components/Hero";
import FeaturedServices from "@/components/FeaturedServices";
import Categories from "@/components/Categories";


export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <FeaturedServices />
      <Categories />
    </main>
  );
}
