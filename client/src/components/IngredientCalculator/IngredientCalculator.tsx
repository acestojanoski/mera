import styles from "./IngredientCalculator.module.css";
import { useState } from "react";
import { useRecipeIngredients } from "../../hooks/use-recipe-ingredients";
import { formatQuantity } from "../../utils/format";
import type { Recipe } from "../../api/types";
import { IngredientList } from "../IngredientList/IngredientList";

export function IngredientCalculator({ recipe }: { recipe: Recipe }) {
  const [targetYield, setTargetYield] = useState(recipe.yield.quantity);

  const validTarget =
    Number.isFinite(targetYield) && targetYield > 0 ? targetYield : null;

  const { data, error, isLoading } = useRecipeIngredients(
    recipe.id,
    validTarget,
  );

  function adjust(delta: number) {
    setTargetYield((current) => {
      const base = Number.isFinite(current) ? current : recipe.yield.quantity;
      return Math.max(0.01, Math.round((base + delta) * 100) / 100);
    });
  }

  return (
    <section className={`card ${styles.calculator}`}>
      <div className="card-header">
        <div>
          <p className="eyebrow">Calculator</p>
          <h3>Scale this batch</h3>
        </div>
        {data && (
          <span className={styles.scalePill}>
            ×{formatQuantity(data.scale)}
          </span>
        )}
      </div>

      <label className={styles.field}>
        <span>Target yield</span>
        <div className={styles.stepper}>
          <button
            type="button"
            onClick={() => adjust(-1)}
            aria-label="Decrease target yield"
          >
            −
          </button>
          <input
            type="number"
            min="0.01"
            step="any"
            inputMode="decimal"
            value={Number.isFinite(targetYield) ? targetYield : ""}
            onChange={(event) =>
              setTargetYield(
                event.target.value === ""
                  ? Number.NaN
                  : Number(event.target.value),
              )
            }
          />
          <button
            type="button"
            onClick={() => adjust(1)}
            aria-label="Increase target yield"
          >
            +
          </button>
          <span className={styles.unit}>{recipe.yield.unit}</span>
        </div>
      </label>

      {validTarget === null && (
        <p className="error">Enter a yield greater than zero.</p>
      )}
      {isLoading && <p className="muted">Calculating…</p>}
      {error && <p className="error">Could not calculate ingredients.</p>}

      {validTarget !== null && data && (
        <IngredientList
          className={styles.ingredientList}
          ingredients={data.ingredients.map((ingredient, index) => ({
            ...ingredient,
            original: recipe.ingredients[index],
          }))}
        />
      )}
    </section>
  );
}
