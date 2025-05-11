"use server";

import { prisma } from "./prisma";
import { requireUser } from "./require-user.action";

export async function saveUser() {
  const { user } = await requireUser();

  try {
    // Check if user with kindeId exists
    const existingUser = await prisma.user.findUnique({
      where: { kindeId: user.id },
    });

    if (!existingUser) {
      await prisma.user.create({
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
      return {
        success: true,
        message: "User created successfully",
      };
    }
  } catch (error) {
    console.error("Error handling user in database:", error);
    return {
      success: false,
      message: "Failed to create User",
    };
  }
}
