import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/actions/require-user.action";
import { cache } from "react";
import { Prisma } from "@prisma/client";

export const fetchUserData = cache(async () => {
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
});

export const fetchUserBookmarks = cache(
  async (page = 1, collectionName?: string) => {
    const { user } = await requireUser();
    const dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id },
    });

    if (!dbUser) {
      return {
        bookmarks: [],
        totalCount: 0,
        totalPages: 0,
        error: "User not found",
      };
    }

    const PAGE_SIZE = 5;
    const skip = (page - 1) * PAGE_SIZE;

    let whereClause: Prisma.BookmarkWhereInput = {
      userId: dbUser.id,
    };

    if (collectionName) {
      const existingCollection = await prisma.collection.findFirst({
        where: {
          userId: dbUser.id,
          name: {
            equals: collectionName,
            mode: "insensitive",
          },
        },
      });

      if (!existingCollection) {
        return {
          bookmarks: [],
          totalCount: 0,
          totalPages: 0,
          error: `Collection "${collectionName}" not found`,
        };
      }

      whereClause = {
        ...whereClause,
        collection: {
          name: {
            equals: collectionName,
            mode: "insensitive",
          },
        },
      };
    }

    const [bookmarks, totalCount] = await Promise.all([
      prisma.bookmark.findMany({
        where: whereClause,
        include: { collection: true },
        orderBy: { createdAt: "desc" },
        take: PAGE_SIZE,
        skip,
      }),
      prisma.bookmark.count({ where: whereClause }),
    ]);

    return {
      bookmarks,
      totalCount,
      totalPages: Math.ceil(totalCount / PAGE_SIZE),
    };
  }
);
