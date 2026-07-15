import { useRouter } from "expo-router";
import { ScrollView, Text, Pressable, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { styles } from "../../styles/exercicio1";

interface Exercise {
  id: string;
  title: string;
  route: string;
  difficulty: number;
  stars?: number;
  completed?: boolean;
}

interface Level {
  id: number;
  title: string;
  description: string;
  exercises: Exercise[];
}

// ===== DADOS COM TODOS OS NIVEIS DESBLOQUEADOS =====
const levels: Level[] = [
  {
    id: 1,
    title: "Iniciante",
    description: "Nivel 1",
    exercises: [
      { 
        id: "silaba-faltante-1", 
        title: "Silaba faltante", 
        route: "silaba-faltante",
        difficulty: 1,
        stars: 0,
        completed: false
      },
      { 
        id: "formando-a-palavra-1", 
        title: "Formando a palavra", 
        route: "formando-a-palavra",
        difficulty: 1,
        stars: 0,
        completed: false
      },
      { 
        id: "construtor-1", 
        title: "Construtor", 
        route: "construtor",
        difficulty: 1,
        stars: 0,
        completed: false
      },
      { 
        id: "intruso-1", 
        title: "Intruso", 
        route: "intruso",
        difficulty: 1,
        stars: 0,
        completed: false
      },
    ],
  },
  {
    id: 2,
    title: "Explorador",
    description: "Nivel 2",
    exercises: [
      { 
        id: "silaba-faltante-2", 
        title: "Silaba faltante", 
        route: "silaba-faltante",
        difficulty: 2,
        stars: 0,
        completed: false
      },
      { 
        id: "formando-a-palavra-2", 
        title: "Formando a palavra", 
        route: "formando-a-palavra",
        difficulty: 2,
        stars: 0,
        completed: false
      },
      { 
        id: "construtor-2", 
        title: "Construtor", 
        route: "construtor",
        difficulty: 2,
        stars: 0,
        completed: false
      },
      { 
        id: "intruso-2", 
        title: "Intruso", 
        route: "intruso",
        difficulty: 2,
        stars: 0,
        completed: false
      },
    ],
  },
  {
    id: 3,
    title: "Aventureiro",
    description: "Nivel 3",
    exercises: [
      { 
        id: "silaba-faltante-3", 
        title: "Silaba faltante", 
        route: "silaba-faltante",
        difficulty: 3,
        stars: 0,
        completed: false
      },
      { 
        id: "formando-a-palavra-3", 
        title: "Formando a palavra", 
        route: "formando-a-palavra",
        difficulty: 3,
        stars: 0,
        completed: false
      },
      { 
        id: "construtor-3", 
        title: "Construtor", 
        route: "construtor",
        difficulty: 3,
        stars: 0,
        completed: false
      },
      { 
        id: "intruso-3", 
        title: "Intruso", 
        route: "intruso",
        difficulty: 3,
        stars: 0,
        completed: false
      },
    ],
  },
  {
    id: 4,
    title: "Mestre",
    description: "Nivel 4",
    exercises: [
      { 
        id: "silaba-faltante-4", 
        title: "Silaba faltante", 
        route: "silaba-faltante",
        difficulty: 4,
        stars: 0,
        completed: false
      },
      { 
        id: "formando-a-palavra-4", 
        title: "Formando a palavra", 
        route: "formando-a-palavra",
        difficulty: 4,
        stars: 0,
        completed: false
      },
      { 
        id: "construtor-4", 
        title: "Construtor", 
        route: "construtor",
        difficulty: 4,
        stars: 0,
        completed: false
      },
      { 
        id: "intruso-4", 
        title: "Intruso", 
        route: "intruso",
        difficulty: 4,
        stars: 0,
        completed: false
      },
    ],
  },
  {
    id: 5,
    title: "Lenda",
    description: "Nivel 5",
    exercises: [
      { 
        id: "silaba-faltante-5", 
        title: "Silaba faltante", 
        route: "silaba-faltante",
        difficulty: 5,
        stars: 0,
        completed: false
      },
      { 
        id: "formando-a-palavra-5", 
        title: "Formando a palavra", 
        route: "formando-a-palavra",
        difficulty: 5,
        stars: 0,
        completed: false
      },
      { 
        id: "construtor-5", 
        title: "Construtor", 
        route: "construtor",
        difficulty: 5,
        stars: 0,
        completed: false
      },
      { 
        id: "intruso-5", 
        title: "Intruso", 
        route: "intruso",
        difficulty: 5,
        stars: 0,
        completed: false
      },
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

  // Calcula total de estrelas do nivel
  const totalStars = level.exercises.reduce((acc, ex) => acc + (ex.stars || 0), 0);

  return (
    <Animated.View 
      style={[
        styles.levelCard,
        animatedStyle
      ]}
    >
      {!isLast && (
        <View style={styles.trailConnector} />
      )}

      <View style={styles.levelHeader}>
        <View style={styles.levelLeft}>
          <View style={styles.levelNumber}>
            <Text style={styles.levelNumberText}>
              {level.id}
            </Text>
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>{level.title}</Text>
          </View>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>
            {completedExercises}/4
          </Text>
        </View>
      </View>

      <View style={styles.starsContainer}>
        <Text style={styles.starsText}>
          Estrelas: {Array(totalStars).fill('★').join('')}
          {totalStars === 0 && ' Nenhuma'}
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
              ]}
            />
          );
        })}
      </View>

      <View style={styles.exerciseList}>
        {level.exercises.map((exercise) => {
          const isCompleted = exercise.completed || false;
          const stars = exercise.stars || 0;
          
          return (
            <Pressable
              key={exercise.id}
              style={[
                styles.exerciseButton,
                isCompleted && styles.exerciseButtonCompleted,
              ]}
              onPress={() => onExercisePress(exercise, level.id)}
            >
              <View style={styles.exerciseInfo}>
                <View style={styles.exerciseTexts}>
                  <Text style={styles.exerciseTitle}>
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
                {isCompleted ? "OK" : ">"}
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
  const [levelsData, setLevelsData] = useState(levels);

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

  // Função para atualizar o status do exercício (será chamada quando voltar da tela)
  const updateExerciseStatus = (levelId: number, exerciseId: string, stars: number) => {
    setLevelsData(prevLevels => 
      prevLevels.map(level => {
        if (level.id === levelId) {
          return {
            ...level,
            exercises: level.exercises.map(ex => {
              if (ex.id === exerciseId) {
                return {
                  ...ex,
                  completed: true,
                  stars: stars
                };
              }
              return ex;
            })
          };
        }
        return level;
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </Pressable>
        </View>
        <Text style={styles.title}>Minha Jornada</Text>
        <Text style={styles.subtitle}>Escolha qualquer nivel para comecar!</Text>
      </View>

      <View style={styles.navButtons}>
        <Pressable 
          style={styles.navButton} 
          onPress={() => router.push("/tutorial" as never)}
        >
          <Text style={styles.navButtonText}>Tutorial</Text>
        </Pressable>
        <Pressable 
          style={[styles.navButton, styles.navButtonHighlight]} 
          onPress={() => router.push("/explore" as never)}
        >
          <Text style={[styles.navButtonText, styles.navButtonTextHighlight]}>Progresso</Text>
        </Pressable>
      </View>

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