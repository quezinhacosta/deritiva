import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#601938",
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

  /* ===== LETRAS ANIMADAS FLUTUANTES ===== */
  floatingLetter: {
    position: "absolute",
    fontSize: 48,
    fontWeight: "900",
    color: "#F5B55A",
    opacity: 0.15,
  },

  letterD: {
    top: "8%",
    left: "5%",
    transform: [{ rotate: "-15deg" }],
  },

  letterE: {
    top: "20%",
    right: "8%",
    transform: [{ rotate: "10deg" }],
  },

  letterR: {
    bottom: "25%",
    left: "6%",
    transform: [{ rotate: "-8deg" }],
  },

  letterI: {
    bottom: "10%",
    right: "5%",
    transform: [{ rotate: "12deg" }],
  },

  letterT: {
    top: "45%",
    left: "3%",
    transform: [{ rotate: "-20deg" }],
  },

  letterV: {
    bottom: "40%",
    right: "3%",
    transform: [{ rotate: "15deg" }],
  },

  letterA: {
    top: "35%",
    right: "2%",
    transform: [{ rotate: "-10deg" }],
  },

  /* ===== TÍTULO PRINCIPAL ===== */
  titleContainer: {
    marginBottom: 40,
    alignItems: "center",
  },

  title: {
    fontSize: 72,
    fontWeight: "900",
    letterSpacing: 8,
    textAlign: "center",
    color: "#F5B55A",
    textShadowColor: "rgba(233, 126, 12, 0.5)",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 12,
  },

  titleShadow: {
    fontSize: 72,
    fontWeight: "900",
    letterSpacing: 8,
    textAlign: "center",
    color: "transparent",
    position: "absolute",
    top: 4,
    left: 4,
    textShadowColor: "rgba(233, 126, 12, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },

  titleSub: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E480BB",
    textAlign: "center",
    letterSpacing: 12,
    marginTop: -8,
    textTransform: "uppercase",
  },

  /* ===== BOTÃO PRINCIPAL ===== */
  button: {
    height: 80,
    width: "100%",
    maxWidth: 350,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5B55A",
    borderWidth: 4,
    borderColor: "#E97E0C",
    shadowColor: "#E97E0C",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    position: "relative",
    overflow: "hidden",
  },

  buttonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },

  buttonText: {
    color: "#601938",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 4,
    textTransform: "uppercase",
  },

  /* ===== BOTÃO SHIMMER ===== */
  shimmerOverlay: {
    position: "absolute",
    top: 0,
    left: -100,
    width: "150%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    transform: [{ skewX: "-20deg" }],
  },

  /* ===== EFEITO GLOW ===== */
  glowContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(245, 181, 90, 0.03)",
    transform: [{ translateX: -150 }, { translateY: -150 }],
    zIndex: 0,
  },
});