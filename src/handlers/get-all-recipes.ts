import { recipesRepository } from "../repositories/recipes.js";

async function execute() {
  return recipesRepository.findAll();
}

export const getAllRecipes = {
  execute,
};
