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

  scrollContent: {
    paddingBottom: 32,
  },

  header: {
    marginBottom: 24,
    alignItems: "center",
  },

  infoCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
  },

  cardDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },

  metricsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  metricItem: {
    alignItems: "center",
    flex: 1,
  },

  metricNumber: {
    fontSize: 28,
    fontWeight: "900",
  },

  metricLabel: {
    fontSize: 12,
    marginTop: 4,
  },

  metricDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(82, 121, 111, 0.35)",
  },

  featuresSection: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },

  featureBadge: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },

  badgeText: {
    fontSize: 15,
    fontWeight: "700",
  },

  actionContainer: {
    gap: 12,
  },

  primaryButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: "800",
  },

  secondaryButton: {
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: "center",
  },

  secondaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
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

  /* ===== CARDS (para a tela de progresso) ===== */
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(245, 181, 90, 0.2)",
    width: "100%",
  },

  cardTitle: {
    color: "#F5B55A",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  cardText: {
    color: "#E480BB",
    fontSize: 14,
    marginBottom: 4,
  },

  barBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    backgroundColor: "#F5B55A",
    borderRadius: 4,
  },
});