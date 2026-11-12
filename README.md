# Mera

Recipe browser with ingredient scaling. React SPA over a Hono API, deployed on Netlify.

## Stack

- **Client** — React 19, Vite, SWR, CSS Modules
- **API** — Hono (`@hono/netlify`), TypeScript, Netlify Functions
- **Data** — static JSON (`data/recipes.json`)

## Structure

```
client/      React frontend
src/         API (routes, handlers, repository)
functions/   Netlify Function entry (`/api*`)
data/        Recipe seed data
scripts/     Local dev runner
```

## Getting started

```sh
pnpm install
pnpm dev        # Netlify dev (client :3000, functions)
pnpm dev:local  # Vite + standalone API (:3000, :3001)
```

Other scripts: `pnpm build`, `pnpm build:server`, `pnpm start:server`, `pnpm lint`.

## API

| Method | Path                                         | Description                        |
| ------ | -------------------------------------------- | ---------------------------------- |
| GET    | `/api/ping`                                  | Health check                       |
| GET    | `/api/recipes`                               | List recipes (sorted by name)      |
| GET    | `/api/recipes/:id`                           | Get a recipe                       |
| GET    | `/api/recipes/:id/ingredients?targetYield=N` | Ingredients scaled to target yield |

## Caching

Recipe and ingredient responses opt into browser and Netlify CDN caching via
`Cache-Control` and `Netlify-CDN-Cache-Control`: one hour fresh, with a one-day
`stale-while-revalidate` window. The ingredients response sets
`Netlify-Vary: query=targetYield`, so unrelated query parameters (for example,
tracking parameters) share a cache entry. Error responses are never cached.

Because the data is static JSON that changes only on deploy, Netlify's automatic
deploy invalidation keeps cached responses in sync.
