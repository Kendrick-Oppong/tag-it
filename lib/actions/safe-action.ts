import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { requireUser } from "./require-user.action";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

const DATABASE_ERROR_MESSAGE = "A database error occurred.";
const VALIDATION_ERROR_MESSAGE = "Validation failed.";

export const actionClient = createSafeActionClient({
  defaultValidationErrorsShape: "flattened",
  handleServerError: (error) => {
    if (error instanceof ZodError) {
      return VALIDATION_ERROR_MESSAGE;
    } else if (
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientUnknownRequestError ||
      error instanceof Prisma.PrismaClientValidationError ||
      error.name === "NeonDbError"
    ) {
      return DATABASE_ERROR_MESSAGE;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const { user } = await requireUser();

  return next({ ctx: { user } });
});
