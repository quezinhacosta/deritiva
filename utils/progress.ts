import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildDefaultLevels } from '@/data/levels';
import { LevelDefinition, SavedLevel } from '@/types/exercise';

export const PROGRESS_STORAGE_KEY = '@deritiva_progress';

function toSavedLevels(levels: LevelDefinition[]): SavedLevel[] {
  return levels.map(({ id, unlocked, exercises }) => ({
    id,
    unlocked,
    exercises: exercises.map(({ id: exerciseId, completed, stars, errors }) => ({
      id: exerciseId,
      completed,
      stars,
      errors,
    })),
  }));
}

function mergeSavedLevels(saved: SavedLevel[]): LevelDefinition[] {
  const defaults = buildDefaultLevels();
  return defaults.map((level) => {
    const savedLevel = saved.find((item) => item.id === level.id);
    if (!savedLevel) return level;

    return {
      ...level,
      unlocked: savedLevel.unlocked,
      exercises: level.exercises.map((exercise) => {
        const savedExercise = savedLevel.exercises.find((item) => item.id === exercise.id);
        return savedExercise ? { ...exercise, ...savedExercise } : exercise;
      }),
    };
  });
}

export async function loadProgress(): Promise<LevelDefinition[]> {
  try {
    const saved = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
    if (saved) return mergeSavedLevels(JSON.parse(saved) as SavedLevel[]);
  } catch (error) {
    console.error('Erro ao carregar progresso:', error);
  }
  return buildDefaultLevels();
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
    const levels = await loadProgress();

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

    await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(toSavedLevels(levels)));
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
