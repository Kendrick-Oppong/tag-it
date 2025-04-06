"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="">
      <Button
        variant="outline"
        size="lg"
        className="border border-primary"
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        <Sun size={40} className=" dark:hidden" />
        <Moon size={40} className="hidden  dark:block" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
