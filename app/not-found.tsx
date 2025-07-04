import { Button } from "@/components/ui/button";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="grid place-content-center min-h-dvh px-4">
      <div className="text-center space-y-4">
        <h1 className="text-9xl font-black text-muted-foreground">404</h1>

        <p className="text-2xl font-bold tracking-tight sm:text-4xl">
          Uh-oh!
        </p>

        <p className="text-muted-foreground">We couldn&apos;t find that page</p>

        <Button className="cursor-pointer" size="lg">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
