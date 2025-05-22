"use client";

import { Toaster as SonnerToaster, type ToasterProps } from "sonner";
import { useTheme } from "next-themes";

export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      toastOptions={{
        duration: 10000,
        style: {
          fontSize: "16px",
          padding: "10px",
          width: "270px",
        },
        classNames: {
          error:
            "!bg-destructive !text-white dark:!bg-destructive dark:!text-white",
          success:
            "!bg-green-600 !text-white dark:!bg-green-600 dark:!text-white",
          info: "!bg-blue-500 !text-white dark:!bg-blue-500 dark:!text-white",

          warning:
            "!bg-yellow-500 !text-white dark:!bg-yellow-500 dark:!text-white",
        },
      }}
      position="top-center"
      theme={resolvedTheme as ToasterProps["theme"]}
    />
  );
}
