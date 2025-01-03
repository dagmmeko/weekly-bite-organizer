export type MealType = "breakfast" | "lunch" | "dinner";

export interface Meal {
  id: string;
  name: string;
  ingredients: string[];
  type: MealType;
}

export interface DaySchedule {
  date: string;
  breakfast: Meal | null;
  lunch: Meal | null;
  dinner: Meal | null;
}

export interface WeekSchedule {
  days: DaySchedule[];
}