import { z } from "zod";

export const bookmarkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().min(1, "This field is required").url("Invalid URL"),
  description: z.string().optional(),
  isFavorite: z.boolean(),
  revisitAt: z.date().optional().nullable(),
  faviconUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  thumbnailUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  metadata: z.string().optional(),
  collectionId: z.string().optional().nullable(),
});