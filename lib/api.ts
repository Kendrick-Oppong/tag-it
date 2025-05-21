import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/actions/require-user.action";

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
