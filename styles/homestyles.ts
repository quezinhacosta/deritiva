import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#341e42",
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 24,
    overflow: "hidden",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  logoImage: {
    width: 250,
    height: 120,
    marginBottom: 16,
  },

  /* ===== LETRAS ANIMADAS ===== */
  floatingLetter: {
    position: "absolute",
    fontSize: 38,
    fontWeight: "900",
    color: "#ffd54f",
    opacity: 0.6,
  },

  letterD: {
    top: "12%",
    left: "8%",
  },

  letterE: {
    top: "28%",
    right: "10%",
  },

  letterR: {
    bottom: "18%",
    left: "12%",
  },

  letterI: {
    bottom: "8%",
    right: "18%",
  },

  /* ===== TÍTULOS ===== */
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#ffd54f",
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: 10,
  },

  subtitle: {
    color: "#f6ebff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 24,
  },

  /* ===== BOTÕES ===== */
  button: {
    height: 64,
    width: "100%",
    maxWidth: 320,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "rgba(52, 30, 66, 0.16)",
    // Sombra funcionando sem boxShadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  buttonText: {
    color: "#341e42",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.4,
  },

  buttonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },

  /* ===== RODAPÉ ===== */
  footer: {
    marginTop: 20,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 14,
    fontWeight: "500",
  },
});