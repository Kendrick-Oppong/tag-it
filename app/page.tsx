import FeaturesComponent from "@/components/home/Features.component";
import HeroComponent from "@/components/home/Hero.component";
import TestimonialComponent from "@/components/home/Testimonial.component";

export default function Home() {
  return (
    <main className="mt-10 relative">
      <HeroComponent />
      <FeaturesComponent />
      <TestimonialComponent />
    </main>
  );
}

