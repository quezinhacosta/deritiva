import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // ============================================================
  // 1. LAYOUT PRINCIPAL
  // ============================================================
  container: {
    flex: 1,
    backgroundColor: "#601938",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 24,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  // ============================================================
  // 2. HEADER
  // ============================================================
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  backButton: {
    backgroundColor: "#F5B55A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E97E0C",
    marginRight: 12,
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
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  levelTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 2,
  },

  // ============================================================
  // 3. PROGRESSO
  // ============================================================
  progressContainer: {
    marginBottom: 20,
    paddingHorizontal: 4,
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
    color: "#F5B55A",
    fontSize: 13,
    fontWeight: "700",
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#F5B55A",
    borderRadius: 4,
  },

  // ============================================================
  // 4. CARD PRINCIPAL
  // ============================================================
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: "rgba(245, 181, 90, 0.2)",
    shadowColor: "#F5B55A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },

  // ============================================================
  // 5. FAMILIA
  // ============================================================
  familyContainer: {
    backgroundColor: "rgba(245, 181, 90, 0.08)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(245, 181, 90, 0.15)",
  },
  familyLabel: {
    color: "#E480BB",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  familyWord: {
    color: "#F5B55A",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 2,
  },

  // ============================================================
  // 6. DICA
  // ============================================================
  hintButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  hintButtonText: {
    color: "#E480BB",
    fontSize: 13,
    fontWeight: "600",
  },
  hintContainer: {
    backgroundColor: "rgba(245, 181, 90, 0.08)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(245, 181, 90, 0.15)",
  },
  hintText: {
    color: "#F5B55A",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },

  // ============================================================
  // 7. INSTRUCAO
  // ============================================================
  instruction: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },

  // ============================================================
  // 8. PALAVRAS
  // ============================================================
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },
  wordButton: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 80,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  wordButtonIntruder: {
    backgroundColor: "rgba(76, 175, 80, 0.15)",
    borderColor: "#4CAF50",
  },
  wordButtonWrong: {
    backgroundColor: "rgba(244, 67, 54, 0.15)",
    borderColor: "#F44336",
  },
  wordButtonDisabled: {
    opacity: 0.4,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  wordText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  // ============================================================
  // 9. FEEDBACK
  // ============================================================
  feedbackContainer: {
    marginBottom: 16,
  },
  feedbackCorrect: {
    backgroundColor: "rgba(76, 175, 80, 0.12)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.2)",
  },
  feedbackWrong: {
    backgroundColor: "rgba(244, 67, 54, 0.12)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(244, 67, 54, 0.2)",
  },
  feedbackEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  feedbackTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  feedbackText: {
    color: "#E480BB",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  feedbackFamily: {
    color: "#F5B55A",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.06)",
  },

  // ============================================================
  // 10. BOTAO PROXIMO
  // ============================================================
  nextButton: {
    backgroundColor: "#F5B55A",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E97E0C",
  },
  nextButtonText: {
    color: "#601938",
    fontSize: 16,
    fontWeight: "800",
  },

  // ============================================================
  // 11. TELA DE CONCLUSAO
  // ============================================================
  completionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 24,
    padding: 32,
    borderWidth: 2,
    borderColor: "#F5B55A",
    alignItems: "center",
  },
  completionEmoji: {
    fontSize: 56,
    color: "#4CAF50",
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
    textAlign: "center",
    marginBottom: 24,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  scoreNumber: {
    color: "#F5B55A",
    fontSize: 48,
    fontWeight: "900",
  },
  scoreTotal: {
    color: "#E480BB",
    fontSize: 24,
    fontWeight: "600",
  },
  scoreLabel: {
    color: "#E480BB",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  percentageContainer: {
    width: "100%",
    marginBottom: 24,
  },
  percentageText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  percentageBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
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
    gap: 12,
  },
  retryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  retryButtonText: {
    color: "#E480BB",
    fontSize: 16,
    fontWeight: "600",
  },
  continueButton: {
    backgroundColor: "#F5B55A",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E97E0C",
  },
  continueButtonText: {
    color: "#601938",
    fontSize: 16,
    fontWeight: "800",
  },
});