import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#601938",
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  scrollContent: {
    flex: 1,
    paddingBottom: 24,
  },

  // ===== HEADER =====
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  backButton: {
    backgroundColor: "#F5B55A",
    paddingHorizontal: 14,
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
  headerTitle: {
    color: "#F5B55A",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  // ===== VOICE CONTROLS (removido) =====
  voiceControls: {
    display: "none",
  },

  // ===== PROGRESSO =====
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
    paddingVertical: 8,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  progressDotActive: {
    backgroundColor: "#F5B55A",
    width: 20,
    borderRadius: 5,
  },
  progressDotCompleted: {
    backgroundColor: "#E480BB",
  },

  // ===== NAVEGACAO =====
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 4,
  },
  navButton: {
    backgroundColor: "#F5B55A",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E97E0C",
    minWidth: 100,
    alignItems: "center",
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    color: "#601938",
    fontWeight: "700",
    fontSize: 14,
  },
  stepCounter: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  // ===== BOTAO JOGAR =====
  playButton: {
    backgroundColor: "#F5B55A",
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E97E0C",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  playButtonText: {
    color: "#601938",
    fontWeight: "900",
    fontSize: 18,
    letterSpacing: 0.5,
  },

  // ===== CARD DO TUTORIAL =====
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#F5B55A",
    marginBottom: 8,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },
  cardDescription: {
    color: "#E480BB",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },

  // ===== INSTRUCTION (adicionado) =====
  instruction: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },

  // ===== DEMONSTRACAO VISUAL =====
  demoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(245, 181, 90, 0.15)",
    alignItems: "center",
  },
  demoTitle: {
    color: "#E480BB",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  demoContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  demoWord: {
    color: "#F5B55A",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 2,
  },
  demoWordMissing: {
    color: "#E480BB",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 2,
    backgroundColor: "rgba(228, 128, 187, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E480BB",
    borderStyle: "dashed",
  },
  demoWordPart: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 2,
  },
  demoOption: {
    backgroundColor: "#F5B55A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#E97E0C",
    minWidth: 50,
    alignItems: "center",
  },
  demoOptionText: {
    color: "#601938",
    fontWeight: "800",
    fontSize: 16,
  },
  demoOptionCorrect: {
    backgroundColor: "#4CAF50",
    borderColor: "#2E7D32",
  },
  demoOptionWrong: {
    backgroundColor: "#f44336",
    borderColor: "#c62828",
  },
  demoRadical: {
    color: "#F5B55A",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 2,
  },
  demoSuffix: {
    backgroundColor: "#F5B55A",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#E97E0C",
  },
  demoSuffixText: {
    color: "#601938",
    fontSize: 20,
    fontWeight: "800",
  },
  demoFamily: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  demoFamilyWord: {
    backgroundColor: "rgba(245, 181, 90, 0.12)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(245, 181, 90, 0.15)",
  },
  demoFamilyWordText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  demoFamilyIntruder: {
    backgroundColor: "rgba(244, 67, 54, 0.12)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#f44336",
  },
  demoFamilyIntruderText: {
    color: "#f44336",
    fontSize: 16,
    fontWeight: "700",
  },
  demoHint: {
    color: "#E480BB",
    fontSize: 13,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 8,
  },
  demoLevels: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  demoLevel: {
    backgroundColor: "rgba(245, 181, 90, 0.12)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(245, 181, 90, 0.15)",
    alignItems: "center",
    minWidth: 40,
  },
  demoLevelActive: {
    backgroundColor: "#F5B55A",
    borderColor: "#E97E0C",
  },
  demoLevelText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  demoLevelTextActive: {
    color: "#601938",
    fontWeight: "800",
  },
  demoStars: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    marginTop: 4,
  },
  demoStar: {
    color: "#F5B55A",
    fontSize: 24,
  },
  demoStarEmpty: {
    color: "rgba(255, 255, 255, 0.15)",
    fontSize: 24,
  },
  demoTip: {
    color: "#E480BB",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },
  demoTipHighlight: {
    color: "#F5B55A",
    fontWeight: "700",
  },
  demoSeparator: {
    color: "rgba(255, 255, 255, 0.1)",
    fontSize: 20,
    marginHorizontal: 4,
  },
  demoEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  demoTitleText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  demoSubtitle: {
    color: "#E480BB",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
});