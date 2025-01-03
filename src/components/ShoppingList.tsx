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

  const uniqueIngredients = Array.from(new Set(ingredients));

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