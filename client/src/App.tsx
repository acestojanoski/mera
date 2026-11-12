import "./styles/global.css";
import "./styles/shared.css";

import styles from "./App.module.css";
import { useState } from "react";
import { RecipeDetail } from "./components/RecipeDetail/RecipeDetail";
import { RecipeList } from "./components/RecipeList/RecipeList";
import { useRecipes } from "./hooks/use-recipes";

function App() {
  const { data: recipes, error, isLoading } = useRecipes();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected =
    recipes?.find((recipe) => recipe.id === selectedId) ?? recipes?.[0] ?? null;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Mera</h1>
        <p>Recipes &amp; ingredient scaling</p>
      </header>

      <main className={styles.main}>
        {isLoading && <p className="muted">Loading recipes…</p>}
        {error && <p className="error">Could not load recipes.</p>}
        {recipes && recipes.length === 0 && <p>No recipes yet.</p>}

        {recipes && recipes.length > 0 && (
          <>
            <RecipeList
              recipes={recipes}
              selectedId={selected?.id ?? null}
              onSelect={setSelectedId}
            />
            <section className={styles.content}>
              {selected ? (
                <RecipeDetail key={selected.id} recipe={selected} />
              ) : (
                <p className="muted">Select a recipe.</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
