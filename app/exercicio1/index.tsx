import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { buildDefaultLevels } from '@/data/levels';
import { LevelDefinition, ExerciseDefinition } from '@/types/exercise';
import { loadProgress, resetProgress } from '@/utils/progress';
import { styles } from '@/styles/exercicio1';

interface LevelCardProps {
  level: LevelDefinition;
  index: number;
  totalLevels: number;
  onExercisePress: (exercise: ExerciseDefinition, levelId: number) => void;
}

function LevelCard({ level, index, totalLevels, onExercisePress }: LevelCardProps) {
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 + index * 100 });
    scale.value = withSpring(1, { damping: 14 });
  }, [index, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
  const completedExercises = level.exercises.filter((exercise) => exercise.completed).length;
  const totalStars = level.exercises.reduce((total, exercise) => total + (exercise.stars || 0), 0);
  const maxLevelStars = level.exercises.length * 4;
  const isComplete = completedExercises === level.exercises.length;
  const isLast = index === totalLevels - 1;

  return (
    <Animated.View
      style={[
        styles.levelCard,
        !level.unlocked && styles.levelCardLocked,
        isComplete && level.unlocked && styles.levelCardCompleted,
        animatedStyle,
      ]}
    >
      {!isLast && (
        <View
          style={[
            styles.trailConnector,
            isComplete && styles.trailConnectorActive,
            !level.unlocked && styles.trailConnectorLocked,
          ]}
        />
      )}

      <View style={styles.levelHeader}>
        <View style={styles.levelLeft}>
          <View style={[styles.levelNumber, !level.unlocked && styles.levelNumberLocked]}>
            <Text style={[styles.levelNumberText, !level.unlocked && styles.levelNumberTextLocked]}>
              {level.id}
            </Text>
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>{level.title}</Text>
            <Text style={styles.levelDescription}>{level.description}</Text>
          </View>
        </View>
        <View style={[styles.levelBadge, level.unlocked ? styles.levelBadgeUnlocked : styles.levelBadgeLocked]}>
          <Text style={[styles.levelBadgeText, !level.unlocked && styles.levelBadgeTextLocked]}>
            {level.unlocked ? `${completedExercises}/${level.exercises.length}` : 'Bloqueado'}
          </Text>
        </View>
      </View>

      <View style={styles.starsContainer}>
        <Text style={styles.starsText}>
          {level.unlocked
            ? totalStars > 0
              ? `⭐ ${totalStars} de ${maxLevelStars} estrelas conquistadas`
              : 'Nenhuma estrela conquistada ainda'
            : 'Complete o nível anterior para desbloquear'}
        </Text>
      </View>

      <View style={styles.trailRow}>
        <View style={[styles.trailLine, completedExercises > 0 && styles.trailLineActive]} />
        {level.exercises.map((exercise, exerciseIndex) => (
          <View
            key={exercise.id}
            style={[
              styles.stepDot,
              exerciseIndex < completedExercises ? styles.stepDotActive : styles.stepDotIdle,
              !level.unlocked && styles.stepDotLocked,
              isComplete && level.unlocked && styles.stepDotCompleted,
            ]}
          />
        ))}
      </View>

      <View style={styles.exerciseList}>
        {level.exercises.map((exercise) => {
          const isLocked = !level.unlocked;
          const starsCount = Math.min(4, Math.max(0, exercise.stars || 0));
          return (
            <Pressable
              key={exercise.id}
              disabled={isLocked}
              style={[
                styles.exerciseButton,
                exercise.completed && styles.exerciseButtonCompleted,
                isLocked && styles.exerciseButtonLocked,
              ]}
              onPress={() => onExercisePress(exercise, level.id)}
            >
              <View style={styles.exerciseInfo}>
                <View style={styles.exerciseTexts}>
                  <Text style={[styles.exerciseTitle, isLocked && styles.exerciseTitleLocked]}>
                    {exercise.title}
                  </Text>
                  {exercise.completed ? (
                    <Text style={styles.starsBadge}>
                      {'★'.repeat(starsCount) + '☆'.repeat(4 - starsCount)} ({starsCount}/4)
                    </Text>
                  ) : (
                    <Text style={[styles.starsBadge, { color: 'rgba(96, 25, 56, 0.4)' }]}>
                      ☆☆☆☆ (0/4)
                    </Text>
                  )}
                </View>
              </View>
              <Text style={styles.exerciseStatus}>
                {isLocked ? '🔒' : exercise.completed ? '✓' : '▶'}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
}

export default function ExerciseLevelsScreen() {
  const router = useRouter();
  const [levelsData, setLevelsData] = useState<LevelDefinition[]>(buildDefaultLevels);
  const [loading, setLoading] = useState(true);

  const refreshProgress = useCallback(async () => {
    try {
      setLevelsData(await loadProgress());
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshProgress();
    }, [refreshProgress])
  );

  const handleResetProgress = () => {
    const message = 'Isso vai apagar todas as estrelas e desbloqueios salvos. Deseja continuar?';
    const doReset = async () => {
      await resetProgress();
      setLevelsData(buildDefaultLevels());
    };

    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm(message)) void doReset();
      return;
    }

    Alert.alert('Resetar progresso', message, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Resetar', style: 'destructive', onPress: doReset },
    ]);
  };

  const handleExercisePress = (exercise: ExerciseDefinition, levelId: number) => {
    router.push({
      pathname: `/exercicios/${exercise.route}/[level]` as never,
      params: {
        level: String(levelId),
        difficulty: String(exercise.difficulty),
        exerciseId: exercise.id,
        title: exercise.title,
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#F5B55A', textAlign: 'center', marginTop: 40 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </Pressable>
          <Pressable onPress={handleResetProgress} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Resetar progresso</Text>
          </Pressable>
        </View>
        <Text style={styles.title}>Minha Jornada</Text>
        <Text style={styles.subtitle}>Complete todos os exercícios para avançar!</Text>
      </View>

      <Pressable style={styles.navButton} onPress={() => router.push('/tutorial')}>
        <Text style={styles.navButtonText}>Tutorial</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {levelsData.map((level, index) => (
          <LevelCard
            key={level.id}
            level={level}
            index={index}
            totalLevels={levelsData.length}
            onExercisePress={handleExercisePress}
          />
        ))}
      </ScrollView>
    </View>
  );
}
