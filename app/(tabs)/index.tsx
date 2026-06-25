import { StyleSheet, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Deritiva</Text>
        <Text style={styles.subtitle}>
          Aprender pode ser mais leve.
        </Text>
      </View>

      {/* Logo / Ilustração */}
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.logo}
        contentFit="contain"
      />

      {/* Cards de ações */}
      <View style={styles.cards}>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/(tabs)/explore")}
        >
          <Text style={styles.cardTitle}>🧠 Exercícios</Text>
          <Text style={styles.cardText}>
            Treine leitura e atenção com atividades guiadas.
          </Text>
        </Pressable>

        <Pressable style={styles.card}>
          <Text style={styles.cardTitle}>📖 Leitura Assistida</Text>
          <Text style={styles.cardText}>
            Textos com apoio visual e leitura simplificada.
          </Text>
        </Pressable>

        <Pressable style={styles.card}>
          <Text style={styles.cardTitle}>📊 Progresso</Text>
          <Text style={styles.cardText}>
            Veja sua evolução ao longo do tempo.
          </Text>
        </Pressable>

      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Feito com 💙 para inclusão e aprendizado
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFF",
    padding: 20,
  },

  header: {
    marginTop: 40,
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#1E3A8A",
  },

  subtitle: {
    fontSize: 16,
    color: "#4B5563",
    marginTop: 6,
  },

  logo: {
    width: 140,
    height: 140,
    alignSelf: "center",
    marginVertical: 20,
  },

  cards: {
    gap: 14,
    marginTop: 10,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },

  cardText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },

  footer: {
    marginTop: 30,
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
  },
});