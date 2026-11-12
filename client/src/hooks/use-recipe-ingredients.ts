import useSWR from "swr";
import { fetchCalculatedIngredients } from "../api/recipes";
import type { GetRecipeIngredientsResponse } from "../api/types";
import type { ApiCallError } from "../api/client";
import { queryKeys } from "../utils/query-keys";

export function useRecipeIngredients(
  recipeId: string,
  targetYield: number | null,
) {
  const shouldFetch = targetYield !== null && targetYield > 0;

  const { data, error, isLoading } = useSWR<
    GetRecipeIngredientsResponse,
    ApiCallError
  >(
    shouldFetch
      ? queryKeys.recipeIngredients({
          recipeId,
          targetYield,
        })
      : null,
    {
      keepPreviousData: true,
      fetcher: () =>
        fetchCalculatedIngredients(recipeId, targetYield as number),
    },
  );

  return {
    data,
    error,
    isLoading,
  };
}
