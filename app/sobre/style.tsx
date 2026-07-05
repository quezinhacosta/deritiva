import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StyleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estilo</Text>
      <Text style={styles.text}>Esta rota existe só para evitar warnings do router.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
  },
});
