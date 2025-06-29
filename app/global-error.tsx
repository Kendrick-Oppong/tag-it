"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="text-center mt-12">
        <h2 className="text-2xl">Something went wrong!</h2>
        <Button size="lg" onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}
