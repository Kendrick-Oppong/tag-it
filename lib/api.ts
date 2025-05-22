"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/actions/require-user.action";
import { cache } from "react";

export async function fetchUserData() {
  try {
    const { user } = await requireUser();
    const dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id },
    });

    const collections = await prisma.collection.findMany({
      where: { userId: dbUser?.id },
    });

    return { collections };
  } catch {
    return {
      success: false,
      message: "Failed to fetch user data",
    };
  }
}

export const fetchUserBookmarks = cache(async () => {
  try {
    const { user } = await requireUser();
    const dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id },
    });

    if (!dbUser) {
      return {
        success: false,
        message: "User not found in database",
      };
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: dbUser.id },
      include: {
        collection: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      bookmarks,
    };
  } catch {
    return {
      success: false,
      message: "Failed to fetch user bookmarks",
    };
  }
});
