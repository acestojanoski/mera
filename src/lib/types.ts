export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface RecipeYield {
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  yield: RecipeYield;
  ingredients: RecipeIngredient[];
}

export interface GetRecipeIngredientsResponse {
  recipeId: string;
  targetYield: number;
  scale: number;
  ingredients: RecipeIngredient[];
}

export type ErrorCode =
  | "unauthorized"
  | "forbidden"
  | "validation_error"
  | "not_found"
  | "internal_error";

export interface ErrorResponse {
  errorCode: ErrorCode;
  message: string;
}
