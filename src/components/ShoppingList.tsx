import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import type { WeekSchedule } from "@/types/menu";
import { toast } from "sonner";

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

  const generateShoppingListLink = () => {
    const list = uniqueIngredients.join('\n');
    const encodedList = encodeURIComponent(list);
    const noteUrl = `https://keep.google.com/#create/text=${encodedList}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(list).then(() => {
      toast.success("Shopping list copied to clipboard!");
    });
    
    // Open Google Keep in new tab
    window.open(noteUrl, '_blank');
  };

  return (
    <Card className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Shopping List</h2>
        <Button
          onClick={generateShoppingListLink}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          <Share2 className="w-4 h-4" />
          Share List
        </Button>
      </div>
      <ul className="space-y-2 mt-4">
        {uniqueIngredients.map((ingredient, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 text-sm p-2 hover:bg-gray-50 rounded-md transition-colors"
          >
            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
            <span className="text-gray-700">{ingredient}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ShoppingList;
