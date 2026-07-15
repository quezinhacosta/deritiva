import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#601938",
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  // ===== HEADER =====
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
  headerInfo: {
    flex: 1,
  },
  levelBadge: {
    color: "#E480BB",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
  },
  levelTitle: {
    color: "#F5B55A",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  // ===== PROGRESSO =====
  progressContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  progressLabel: {
    color: "#E480BB",
    fontSize: 13,
    fontWeight: "600",
  },
  progressText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#F5B55A",
    borderRadius: 3,
  },

  // ===== CARD PRINCIPAL =====
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#F5B55A",
  },

  // ===== FAMILIA =====
  familyContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  familyLabel: {
    color: "#E480BB",
    fontSize: 14,
    fontWeight: "600",
  },
  familyWord: {
    color: "#F5B55A",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 3,
    marginTop: 2,
  },

  // ===== DICA =====
  hintButton: {
    backgroundColor: "rgba(245, 181, 90, 0.12)",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(245, 181, 90, 0.25)",
    alignItems: "center",
    marginBottom: 12,
  },
  hintButtonText: {
    color: "#F5B55A",
    fontWeight: "700",
    fontSize: 14,
  },
  hintContainer: {
    backgroundColor: "rgba(245, 181, 90, 0.08)",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(245, 181, 90, 0.15)",
    marginBottom: 16,
  },
  hintText: {
    color: "#E480BB",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },

  // ===== INSTRUCAO =====
  instruction: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },

  // ===== PALAVRAS =====
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 16,
  },
  wordButton: {
    backgroundColor: "#F5B55A",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E97E0C",
    minWidth: 80,
    alignItems: "center",
  },
  wordButtonIntruder: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#2E7D32",
    minWidth: 80,
    alignItems: "center",
  },
  wordButtonWrong: {
    backgroundColor: "#f44336",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#c62828",
    minWidth: 80,
    alignItems: "center",
  },
  wordButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
    minWidth: 80,
    alignItems: "center",
    opacity: 0.5,
  },
  wordText: {
    color: "#601938",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  // ===== FEEDBACK =====
  feedbackContainer: {
    marginBottom: 16,
  },
  feedbackCorrect: {
    backgroundColor: "rgba(76, 175, 80, 0.12)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#4CAF50",
    alignItems: "center",
  },
  feedbackWrong: {
    backgroundColor: "rgba(244, 67, 54, 0.12)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#f44336",
    alignItems: "center",
  },
  feedbackEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  feedbackTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 4,
  },
  feedbackText: {
    color: "#E480BB",
    fontSize: 14,
    textAlign: "center",
  },
  feedbackFamily: {
    color: "#F5B55A",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },

  // ===== BOTAO PROXIMO =====
  nextButton: {
    backgroundColor: "#F5B55A",
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E97E0C",
    alignItems: "center",
  },
  nextButtonText: {
    color: "#601938",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  // ===== TELA DE CONCLUSAO =====
  completionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: "#F5B55A",
    alignItems: "center",
  },
  completionEmoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  completionTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 4,
  },
  completionText: {
    color: "#E480BB",
    fontSize: 16,
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
  },
  scoreNumber: {
    color: "#F5B55A",
    fontSize: 48,
    fontWeight: "900",
  },
  scoreTotal: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  scoreLabel: {
    color: "#E480BB",
    fontSize: 16,
    marginLeft: 8,
  },
  percentageContainer: {
    width: "100%",
    marginBottom: 20,
  },
  percentageText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  percentageBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  percentageFill: {
    height: "100%",
    backgroundColor: "#F5B55A",
    borderRadius: 4,
  },
  completionButtons: {
    width: "100%",
    gap: 10,
  },
  retryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
  },
  retryButtonText: {
    color: "#E480BB",
    fontWeight: "700",
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#F5B55A",
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E97E0C",
    alignItems: "center",
  },
  continueButtonText: {
    color: "#601938",
    fontWeight: "900",
    fontSize: 16,
  },
});