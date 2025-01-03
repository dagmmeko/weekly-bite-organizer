import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Meal, MealType } from "@/types/menu";

interface MealSlotProps {
  meal: Meal | null;
  type: MealType;
  onAddMeal: (type: MealType) => void;
}

const MealSlot = ({ meal, type, onAddMeal }: MealSlotProps) => {
  return (
    <Card className="p-4 h-24 flex flex-col justify-between bg-white/70 hover:bg-white/90 transition-colors duration-200">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium capitalize text-foreground/80">{type}</h3>
        {!meal && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
            onClick={() => onAddMeal(type)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
      {meal ? (
        <p className="text-sm font-medium text-foreground/90">{meal.name}</p>
      ) : (
        <p className="text-sm text-muted-foreground italic">No meal planned</p>
      )}
    </Card>
  );
};

export default MealSlot;