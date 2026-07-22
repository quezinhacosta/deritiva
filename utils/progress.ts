import AsyncStorage from '@react-native-async-storage/async-storage';

export const PROGRESS_STORAGE_KEY = '@deritiva_progress';

const EXERCISE_ROUTES = ['silaba-faltante', 'formando-a-palavra', 'construtor', 'intruso'];
const TOTAL_LEVELS = 5;

interface SavedExercise {
  id: string;
  completed: boolean;
  stars: number;
  errors: number;
}

interface SavedLevel {
  id: number;
  unlocked: boolean;
  exercises: SavedExercise[];
}

function buildDefaultProgress(): SavedLevel[] {
  return Array.from({ length: TOTAL_LEVELS }, (_, i) => {
    const levelId = i + 1;
    return {
      id: levelId,
      unlocked: levelId === 1,
      exercises: EXERCISE_ROUTES.map(route => ({
        id: `${route}-${levelId}`,
        completed: false,
        stars: 0,
        errors: 0,
      })),
    };
  });
}

async function loadSavedLevels(): Promise<SavedLevel[]> {
  try {
    const saved = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.error('Erro ao carregar progresso:', error);
  }
  return buildDefaultProgress();
}

// Salva o resultado de um exercicio e desbloqueia o proximo nivel
// quando todos os exercicios do nivel atual estiverem completos.
export async function saveExerciseResult(
  levelId: number,
  exerciseId: string,
  stars: number,
  errors: number
): Promise<void> {
  try {
    const levels = await loadSavedLevels();

    const level = levels.find(l => l.id === levelId);
    if (!level) return;

    const exerciseIndex = level.exercises.findIndex(e => e.id === exerciseId);
    if (exerciseIndex === -1) return;

    level.exercises[exerciseIndex] = {
      ...level.exercises[exerciseIndex],
      completed: true,
      stars,
      errors,
    };

    const allCompleted = level.exercises.every(e => e.completed);
    if (allCompleted) {
      const nextLevel = levels.find(l => l.id === levelId + 1);
      if (nextLevel) nextLevel.unlocked = true;
    }

    await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(levels));
  } catch (error) {
    console.error('Erro ao salvar progresso do exercicio:', error);
  }
}

export async function resetProgress(): Promise<void> {
  try {
    await AsyncStorage.removeItem(PROGRESS_STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao resetar progresso:', error);
  }
}

export function starsFromPercentage(percentage: number): number {
  if (percentage >= 100) return 3;
  if (percentage >= 70) return 2;
  if (percentage > 0) return 1;
  return 0;
}
