export const EXERCISE_ROUTES = [
  'silaba-faltante',
  'formando-a-palavra',
  'construtor',
  'intruso',
] as const;

export type ExerciseRoute = (typeof EXERCISE_ROUTES)[number];

export interface ExerciseDefinition {
  id: string;
  title: string;
  route: ExerciseRoute;
  difficulty: number;
  stars: number;
  completed: boolean;
  errors: number;
}

export interface LevelDefinition {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  exercises: ExerciseDefinition[];
}

export interface SavedExercise {
  id: string;
  completed: boolean;
  stars: number;
  errors: number;
}

export interface SavedLevel {
  id: number;
  unlocked: boolean;
  exercises: SavedExercise[];
}
