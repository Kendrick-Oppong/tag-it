"server only";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function requireUser() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  if (!user || !isUserAuthenticated) {
    throw new Error("Unauthorized access");
  }

  return { user };
}
