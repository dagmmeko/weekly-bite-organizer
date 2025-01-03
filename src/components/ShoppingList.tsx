import React from "react";
import type { WeekSchedule } from "@/types/menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ShoppingListProps {
  schedule: WeekSchedule;
}

const ShoppingList = ({ schedule }: ShoppingListProps) => {
  const ingredients = schedule.days
    .flatMap((day) => [day.breakfast, day.lunch, day.dinner])
    .filter((meal): meal is NonNullable<typeof meal> => meal !== null)
    .flatMap((meal) => meal.ingredients);

  const uniqueIngredientsMap = new Map<string, string>();
  
  ingredients.forEach((ingredient) => {
    const normalized = ingredient.trim().toLowerCase();
    if (!uniqueIngredientsMap.has(normalized)) {
      uniqueIngredientsMap.set(normalized, ingredient.trim());
    }
  });

  const uniqueIngredients = Array.from(uniqueIngredientsMap.values());

  return (
    <div className="p-6 rounded-lg bg-white/80 backdrop-blur-sm">
      <h2 className="text-2xl font-semibold mb-4 text-foreground">Shopping List</h2>
      <ScrollArea className="h-[500px] pr-4">
        <ul className="space-y-2">
          {uniqueIngredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 group"
            >
              <input 
                type="checkbox" 
                className="rounded border-primary text-primary focus:ring-primary/20"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {ingredient}
              </span>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default ShoppingList;