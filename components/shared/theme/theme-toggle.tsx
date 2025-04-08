"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
  
      <Button
        variant="outline"
        size="sm"
        className="border"
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        <Sun size={40} className="hidden dark:block" />
        <Moon size={40} className="dark:hidden" />
        <span className="sr-only">Toggle theme</span>
      </Button>

  );
}
