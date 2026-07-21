import { useRouter, useFocusEffect } from "expo-router";
import { ScrollView, Text, Pressable, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useCallback, useState, useEffect } from "react";
import { styles } from "../../styles/exercicio1";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Exercise {
  id: string;
  title: string;
  route: string;
  difficulty: number;
  stars?: number;
  completed?: boolean;
  errors?: number;
}

interface Level {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  exercises: Exercise[];
}

const STORAGE_KEY = '@deritiva_progress';

// ===== DADOS DOS NIVEIS =====
const defaultLevels: Level[] = [
  {
    id: 1,
    title: "Iniciante",
    description: "Nivel 1",
    unlocked: true,
    exercises: [
      { id: "silaba-faltante-1", title: "Silaba faltante", route: "silaba-faltante", difficulty: 1, stars: 0, completed: false, errors: 0 },
      { id: "formando-a-palavra-1", title: "Formando a palavra", route: "formando-a-palavra", difficulty: 1, stars: 0, completed: false, errors: 0 },
      { id: "construtor-1", title: "Construtor", route: "construtor", difficulty: 1, stars: 0, completed: false, errors: 0 },
      { id: "intruso-1", title: "Intruso", route: "intruso", difficulty: 1, stars: 0, completed: false, errors: 0 },
    ],
  },
  {
    id: 2,
    title: "Explorador",
    description: "Nivel 2",
    unlocked: false,
    exercises: [
      { id: "silaba-faltante-2", title: "Silaba faltante", route: "silaba-faltante", difficulty: 2, stars: 0, completed: false, errors: 0 },
      { id: "formando-a-palavra-2", title: "Formando a palavra", route: "formando-a-palavra", difficulty: 2, stars: 0, completed: false, errors: 0 },
      { id: "construtor-2", title: "Construtor", route: "construtor", difficulty: 2, stars: 0, completed: false, errors: 0 },
      { id: "intruso-2", title: "Intruso", route: "intruso", difficulty: 2, stars: 0, completed: false, errors: 0 },
    ],
  },
  {
    id: 3,
    title: "Aventureiro",
    description: "Nivel 3",
    unlocked: false,
    exercises: [
      { id: "silaba-faltante-3", title: "Silaba faltante", route: "silaba-faltante", difficulty: 3, stars: 0, completed: false, errors: 0 },
      { id: "formando-a-palavra-3", title: "Formando a palavra", route: "formando-a-palavra", difficulty: 3, stars: 0, completed: false, errors: 0 },
      { id: "construtor-3", title: "Construtor", route: "construtor", difficulty: 3, stars: 0, completed: false, errors: 0 },
      { id: "intruso-3", title: "Intruso", route: "intruso", difficulty: 3, stars: 0, completed: false, errors: 0 },
    ],
  },
  {
    id: 4,
    title: "Mestre",
    description: "Nivel 4",
    unlocked: false,
    exercises: [
      { id: "silaba-faltante-4", title: "Silaba faltante", route: "silaba-faltante", difficulty: 4, stars: 0, completed: false, errors: 0 },
      { id: "formando-a-palavra-4", title: "Formando a palavra", route: "formando-a-palavra", difficulty: 4, stars: 0, completed: false, errors: 0 },
      { id: "construtor-4", title: "Construtor", route: "construtor", difficulty: 4, stars: 0, completed: false, errors: 0 },
      { id: "intruso-4", title: "Intruso", route: "intruso", difficulty: 4, stars: 0, completed: false, errors: 0 },
    ],
  },
  {
    id: 5,
    title: "Lenda",
    description: "Nivel 5",
    unlocked: false,
    exercises: [
      { id: "silaba-faltante-5", title: "Silaba faltante", route: "silaba-faltante", difficulty: 5, stars: 0, completed: false, errors: 0 },
      { id: "formando-a-palavra-5", title: "Formando a palavra", route: "formando-a-palavra", difficulty: 5, stars: 0, completed: false, errors: 0 },
      { id: "construtor-5", title: "Construtor", route: "construtor", difficulty: 5, stars: 0, completed: false, errors: 0 },
      { id: "intruso-5", title: "Intruso", route: "intruso", difficulty: 5, stars: 0, completed: false, errors: 0 },
    ],
  },
];

// ===== COMPONENTE DE NIVEL =====
interface LevelCardProps {
  level: Level;
  index: number;
  totalLevels: number;
  onExercisePress: (exercise: Exercise, levelId: number) => void;
}

