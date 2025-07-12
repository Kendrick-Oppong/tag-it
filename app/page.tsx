import FeaturesComponent from "@/components/home/Features.component";
import HeroComponent from "@/components/home/Hero.component";
import TestimonialComponent from "@/components/home/Testimonial.component";
import FooterComponent from "@/components/shared/footer/Footer.component";
import HeaderComponent from "@/components/shared/header/Header.component";

export default function Home() {
  return (
    <main className="mt-10 relative">
      <HeaderComponent />
      <HeroComponent />
      <FeaturesComponent />
      <TestimonialComponent />
      <FooterComponent />
    </main>
  );
}

