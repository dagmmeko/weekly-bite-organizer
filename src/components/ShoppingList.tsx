import React from "react";
import { Card } from "@/components/ui/card";
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
    <Card className="p-6 bg-white/50 backdrop-blur-sm">
      <h2 className="text-2xl font-semibold mb-4 text-foreground/90">Shopping List</h2>
      <ScrollArea className="h-[500px] pr-4">
        <ul className="space-y-2">
          {uniqueIngredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 group"
            >
              <input 
                type="checkbox" 
                className="rounded border-primary/30 text-primary focus:ring-primary/20"
              />
              <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                {ingredient}
              </span>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </Card>
  );
};

export default ShoppingList;