import React, { useState, useEffect } from "react";
import WeeklySchedule from "@/components/WeeklySchedule";
import ShoppingList from "@/components/ShoppingList";
import type { WeekSchedule, MealType } from "@/types/menu";
import { addDays, startOfWeek } from "date-fns";
import { toast } from "sonner";

const STORAGE_KEY = "menu-planner-schedule";

const Index = () => {
  const [schedule, setSchedule] = useState<WeekSchedule>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      days: Array.from({ length: 7 }, (_, i) => ({
        date: addDays(startOfWeek(new Date()), i).toISOString(),
        breakfast: null,
        lunch: null,
        dinner: null,
      })),
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
  }, [schedule]);

  const handleAddMeal = (date: string, type: MealType) => {
    const mealName = prompt("Enter meal name:");
    if (!mealName) return;

    const ingredients = prompt("Enter ingredients (comma-separated):");
    if (!ingredients) return;

    setSchedule((prev) => ({
      days: prev.days.map((day) => {
        if (day.date === date) {
          return {
            ...day,
            [type]: {
              id: Math.random().toString(),
              name: mealName,
              ingredients: ingredients.split(",").map((i) => i.trim()),
              type,
            },
          };
        }
        return day;
      }),
    }));

    toast.success("Meal added successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/20 to-primary/5">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <header className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            Weekly Menu Planner
          </h1>
          <p className="text-foreground/80">
            Plan your meals and generate shopping lists effortlessly
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <WeeklySchedule schedule={schedule} onAddMeal={handleAddMeal} />
          </div>
          <div className="space-y-6">
            <ShoppingList schedule={schedule} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;