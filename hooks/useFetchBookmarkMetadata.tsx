import { useEffect, useRef } from "react";
import { getLinkPreview } from "link-preview-js";
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
        const preview = await getLinkPreview(url);
        if ("images" in preview) {
          form.setValue("thumbnailUrl", preview.images[0] ?? "");
          form.setValue("description", preview.description ?? "");
          form.setValue("faviconUrl", preview.favicons[0] ?? "");
        }
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      }
    }, 500); // debounce delay

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [url, form]);
}
