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
    marginBottom: 16,
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
  headerTitle: {
    color: "#F5B55A",
    fontSize: 24,
    fontWeight: "900",
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
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
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
  // 4. ERROS
  // ============================================================
  errorContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 4,
  },
  errorText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 13,
    fontWeight: "600",
  },
  errorTextWarning: {
    color: "#f87171",
  },

  // ============================================================
  // 5. CARD PRINCIPAL
  // ============================================================
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: "rgba(245, 181, 90, 0.2)",
  },

  // ============================================================
  // 6. PALAVRA
  // ============================================================
  wordContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  wordLabel: {
    color: "#E480BB",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  wordSlots: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  wordSlot: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  wordSlotFilled: {
    backgroundColor: "rgba(245, 181, 90, 0.15)",
    borderColor: "#F5B55A",
  },
  wordSlotCorrect: {
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    borderColor: "#4CAF50",
  },
  wordSlotWrong: {
    backgroundColor: "rgba(244, 67, 54, 0.2)",
    borderColor: "#F44336",
  },
  wordSlotText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  wordSlotTextFilled: {
    color: "#F5B55A",
  },
  wordSlotTextCorrect: {
    color: "#4CAF50",
  },
  wordSlotTextWrong: {
    color: "#F44336",
  },

  // ============================================================
  // 7. DICA
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
  // 8. SÍLABAS
  // ============================================================
  syllablesContainer: {
    marginBottom: 16,
  },
  syllablesLabel: {
    color: "#E480BB",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  syllablesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  syllableButton: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 60,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  syllableText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  // ============================================================
  // 9. SÍLABAS SELECIONADAS
  // ============================================================
  selectedContainer: {
    marginBottom: 16,
  },
  selectedLabel: {
    color: "#E480BB",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
  },
  selectedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  selectedSyllable: {
    backgroundColor: "rgba(245, 181, 90, 0.15)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#F5B55A",
  },
  selectedSyllableText: {
    color: "#F5B55A",
    fontSize: 18,
    fontWeight: "700",
  },

  // ============================================================
  // 10. FEEDBACK
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
    marginBottom: 16,
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

  // ============================================================
  // 11. BOTÕES
  // ============================================================
  nextButton: {
    backgroundColor: "#F5B55A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 2,
    borderColor: "#E97E0C",
  },
  nextButtonText: {
    color: "#601938",
    fontSize: 16,
    fontWeight: "800",
  },
  button: {
    backgroundColor: "#F5B55A",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 6,
    borderWidth: 2,
    borderColor: "#E97E0C",
    width: "100%",
  },
  buttonSecondary: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  buttonText: {
    color: "#601938",
    fontWeight: "800",
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: "#FFFFFF",
  },

  // ============================================================
  // 12. TELA DE FALHA
  // ============================================================
  failCard: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: "#f44336",
    alignItems: "center",
  },
  failEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  failTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 4,
  },
  failText: {
    color: "#E480BB",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#F5B55A",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E97E0C",
    width: "100%",
  },
  retryButtonText: {
    color: "#601938",
    fontWeight: "800",
    fontSize: 16,
  },

  // ============================================================
  // 13. TELA DE CONCLUSÃO
  // ============================================================
  completionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: "#4CAF50",
    alignItems: "center",
  },
  completionEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  completionTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 4,
  },
  completionText: {
    color: "#E480BB",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginVertical: 8,
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
    alignItems: "center",
    marginVertical: 8,
    width: "100%",
  },
  percentageText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  starsEarned: {
    fontSize: 28,
    marginVertical: 4,
  },
  percentageBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 4,
    overflow: "hidden",
    width: "100%",
  },
  percentageFill: {
    height: "100%",
    backgroundColor: "#F5B55A",
    borderRadius: 4,
  },
  completionButtons: {
    width: "100%",
    gap: 10,
    marginTop: 8,
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
  resetButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  resetButtonText: {
    color: "#E480BB",
    fontSize: 16,
    fontWeight: "600",
  },
});