import { KnownError } from "../lib/known-error.js";
import { recipesRepository } from "../repositories/recipes.js";
import type { GetRecipeIngredientsResponse } from "../lib/types.js";
import { mapToGetRecipeIngredientsResponse } from "../lib/response-mappers.js";

async function execute(
  id: string,
  targetYield: number,
): Promise<GetRecipeIngredientsResponse> {
  if (targetYield <= 0) {
    throw new KnownError({
      errorCode: "validation_error",
      message: "Target yield must be greater than zero.",
    });
  }

  const recipe = await recipesRepository.findById(id);

  if (!recipe) {
    throw new KnownError({
      errorCode: "not_found",
      message: "Recipe not found.",
    });
  }

  const scale = targetYield / recipe.yield.quantity;

  return mapToGetRecipeIngredientsResponse(targetYield, scale, recipe);
}

export const getRecipeIngredients = {
  execute,
};
