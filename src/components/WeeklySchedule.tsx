import React from "react";
import { Card } from "@/components/ui/card";
import MealSlot from "./MealSlot";
import type { WeekSchedule, MealType } from "@/types/menu";
import { format } from "date-fns";

interface WeeklyScheduleProps {
  schedule: WeekSchedule;
  onAddMeal: (date: string, type: MealType) => void;
}

const WeeklySchedule = ({ schedule, onAddMeal }: WeeklyScheduleProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">Weekly Schedule</h2>
      <div className="grid gap-4">
        {schedule.days.map((day) => (
          <div key={day.date} className="p-6 rounded-lg bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              {format(new Date(day.date), "EEEE, MMM d")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MealSlot
                meal={day.breakfast}
                type="breakfast"
                onAddMeal={(type) => onAddMeal(day.date, type)}
              />
              <MealSlot
                meal={day.lunch}
                type="lunch"
                onAddMeal={(type) => onAddMeal(day.date, type)}
              />
              <MealSlot
                meal={day.dinner}
                type="dinner"
                onAddMeal={(type) => onAddMeal(day.date, type)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;