import { useEffect, useRef } from "react";
import * as z from "zod";
import { UseFormReturn } from "react-hook-form";
import { bookmarkSchema } from "@/validators/form";

export function useFetchBookmarkMetadata(
  url: string,
  form: UseFormReturn<z.infer<typeof bookmarkSchema>>
) {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!url || !z.string().url().safeParse(url).success) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/link-preview?url=${encodeURIComponent(url)}`
        );
        const preview = await response.json();
        console.log("preview", preview);
        if ("images" in preview) {
          form.setValue("title", preview.siteName ?? "");
          form.setValue("thumbnailUrl", preview.images[0] ?? "");
          form.setValue("description", preview.description ?? "");
          form.setValue("faviconUrl", preview.favicons[0] ?? "");
          form.setValue("metadata", JSON.stringify(preview, null, 2));
        }
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [url, form]);
}
