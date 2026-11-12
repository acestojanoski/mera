import styles from "./RecipeDetail.module.css";
import type { Recipe } from "../../api/types";
import { formatQuantity } from "../../utils/format";
import { IngredientCalculator } from "../IngredientCalculator/IngredientCalculator";
import { IngredientList } from "../IngredientList/IngredientList";

export function RecipeDetail({ recipe }: { recipe: Recipe }) {
  return (
    <article className={styles.recipe}>
      <header className={styles.header}>
        <div>
          <p className="eyebrow">Recipe</p>
          <h2>{recipe.name}</h2>
          {recipe.description && (
            <p className={styles.description}>{recipe.description}</p>
          )}
        </div>

        <div className={styles.badges}>
          <span className={styles.badge}>
            {formatQuantity(recipe.yield.quantity)} {recipe.yield.unit}
          </span>
          <span className={styles.badge}>
            {recipe.ingredients.length} ingredients
          </span>
        </div>
      </header>

      <div className={styles.grid}>
        <section className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Base recipe</p>
              <h3>Ingredients</h3>
            </div>
          </div>

          <IngredientList ingredients={recipe.ingredients} />
        </section>

        <IngredientCalculator recipe={recipe} />
      </div>
    </article>
  );
}
