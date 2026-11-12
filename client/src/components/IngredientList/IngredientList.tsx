import styles from "./IngredientList.module.css";
import { formatQuantity } from "../../utils/format";

interface IngredientListItem {
  name: string;
  quantity: number;
  unit: string;
  original?: {
    quantity: number;
    unit: string;
  };
}

interface IngredientListProps {
  ingredients: IngredientListItem[];
  className?: string;
}

export function IngredientList({
  ingredients,
  className,
}: IngredientListProps) {
  return (
    <ul className={className ? `${styles.list} ${className}` : styles.list}>
      {ingredients.map((ingredient, index) => (
        <li key={`${ingredient.name}-${index}`}>
          <span>{ingredient.name}</span>
          <span className={styles.quantity}>
            {ingredient.original ? (
              <>
                <strong>
                  {formatQuantity(ingredient.quantity)} {ingredient.unit}
                </strong>
                <span className={styles.original}>
                  was {formatQuantity(ingredient.original.quantity)}{" "}
                  {ingredient.original.unit}
                </span>
              </>
            ) : (
              `${formatQuantity(ingredient.quantity)} ${ingredient.unit}`
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
