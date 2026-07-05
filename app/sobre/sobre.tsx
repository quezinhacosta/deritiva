import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function SobreScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.eyebrow}>Sobre o aplicativo</Text>
        <Text style={styles.title}>Aprender brincando, passo a passo</Text>
        <Text style={styles.text}>
          O Deritiva é uma experiência de aprendizagem feita para tornar os estudos mais leves, visuais e motivadores. O objetivo é ajudar o usuário a completar desafios simples, evoluir no próprio ritmo e construir confiança enquanto aprende.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Como funciona</Text>
        <Text style={styles.bullet}>• O usuário escolhe um desafio e segue a trilha proposta.</Text>
        <Text style={styles.bullet}>• Cada etapa é curta e pensada para manter o foco e a motivação.</Text>
        <Text style={styles.bullet}>• O app mostra progresso e incentiva a continuidade com uma interface acolhedora.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#341e42",
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
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,213,79,0.3)",
  },
  eyebrow: {
    color: "#ffd54f",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  text: {
    color: "#f6ebff",
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    color: "#ffd54f",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
  },
  bullet: {
    color: "#f6ebff",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 6,
  },
});
