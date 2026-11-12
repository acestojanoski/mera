import { KnownError } from "../lib/known-error.js";
import { recipesRepository } from "../repositories/recipes.js";
import type { Recipe } from "../lib/types.js";

async function execute(id: string): Promise<Recipe> {
  const recipe = await recipesRepository.findById(id);

  if (!recipe) {
    throw new KnownError({
      errorCode: "not_found",
      message: "Recipe not found.",
    });
  }

  return recipe;
}

export const getRecipe = {
  execute,
};
