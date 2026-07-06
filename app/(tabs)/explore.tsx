import { View, Text, StyleSheet } from "react-native";

export default function Explore() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progresso</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Exercícios concluídos: 9/20</Text>
        <Text style={styles.text}>Estrelas: 18</Text>
        <Text style={styles.text}>Sequência: 5 dias</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>Progresso geral</Text>
        <View style={styles.barBackground}>
          <View style={styles.barFill} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#0B1220",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1C2433",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 6,
  },
  barBackground: {
    height: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },
  barFill: {
    width: "45%",
    height: "100%",
    backgroundColor: "#4F46E5",
  },
});