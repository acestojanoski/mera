import recipesData from "../../data/recipes.json" with { type: "json" };
import type { Recipe } from "../lib/types.js";

const recipes: Recipe[] = recipesData;

async function findAll(): Promise<Recipe[]> {
  return [...recipes].sort((a, b) => a.name.localeCompare(b.name));
}

async function findById(id: string): Promise<Recipe | null> {
  return recipes.find((recipe) => recipe.id === id) ?? null;
}

export const recipesRepository = {
  findAll,
  findById,
};