function LevelCard({ level, index, totalLevels, onExercisePress }: LevelCardProps) {
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 + index * 100 });
    scale.value = withSpring(1, { damping: 14 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const isLast = index === totalLevels - 1;
  const completedExercises = level.exercises.filter(ex => ex.completed).length;
  const totalStars = level.exercises.reduce((acc, ex) => acc + (ex.stars || 0), 0);
  const isUnlocked = level.unlocked;
  const isComplete = completedExercises === level.exercises.length;

  return (
    <Animated.View 
      style={[
        styles.levelCard,
        !isUnlocked && styles.levelCardLocked,
        isComplete && isUnlocked && styles.levelCardCompleted,
        animatedStyle
      ]}
    >
      {!isLast && (
        <View style={[
          styles.trailConnector,
          isComplete && styles.trailConnectorActive,
          !isUnlocked && styles.trailConnectorLocked
        ]} />
      )}

      <View style={styles.levelHeader}>
        <View style={styles.levelLeft}>
          <View style={[
            styles.levelNumber,
            !isUnlocked && styles.levelNumberLocked
          ]}>
            <Text style={[
              styles.levelNumberText,
              !isUnlocked && styles.levelNumberTextLocked
            ]}>
              {level.id}
            </Text>
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>{level.title}</Text>
            <Text style={styles.levelDescription}>{level.description}</Text>
          </View>
        </View>
        <View style={[
          styles.levelBadge,
          isUnlocked ? styles.levelBadgeUnlocked : styles.levelBadgeLocked
        ]}>
          <Text style={[
            styles.levelBadgeText,
            !isUnlocked && styles.levelBadgeTextLocked
          ]}>
            {isUnlocked ? `${completedExercises}/4` : 'Bloqueado'}
          </Text>
        </View>
      </View>

      <View style={styles.starsContainer}>
        <Text style={styles.starsText}>
          {isUnlocked ? (
            totalStars > 0 ? `Estrelas: ${Array(totalStars).fill('★').join('')}` : 'Nenhuma estrela ainda'
          ) : (
            '🔒 Complete o nivel anterior para desbloquear'
          )}
        </Text>
      </View>

      <View style={styles.trailRow}>
        <View style={[
          styles.trailLine,
          completedExercises > 0 && styles.trailLineActive,
        ]} />
        {Array.from({ length: 4 }).map((_, idx) => {
          const active = idx < completedExercises;
          return (
            <View
              key={`${level.id}-${idx}`}
              style={[
                styles.stepDot,
                active ? styles.stepDotActive : styles.stepDotIdle,
                !isUnlocked && styles.stepDotLocked,
                isComplete && isUnlocked && styles.stepDotCompleted
              ]}
            />
          );
        })}
      </View>

      <View style={styles.exerciseList}>
        {level.exercises.map((exercise) => {
          const isCompleted = exercise.completed || false;
          const stars = exercise.stars || 0;
          const isLocked = !isUnlocked;
          
          return (
            <Pressable
              key={exercise.id}
              disabled={isLocked}
              style={[
                styles.exerciseButton,
                isCompleted && styles.exerciseButtonCompleted,
                isLocked && styles.exerciseButtonLocked,
              ]}
              onPress={() => onExercisePress(exercise, level.id)}
            >
              <View style={styles.exerciseInfo}>
                <View style={styles.exerciseTexts}>
                  <Text style={[
                    styles.exerciseTitle,
                    isLocked && styles.exerciseTitleLocked
                  ]}>
                    {exercise.title}
                  </Text>
                  {isCompleted && (
                    <Text style={styles.starsBadge}>
                      {Array(stars).fill('★').join('')}
                    </Text>
                  )}
                </View>
              </View>
              <Text style={styles.exerciseStatus}>
                {isLocked ? '🔒' : isCompleted ? '✓' : '▶'}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
}

// ===== TELA PRINCIPAL =====
export default function ExerciseLevelsScreen() {
  const router = useRouter();
  const [levelsData, setLevelsData] = useState<Level[]>(defaultLevels);
  const [loading, setLoading] = useState(true);

  // ===== CARREGAR PROGRESSO =====
  const loadProgress = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const updatedLevels = defaultLevels.map(level => {
          const savedLevel = parsed.find((l: any) => l.id === level.id);
          if (savedLevel) {
            return {
              ...level,
              unlocked: savedLevel.unlocked,
              exercises: level.exercises.map(ex => {
                const savedEx = savedLevel.exercises.find((e: any) => e.id === ex.id);
                if (savedEx) {
                  return {
                    ...ex,
                    completed: savedEx.completed,
                    stars: savedEx.stars,
                    errors: savedEx.errors || 0
                  };
                }
                return ex;
              })
            };
          }
          return level;
        });
        setLevelsData(updatedLevels);
      }
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    } finally {
      setLoading(false);
    }
  };

  // ===== RECARREGA QUANDO A TELA GANHA FOCO =====
  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, [])
  );

  // ===== SALVAR PROGRESSO =====
  const saveProgress = async (updatedLevels: Level[]) => {
    try {
      const dataToSave = updatedLevels.map(level => ({
        id: level.id,
        unlocked: level.unlocked,
        exercises: level.exercises.map(ex => ({
          id: ex.id,
          completed: ex.completed,
          stars: ex.stars,
          errors: ex.errors || 0
        }))
      }));
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  };

  // ===== ATUALIZAR STATUS DO EXERCICIO =====
  const updateExerciseStatus = (levelId: number, exerciseId: string, stars: number, errors: number) => {
    setLevelsData(prevLevels => {
      const updatedLevels = prevLevels.map(level => {
        if (level.id === levelId) {
          const updatedExercises = level.exercises.map(ex => {
            if (ex.id === exerciseId) {
              return {
                ...ex,
                completed: true,
                stars: stars,
                errors: errors
              };
            }
            return ex;
          });

          const allCompleted = updatedExercises.every(ex => ex.completed);
          const updatedLevel = {
            ...level,
            exercises: updatedExercises
          };

          if (allCompleted) {
            const nextLevelIndex = prevLevels.findIndex(l => l.id === levelId + 1);
            if (nextLevelIndex !== -1) {
              prevLevels[nextLevelIndex].unlocked = true;
            }
          }

          return updatedLevel;
        }
        return level;
      });

      saveProgress(updatedLevels);
      return updatedLevels;
    });
  };

  // ===== HANDLE EXERCISE PRESS =====
  const handleExercisePress = (exercise: Exercise, levelId: number) => {
    const routePath = `/exercicios/${exercise.route}/${levelId}`;
    
    router.push({
      pathname: routePath as any,
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
        </View>
        <Text style={styles.title}>Minha Jornada</Text>
        <Text style={styles.subtitle}>Complete todos os exercícios para avançar!</Text>
      </View>

      <Pressable 
        style={styles.navButton} 
        onPress={() => router.push("/tutorial" as never)}
      >
        <Text style={styles.navButtonText}>Tutorial</Text>
      </Pressable>

      <ScrollView 
        contentContainerStyle={styles.list} 
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
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