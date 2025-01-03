import React from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import type { WeekSchedule } from "@/types/menu";

interface MealStatsProps {
  schedule: WeekSchedule;
}

const COLORS = ["#86A789", "#B2C8BA", "#D2E3C8"];

const MealStats = ({ schedule }: MealStatsProps) => {
  const getMealCounts = () => {
    let breakfast = 0, lunch = 0, dinner = 0;
    
    schedule.days.forEach(day => {
      if (day.breakfast) breakfast++;
      if (day.lunch) lunch++;
      if (day.dinner) dinner++;
    });

    return [
      { name: "Breakfast", value: breakfast },
      { name: "Lunch", value: lunch },
      { name: "Dinner", value: dinner },
    ];
  };

  const data = getMealCounts();

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Weekly Meal Coverage</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MealStats;