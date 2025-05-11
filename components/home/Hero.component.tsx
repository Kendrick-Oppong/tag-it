import { Button } from "@/components/ui/button";
import { BackgroundPattern } from "./background-pattern";
import FlipWords from "../ui/flip-words";
import { words } from "@/constants/hero.constants";
import Link from "next/link";

const HeroComponent = () => {
  return (
    <section className="relative w-full py-16 px-4 md:px-10 dark:bg-gradient-to-b from-background to-muted/20">
      <BackgroundPattern />
      {/* <div className="h-full hero-bg  w-full absolute -z-10 opacity-80"></div> */}
      <div className="max-w-6xl mx-auto text-center relative z-[100]">
        <h1 className="text-4xl md:text-6xl font-extrabold   leading-tight tracking-tight">
          Organize Your Web <br />
          <p className="text-primary bg-text-clip">Your Way</p>
        </h1>
        <div className="inline-flex mt-8 items-center gap-3 px-6 py-3 mb-6  border rounded-full backdrop-blur-sm shadow-lg sm:mt-10 sm:mb-8">
          <FlipWords words={words} className="font-semibold " />
        </div>
        <p className="font-medium">
          Capture, tag, and rule your links with a sleek, brilliant bookmark
          boss.
        </p>
        <div className="my-5">
          <Button className="cursor-pointer" size="lg">
            <Link href="dashboard"> Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
