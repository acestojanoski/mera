import type { Context } from "hono";

interface CacheOptions {
  maxAge: number;
  staleWhileRevalidate?: number;
  varyQuery?: string[];
}

const HOUR = 60 * 60;
const DAY = 24 * HOUR;

export const cachePolicies = {
  recipes: {
    maxAge: HOUR,
    staleWhileRevalidate: DAY,
  },
  recipeIngredients: {
    maxAge: HOUR,
    staleWhileRevalidate: DAY,
    varyQuery: ["targetYield"],
  },
} satisfies Record<string, CacheOptions>;

/**
 * Opts a GET response into browser and Netlify CDN caching.
 * Call this only after the request succeeds so error responses are never cached.
 */
export function setCacheHeaders(context: Context, options: CacheOptions) {
  const { maxAge, staleWhileRevalidate, varyQuery } = options;

  const browserDirectives = ["public", `max-age=${maxAge}`];
  const cdnDirectives = ["public", "durable", `s-maxage=${maxAge}`];

  if (staleWhileRevalidate !== undefined) {
    browserDirectives.push(`stale-while-revalidate=${staleWhileRevalidate}`);
    cdnDirectives.push(`stale-while-revalidate=${staleWhileRevalidate}`);
  }

  context.header("Cache-Control", browserDirectives.join(", "));
  context.header("Netlify-CDN-Cache-Control", cdnDirectives.join(", "));

  if (varyQuery?.length) {
    context.header("Netlify-Vary", `query=${varyQuery.join("|")}`);
  }
}
