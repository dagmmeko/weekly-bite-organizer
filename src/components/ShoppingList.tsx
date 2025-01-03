import React from "react";
import { Card } from "@/components/ui/card";
import type { WeekSchedule } from "@/types/menu";

interface ShoppingListProps {
  schedule: WeekSchedule;
}

const ShoppingList = ({ schedule }: ShoppingListProps) => {
  const ingredients = schedule.days
    .flatMap((day) => [day.breakfast, day.lunch, day.dinner])
    .filter((meal): meal is NonNullable<typeof meal> => meal !== null)
    .flatMap((meal) => meal.ingredients);

  // Create a Map to store normalized ingredients
  const uniqueIngredientsMap = new Map<string, string>();
  
  // Normalize and store ingredients
  ingredients.forEach((ingredient) => {
    const normalized = ingredient.trim().toLowerCase();
    if (!uniqueIngredientsMap.has(normalized)) {
      uniqueIngredientsMap.set(normalized, ingredient.trim());
    }
  });

  // Get unique ingredients while preserving original casing
  const uniqueIngredients = Array.from(uniqueIngredientsMap.values());

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping List</h2>
      <ul className="space-y-2">
        {uniqueIngredients.map((ingredient, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 text-sm"
          >
            <input type="checkbox" className="rounded" />
            <span>{ingredient}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ShoppingList;