import FeaturesComponent from "@/components/home/Features.component";
import HeroComponent from "@/components/home/Hero.component";
import TestimonialComponent from "@/components/home/Testimonial.component";
import Footer from "@/components/shared/footer/Footer.component";
import Header from "@/components/shared/header/Header.component";

export default function Home() {
  return (
    <main className="mt-10 relative">
      <Header />
      <HeroComponent />
      <FeaturesComponent />
      <TestimonialComponent />
      <Footer />
    </main>
  );
}
