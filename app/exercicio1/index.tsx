import { useRouter } from "expo-router";
import { ScrollView, Text, Pressable, View } from "react-native";
import { StyleSheet } from "react-native";

const levels = [
  {
    id: 1,
    title: "Nível 1",
    description: "Primeiros passos",
    unlocked: true,
    progress: 1,
    exercises: [
      { id: "silaba-faltante", title: "Sílaba faltante", subtitle: "Encontre a sílaba que falta", route: "silaba-faltante" },
      { id: "formando-a-palavra", title: "Formando a palavra", subtitle: "Monte a palavra certa", route: "formando-a-palavra" },
      { id: "em-breve-1", title: "Em breve", subtitle: "Novo desafio logo abaixo", route: "em-breve" },
    ],
  },
  {
    id: 2,
    title: "Nível 2",
    description: "Mais confiança",
    unlocked: false,
    progress: 0,
    exercises: [
      { id: "silaba-faltante-2", title: "Sílaba faltante", subtitle: "Encontre a sílaba que falta", route: "silaba-faltante" },
      { id: "formando-a-palavra-2", title: "Formando a palavra", subtitle: "Monte a palavra certa", route: "formando-a-palavra" },
      { id: "em-breve-2", title: "Em breve", subtitle: "Novo desafio logo abaixo", route: "em-breve" },
    ],
  },
  {
    id: 3,
    title: "Nível 3",
    description: "Desafio crescente",
    unlocked: false,
    progress: 0,
    exercises: [
      { id: "silaba-faltante-3", title: "Sílaba faltante", subtitle: "Encontre a sílaba que falta", route: "silaba-faltante" },
      { id: "formando-a-palavra-3", title: "Formando a palavra", subtitle: "Monte a palavra certa", route: "formando-a-palavra" },
      { id: "em-breve-3", title: "Em breve", subtitle: "Novo desafio logo abaixo", route: "em-breve" },
    ],
  },
  {
    id: 4,
    title: "Nível 4",
    description: "Pensamento rápido",
    unlocked: false,
    progress: 0,
    exercises: [
      { id: "silaba-faltante-4", title: "Sílaba faltante", subtitle: "Encontre a sílaba que falta", route: "silaba-faltante" },
      { id: "formando-a-palavra-4", title: "Formando a palavra", subtitle: "Monte a palavra certa", route: "formando-a-palavra" },
      { id: "em-breve-4", title: "Em breve", subtitle: "Novo desafio logo abaixo", route: "em-breve" },
    ],
  },
  {
    id: 5,
    title: "Nível 5",
    description: "Domínio total",
    unlocked: false,
    progress: 0,
    exercises: [
      { id: "silaba-faltante-5", title: "Sílaba faltante", subtitle: "Encontre a sílaba que falta", route: "silaba-faltante" },
      { id: "formando-a-palavra-5", title: "Formando a palavra", subtitle: "Monte a palavra certa", route: "formando-a-palavra" },
      { id: "em-breve-5", title: "Em breve", subtitle: "Novo desafio logo abaixo", route: "em-breve" },
    ],
  },
];

