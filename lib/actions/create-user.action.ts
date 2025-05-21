"use server";

import { prisma } from "../prisma";
import { requireUser } from "./require-user.action";
import { randomUUID } from "crypto";

export async function saveUser() {
  try {
    const { user } = await requireUser();
    // Check if user with kindeId exists
    const existingUser = await prisma.user.findUnique({
      where: { kindeId: user.id },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          kindeId: user.id,
          email: user.email ?? "",
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          picture: user.picture ?? "",
          lastLogin: new Date(),
          bio: null,
        },
      });

      // Create a default "Uncategorized" collection for the new user
      await prisma.collection.create({
        data: {
          id: randomUUID(),
          name: "Uncategorized",
          userId: newUser.id,
        },
      });

      return {
        success: true,
        message: "User and default collection created successfully",
      };
    }

    return {
      success: true,
      message: "User already exists",
    };
  } catch (error) {
    console.error("Error handling user in database:", error);
    return {
      success: false,
      message: "Failed to create user or collection",
    };
  }
}
