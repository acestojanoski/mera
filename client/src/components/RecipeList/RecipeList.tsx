import styles from "./RecipeList.module.css";
import type { Recipe } from "../../api/types";
import { formatQuantity } from "../../utils/format";

interface RecipeListProps {
  recipes: Recipe[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RecipeList({ recipes, selectedId, onSelect }: RecipeListProps) {
  return (
    <nav className={styles.list} aria-label="Recipes">
      <p className="section-label">Recipes</p>

      {recipes.map((recipe) => (
        <button
          key={recipe.id}
          type="button"
          className={
            recipe.id === selectedId
              ? `${styles.item} ${styles.itemActive}`
              : styles.item
          }
          onClick={() => onSelect(recipe.id)}
        >
          <span className={styles.itemName}>{recipe.name}</span>
          <span className={styles.itemMeta}>
            {formatQuantity(recipe.yield.quantity)} {recipe.yield.unit}
          </span>
        </button>
      ))}
    </nav>
  );
}
