"use server";

import { bookmarkSchema } from "@/validators/form";
import { prisma } from "../prisma";
import { authActionClient } from "./safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";

export const createBookmark = authActionClient
  .schema(bookmarkSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: data, ctx: { user } }) => {
    // Look up the user in the database using kindeId
    const dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id }, // user.id is the Kinde Auth id
    });

    if (!dbUser) {
      return {
        success: false,
        message: "User not found in database",
      };
    }

    const bookmarkData = {
      title: data.title,
      url: data.url,
      description: data.description ?? null,
      isFavorite: data.isFavorite,
      faviconUrl: data.faviconUrl ?? null,
      thumbnailUrl: data.thumbnailUrl ?? null,
      metadata: data.metadata ? JSON.parse(data.metadata) : null,
      userId: dbUser.id, // Use the Prisma User.id, not Kinde Auth user.id
      collectionId: data.collectionId,
    };

    // Create the bookmark in the database
    await prisma.bookmark.create({ data: bookmarkData });
    revalidatePath("/dashboard/bookmarks/all");
    return {
      success: true,
      message: "Bookmark created successfully",
    };
  });