export default function ExerciseLevelsScreen() {
  const router = useRouter();

  const handleExercisePress = (exercise: any, levelId: number) => {
    if (exercise.route === "em-breve") {
      router.push("/exercicios/em-breve");
      return;
    }

    router.push({
      pathname: `/exercicios/${exercise.route}/[level]`,
      params: { 
        level: String(levelId),
        exerciseId: exercise.id,
        title: exercise.title,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.title}>Trilha de desafios</Text>
        <Text style={styles.subtitle}>Cada etapa da trilha revela um novo desafio e um pouco mais de caminho.</Text>
      </View>


      <View style={styles.navButtons}>
        <Pressable 
          style={styles.navButton} 
          onPress={() => router.push("/tutorial" as never)}
        >
          <Text style={styles.navButtonText}>Tutorial</Text>
        </Pressable>

        <Pressable 
          style={styles.navButton} 
          onPress={() => router.push("/explore" as never)}
        >
          <Text style={styles.navButtonText}> Minhas Conquistas</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {levels.map((level) => {
          const isLocked = !level.unlocked;

          return (
            <View key={level.id} style={[styles.levelCard, isLocked && styles.levelCardLocked]}>
              <View style={styles.levelHeader}>
                <View>
                  <Text style={styles.levelTitle}>{level.title}</Text>
                  <Text style={styles.levelDescription}>{level.description}</Text>
                </View>
                <View style={[styles.badge, isLocked ? styles.badgeLocked : styles.badgeUnlocked]}>
                  <Text style={styles.badgeText}>{isLocked ? "Bloqueado" : `${level.progress}/3`}</Text>
                </View>
              </View>

              <View style={styles.trailRow}>
                <View style={styles.trailLine} />
                {Array.from({ length: 3 }).map((_, index) => {
                  const active = index < level.progress;
                  return (
                    <View
                      key={`${level.id}-${index}`}
                      style={[styles.stepDot, active ? styles.stepDotActive : styles.stepDotIdle, isLocked && styles.stepDotLocked]}
                    />
                  );
                })}
              </View>

              <View style={styles.exerciseList}>
                {level.exercises.map((exercise) => {
                  const isEmBreve = exercise.route === "em-breve";
                  
                  return (
                    <Pressable
                      key={exercise.id}
                      disabled={isLocked}
                      style={[
                        styles.exerciseButton, 
                        isLocked && styles.exerciseButtonLocked,
                        isEmBreve && styles.exerciseButtonEmBreve
                      ]}
                      onPress={() => handleExercisePress(exercise, level.id)}
                    >
                      <View style={styles.exerciseInfo}>
                        <Text style={[
                          styles.exerciseTitle,
                          isEmBreve && styles.exerciseTitleEmBreve
                        ]}>
                          {exercise.title}
                        </Text>
                        <Text style={[
                          styles.exerciseSubtitle,
                          isEmBreve && styles.exerciseSubtitleEmBreve
                        ]}>
                          {exercise.subtitle}
                        </Text>
                      </View>
                      <Text style={styles.exerciseArrow}>➜</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#341e42",
    paddingHorizontal: 18,
    paddingTop: 54,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 12,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 12,
  },
  backButtonText: {
    color: "#341e42",
    fontWeight: "800",
  },
  title: {
    color: "#ffd54f",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 4,
  },
  subtitle: {
    color: "#f6ebff",
    fontSize: 14,
    lineHeight: 20,
  },
  // NOVOS ESTILOS PARA OS BOTÕES DE NAVEGAÇÃO
  navButtons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  navButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
  },
  navButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  list: {
    gap: 14,
    paddingBottom: 24,
  },
  levelCard: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ffd54f",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  levelCardLocked: {
    opacity: 0.8,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  levelTitle: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "800",
  },
  levelDescription: {
    color: "#e5c96f",
    fontSize: 13,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeUnlocked: {
    backgroundColor: "#ffd54f",
  },
  badgeLocked: {
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  badgeText: {
    color: "#341e42",
    fontSize: 12,
    fontWeight: "800",
  },
  trailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    position: "relative",
  },
  trailLine: {
    position: "absolute",
    left: 10,
    right: 10,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 999,
  },
  stepDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    zIndex: 1,
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  stepDotIdle: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderColor: "rgba(255,255,255,0.4)",
  },
  stepDotActive: {
    backgroundColor: "#ffd54f",
    borderColor: "#ffd54f",
  },
  stepDotLocked: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderColor: "rgba(255,255,255,0.3)",
  },
  exerciseList: {
    gap: 8,
  },
  exerciseButton: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exerciseButtonLocked: {
    opacity: 0.6,
  },
  exerciseButtonEmBreve: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    color: "#341e42",
    fontWeight: "800",
    fontSize: 16,
  },
  exerciseTitleEmBreve: {
    color: "#888",
  },
  exerciseSubtitle: {
    color: "#6e5d7e",
    fontSize: 12,
    marginTop: 2,
  },
  exerciseSubtitleEmBreve: {
    color: "#555",
  },
  exerciseArrow: {
    color: "#341e42",
    fontSize: 18,
    fontWeight: "800",
  },
});