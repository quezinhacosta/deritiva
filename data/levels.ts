import { EXERCISE_ROUTES, LevelDefinition } from '@/types/exercise';

const LEVEL_TITLES = [
  ['Iniciante', 'Nivel 1'],
  ['Explorador', 'Nivel 2'],
  ['Aventureiro', 'Nivel 3'],
  ['Mestre', 'Nivel 4'],
  ['Lenda', 'Nivel 5'],
] as const;

const EXERCISE_TITLES: Record<(typeof EXERCISE_ROUTES)[number], string> = {
  'silaba-faltante': 'Silaba faltante',
  'formando-a-palavra': 'Formando a palavra',
  construtor: 'Construtor',
  intruso: 'Intruso',
};

export const TOTAL_LEVELS = LEVEL_TITLES.length;

export function buildDefaultLevels(): LevelDefinition[] {
  return LEVEL_TITLES.map(([title, description], index) => {
    const id = index + 1;

    return {
      id,
      title,
      description,
      unlocked: id === 1,
      exercises: EXERCISE_ROUTES.map((route) => ({
        id: `${route}-${id}`,
        title: EXERCISE_TITLES[route],
        route,
        difficulty: id,
        stars: 0,
        completed: false,
        errors: 0,
      })),
    };
  });
}
