import Hero from "@/components/Hero";
import FeaturedServices from "@/components/FeaturedServices";
import Categories from "@/components/Categories";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import FadeIn from "@/components/FadeIn";


export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <FadeIn direction="up">
        <FeaturedServices />
      </FadeIn>
      <FadeIn direction="left">
        <Categories />
      </FadeIn>
      <FadeIn direction="right">
        <WhyChooseUs />
      </FadeIn>
      <FadeIn direction="up">
        <HowItWorks />
      </FadeIn>
    </main>
  );
}
