import useSWR from "swr";
import { fetchCalculatedIngredients } from "../api/recipes";
import type { GetRecipeIngredientsResponse } from "../api/types";
import type { ApiCallError } from "../api/client";
import { queryKeys } from "../utils/query-keys";
import { useDebouncedValue } from "./use-debounced-value";

export function useRecipeIngredients(
  recipeId: string,
  targetYield: number | null,
) {
  const debouncedTargetYield = useDebouncedValue(targetYield);

  const shouldFetch = debouncedTargetYield !== null && debouncedTargetYield > 0;

  const { data, error, isLoading } = useSWR<
    GetRecipeIngredientsResponse,
    ApiCallError
  >(
    shouldFetch
      ? queryKeys.recipeIngredients({
          recipeId,
          targetYield: debouncedTargetYield,
        })
      : null,
    {
      keepPreviousData: true,
      fetcher: () =>
        fetchCalculatedIngredients(recipeId, debouncedTargetYield as number),
    },
  );

  return {
    data,
    error,
    isLoading,
  };
}
