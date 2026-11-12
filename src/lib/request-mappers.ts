import type { Context } from "hono";
import { KnownError } from "./known-error.js";

export function mapGetRecipeIngredientsRequest(context: Context) {
  const id = context.req.param("id");

  if (!id) {
    throw new KnownError({
      errorCode: "validation_error",
      message: "`id` must be defined.",
    });
  }

  const targetYieldRaw = context.req.query("targetYield");

  const targetYield = Number(targetYieldRaw);

  if (
    targetYieldRaw === undefined ||
    !Number.isFinite(targetYield) ||
    targetYield <= 0
  ) {
    throw new KnownError({
      errorCode: "validation_error",
      message: "`targetYield` must be a number greater than zero.",
    });
  }

  return {
    id,
    targetYield,
  };
}
