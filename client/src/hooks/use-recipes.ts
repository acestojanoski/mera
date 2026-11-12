import useSWR from "swr";
import { fetchRecipes } from "../api/recipes";
import type { Recipe } from "../api/types";
import { queryKeys } from "../utils/query-keys";

export function useRecipes() {
  const { data, error, isLoading } = useSWR<Recipe[], Error>(
    queryKeys.recipes(),
    fetchRecipes,
  );

  return {
    data,
    error,
    isLoading,
  };
}
