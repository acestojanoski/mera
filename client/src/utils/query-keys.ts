type QueryKeyParams = Record<string, unknown>;

type QueryKey = {
  key: string;
  params?: QueryKeyParams;
};

export const queryKeys = {
  recipes: (): QueryKey => ({ key: "recipes" }),

  recipeIngredients: ({
    recipeId,
    targetYield,
  }: {
    recipeId: string;
    targetYield: number;
  }): QueryKey => ({
    key: "recipeIngredients",
    params: {
      recipeId,
      targetYield,
    },
  }),
};
