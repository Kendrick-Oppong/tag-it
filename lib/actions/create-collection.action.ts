"use server";

import { prisma } from "@/lib/prisma";
import { authActionClient } from "./safe-action";
import { randomUUID } from "crypto";
import { collectionSchema } from "@/validators/form";
import { revalidatePath } from "next/cache";

export const createCollection = authActionClient
  .schema(collectionSchema)
  .action(async ({ parsedInput: { name }, ctx: { user } }) => {
    const dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id },
    });

    if (!dbUser) {
      return {
        success: false,
        message: "User not found in database",
      };
    }

    // Check if user has reached the maximum limit of 15 collections
    const collectionsCount = await prisma.collection.count({
      where: { userId: dbUser.id },
    });

    if (collectionsCount >= 15) {
      return {
        success: false,
        type: "max_collections_reached",
        message: "Maximum limit of 15 collections reached. Please delete some collections before creating new ones.",
      };
    }

    const existingCollection = await prisma.collection.findFirst({
      where: {
        userId: dbUser.id,
        name,
      },
    });

    if (existingCollection) {
      return {
        success: false,
        type: "collection_exists",
        message: "Collection name already exists",
      };
    }

    const newCollection = await prisma.collection.create({
      data: {
        id: randomUUID(),
        name,
        userId: dbUser.id,
      },
    });
    revalidatePath("/bookmarks");
    return {
      success: true,
      message: "Collection created successfully",
      collection: newCollection,
    };
  });
