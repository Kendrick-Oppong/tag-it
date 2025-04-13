import FeaturesComponent from "@/components/home/Features.component";
import HeroComponent from "@/components/home/Hero.component";
import TestimonialComponent from "@/components/home/Testimonial.component";
import Footer from "@/components/shared/footer/Footer.component";

export default function Home() {
  return (
    <>
      <HeroComponent />
      <FeaturesComponent />
      <TestimonialComponent />
      <Footer />
    </>
  );
}
