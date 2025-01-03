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
      <h2 className="text-2xl font-bold">Weekly Schedule</h2>
      <div className="grid gap-4">
        {schedule.days.map((day) => (
          <Card key={day.date} className="p-4">
            <h3 className="text-lg font-semibold mb-3">
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
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;