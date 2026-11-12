import type { GetRecipeIngredientsResponse, Recipe } from "./types.js";

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

export const mapToGetRecipeIngredientsResponse = (
  targetYield: number,
  scale: number,
  recipe: Recipe,
): GetRecipeIngredientsResponse => {
  return {
    recipeId: recipe.id,
    targetYield,
    scale: round(scale),
    ingredients: recipe.ingredients.map((ingredient) => ({
      name: ingredient.name,
      quantity: round(ingredient.quantity * scale),
      unit: ingredient.unit,
    })),
  };
};
