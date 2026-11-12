import { Hono } from "hono";
import { getAllRecipes } from "./handlers/get-all-recipes.js";
import { getRecipe } from "./handlers/get-recipe.js";
import { errorHandler } from "./lib/error-handler.js";
import { getRecipeIngredients } from "./handlers/get-recipe-ingredients.js";
import { mapGetRecipeIngredientsRequest } from "./lib/request-mappers.js";

const app = new Hono().basePath("/api");

app.get("/ping", (context) => {
  return context.json({ result: "pong" });
});

app.get("/recipes", async (context) => {
  const recipes = await getAllRecipes.execute();
  return context.json(recipes);
});

app.get("/recipes/:id/ingredients", async (context) => {
  const { id, targetYield } = mapGetRecipeIngredientsRequest(context);
  const result = await getRecipeIngredients.execute(id, targetYield);
  return context.json(result);
});

app.get("/recipes/:id", async (context) => {
  const id = context.req.param("id");
  const recipe = await getRecipe.execute(id);
  return context.json(recipe);
});

app.onError(errorHandler);

export { app };
