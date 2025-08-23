"use server";

import { prisma } from "../prisma";
import { authActionClient } from "./safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const deleteSchema = z.object({ id: z.string().min(1) });

export const deleteBookmark = authActionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    // find user by kinde id
    const dbUser = await prisma.user.findUnique({ where: { kindeId: user.id } });
    if (!dbUser) {
      return { success: false, message: "User not found in database" };
    }

    const result = await prisma.bookmark.deleteMany({
      where: { id, userId: dbUser.id },
    });

    if (result.count === 0) {
      return { success: false, message: "Bookmark not found or not owned by user" };
    }

    // Revalidate bookmarks section so UI updates in all views
    revalidatePath("/bookmarks");

    return { success: true, message: "Bookmark deleted successfully", deletedId: id };
  });

