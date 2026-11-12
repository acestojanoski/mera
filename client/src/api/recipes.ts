import { apiCall } from "./client";
import type { GetRecipeIngredientsResponse, Recipe } from "./types";

export async function fetchRecipes() {
  const response = await apiCall<Recipe[]>("/recipes");
  return response.body;
}

export async function fetchCalculatedIngredients(
  id: string,
  targetYield: number,
) {
  const query = new URLSearchParams({
    targetYield: String(targetYield),
  });

  const response = await apiCall<GetRecipeIngredientsResponse>(
    `/recipes/${encodeURIComponent(id)}/ingredients?${query.toString()}`,
  );

  return response.body;
}
