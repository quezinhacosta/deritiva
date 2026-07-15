import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // ===== LAYOUT PRINCIPAL =====
  container: {
    flex: 1,
    backgroundColor: "#601938",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  list: {
    paddingBottom: 30,
    gap: 12,
  },

  // ===== HEADER =====
  header: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  backButton: {
    backgroundColor: "#F5B55A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E97E0C",
  },
  backButtonText: {
    color: "#601938",
    fontWeight: "900",
    fontSize: 14,
  },
  title: {
    color: "#F5B55A",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 1,
  },
  subtitle: {
    color: "#E480BB",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },

  // ===== BOTOES DE NAVEGACAO =====
  navButtons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  navButton: {
    flex: 1,
    backgroundColor: "rgba(245, 181, 90, 0.12)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(245, 181, 90, 0.2)",
    alignItems: "center",
  },
  navButtonHighlight: {
    backgroundColor: "#F5B55A",
    borderColor: "#E97E0C",
  },
  navButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  navButtonTextHighlight: {
    color: "#601938",
  },

  // ===== CARD DO NIVEL =====
  levelCard: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#F5B55A",
    position: "relative",
    boxShadow: "0px 4px 8px rgba(245, 181, 90, 0.15)",
    elevation: 4,
  },
  levelCardLocked: {
    opacity: 0.5,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  levelCardCompleted: {
    borderColor: "#E480BB",
    backgroundColor: "rgba(228, 128, 187, 0.1)",
  },

  // ===== HEADER DO NIVEL =====
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
    zIndex: 1,
  },
  levelLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  levelNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5B55A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E97E0C",
  },
  levelNumberLocked: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  levelNumberText: {
    color: "#601938",
    fontWeight: "900",
    fontSize: 16,
  },
  levelNumberTextLocked: {
    color: "rgba(255, 255, 255, 0.4)",
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  levelDescription: {
    color: "#E480BB",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 1,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1.5,
  },
  levelBadgeUnlocked: {
    backgroundColor: "#F5B55A",
    borderColor: "#E97E0C",
  },
  levelBadgeLocked: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  levelBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#601938",
  },
  levelBadgeTextLocked: {
    color: "rgba(255, 255, 255, 0.4)",
  },

  // ===== ESTRELAS =====
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  starsText: {
    fontSize: 14,
    color: "#F5B55A",
    fontWeight: "600",
  },
  starsBadge: {
    fontSize: 16,
    color: "#F5B55A",
    fontWeight: "bold",
    marginLeft: 8,
  },

  // ===== CONECTOR DA TRILHA =====
  trailConnector: {
    position: "absolute",
    left: 28,
    top: -12,
    bottom: -12,
    width: 3,
    backgroundColor: "rgba(245, 181, 90, 0.2)",
    zIndex: 0,
  },
  trailConnectorActive: {
    backgroundColor: "#F5B55A",
  },
  trailConnectorLocked: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  // ===== TRILHA DE PROGRESSO =====
  trailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 4,
    position: "relative",
    zIndex: 1,
  },
  trailLine: {
    position: "absolute",
    left: 14,
    right: 14,
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
  },
  trailLineActive: {
    backgroundColor: "rgba(245, 181, 90, 0.3)",
  },
  stepDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.5,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stepDotIdle: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  stepDotActive: {
    backgroundColor: "#F5B55A",
    borderColor: "#E97E0C",
  },
  stepDotCompleted: {
    backgroundColor: "#E480BB",
    borderColor: "#F5B55A",
  },
  stepDotLocked: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  stepDotInner: {
    fontSize: 10,
    fontWeight: "900",
    color: "#601938",
  },
  stepDotInnerLocked: {
    color: "rgba(255, 255, 255, 0.2)",
  },

  // ===== LISTA DE EXERCICIOS =====
  exerciseList: {
    gap: 6,
    marginTop: 4,
    position: "relative",
    zIndex: 1,
  },
  exerciseButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E97E0C",
  },
  exerciseButtonLocked: {
    opacity: 0.4,
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  exerciseButtonCompleted: {
    borderColor: "#E480BB",
    backgroundColor: "rgba(228, 128, 187, 0.15)",
  },
  exerciseInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  exerciseIcon: {
    fontSize: 18,
  },
  exerciseTexts: {
    flex: 1,
  },
  exerciseTitle: {
    color: "#601938",
    fontWeight: "700",
    fontSize: 14,
  },
  exerciseTitleLocked: {
    color: "rgba(96, 25, 56, 0.4)",
  },
  exerciseSubtitle: {
    color: "#6e5d7e",
    fontSize: 11,
    marginTop: 1,
  },
  exerciseStatus: {
    fontSize: 16,
    marginLeft: 8,
  },

  // ===== MISCELANEA =====
  difficultyTag: {
    fontSize: 12,
    color: "#E480BB",
    marginTop: 2,
  },
  difficultyBadge: {
    fontSize: 12,
    color: "#E480BB",
    marginTop: 2,
  },
});