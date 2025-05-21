import { createSafeActionClient } from "next-safe-action";
import { requireUser } from "./require-user.action";

export const actionClient = createSafeActionClient({
  defaultValidationErrorsShape: "flattened",
  throwValidationErrors: true,
  handleServerError: (error) => {
    if (error instanceof Error) {
      console.error("Server error:", error);
      return error.message;
    }
    console.error("Server error:", error);
    return {
      error,
    };
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const { user } = await requireUser();

  return next({ ctx: { user } });
});
