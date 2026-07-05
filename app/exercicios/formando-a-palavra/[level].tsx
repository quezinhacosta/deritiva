import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function FormandoPalavraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ level: string }>();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.emoji}>🧩</Text>
        <Text style={styles.title}>Formando a Palavra</Text>
        <Text style={styles.subtitle}>
          Nível {params.level} - Em desenvolvimento
        </Text>
        <Text style={styles.description}>
          Este exercício está sendo preparado. 
          Em breve você poderá formar palavras!
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
    alignItems: "center",
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8,
  },
  subtitle: {
    color: "#ffd54f",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    color: "#f6ebff",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});