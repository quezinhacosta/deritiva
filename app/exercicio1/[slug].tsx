import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function ExerciseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ slug: string; level: string; title: string }>();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.eyebrow}>Nível {params.level}</Text>
        <Text style={styles.title}>{params.title ?? "Exercício"}</Text>
        <Text style={styles.subtitle}>
          Este espaço será usado para construir o exercício {params.slug} em breve.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#341e42",
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 24,
    justifyContent: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 16,
  },
  backButtonText: {
    color: "#341e42",
    fontWeight: "800",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#ffd54f",
  },
  eyebrow: {
    color: "#ffd54f",
    fontWeight: "800",
    marginBottom: 8,
    letterSpacing: 1,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 10,
  },
  subtitle: {
    color: "#f6ebff",
    fontSize: 15,
    lineHeight: 22,
  },
});
