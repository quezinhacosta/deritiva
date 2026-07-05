import { useLocalSearchParams, useRouter } from "expo-router";
import { 
  View, Text, Pressable, StyleSheet, TouchableOpacity, ScrollView 
} from "react-native";
import { useState } from "react";

// Dados por nível
const getWordsByLevel = (level: number) => {
  const levelData: { [key: number]: any[] } = {
    1: [
      { emoji: "🐕", word: "CA__ORRO", correct: "CH", alternatives: ["CH", "SH", "SS", "RR"], fullWord: "CACHORRO", hint: "Animal de estimação" },
      { emoji: "🐈", word: "G__TO", correct: "A", alternatives: ["A", "E", "I", "O"], fullWord: "GATO", hint: "Animal que mia" },
      { emoji: "🐦", word: "P__SSARO", correct: "Á", alternatives: ["Á", "A", "Ã", "E"], fullWord: "PÁSSARO", hint: "Animal que voa" },
    ],
    2: [
      { emoji: "🐘", word: "ELEF__NTE", correct: "A", alternatives: ["A", "E", "I", "O"], fullWord: "ELEFANTE", hint: "Animal com tromba" },
      { emoji: "🦋", word: "BORB__LETA", correct: "O", alternatives: ["O", "A", "E", "U"], fullWord: "BORBOLETA", hint: "Inseto colorido" },
      { emoji: "🐢", word: "TART__RUGA", correct: "A", alternatives: ["A", "E", "I", "O"], fullWord: "TARTARUGA", hint: "Animal com casco" },
      { emoji: "🐟", word: "PE__XE", correct: "I", alternatives: ["I", "E", "A", "O"], fullWord: "PEIXE", hint: "Vive na água" },
    ],
    3: [
      { emoji: "🌭", word: "CACHORRO-Q__ENTE", correct: "U", alternatives: ["U", "A", "E", "I"], fullWord: "CACHORRO-QUENTE", hint: "Comida de festa" },
      { emoji: "🍝", word: "M__CARRÃO", correct: "A", alternatives: ["A", "E", "I", "O"], fullWord: "MACARRÃO", hint: "Comida italiana" },
      { emoji: "🍕", word: "P__ZZA", correct: "I", alternatives: ["I", "E", "A", "O"], fullWord: "PIZZA", hint: "Comida redonda" },
      { emoji: "🍔", word: "HAMB__RGUER", correct: "Ú", alternatives: ["Ú", "U", "A", "E"], fullWord: "HAMBÚRGUER", hint: "Sanduíche famoso" },
      { emoji: "🍦", word: "SORV__TE", correct: "E", alternatives: ["E", "A", "I", "O"], fullWord: "SORVETE", hint: "Sobremesa gelada" },
    ],
    4: [
      { emoji: "🛝", word: "ESCORR__GADOR", correct: "E", alternatives: ["E", "A", "I", "O"], fullWord: "ESCORREGADOR", hint: "Brinquedo de parque" },
      { emoji: "🧱", word: "PARALELEP__PEDO", correct: "Í", alternatives: ["Í", "I", "E", "A"], fullWord: "PARALELEPÍPEDO", hint: "Pedra de rua" },
      { emoji: "🥤", word: "REFRIG__RANTE", correct: "E", alternatives: ["E", "A", "I", "O"], fullWord: "REFRIGERANTE", hint: "Bebida gelada" },
      { emoji: "📺", word: "TELEV__SÃO", correct: "I", alternatives: ["I", "E", "A", "O"], fullWord: "TELEVISÃO", hint: "Aparelho de TV" },
      { emoji: "🌀", word: "VENTIL__DOR", correct: "A", alternatives: ["A", "E", "I", "O"], fullWord: "VENTILADOR", hint: "Aparelho que faz vento" },
    ],
    5: [
      { emoji: "🌍", word: "CONTIN__NTE", correct: "E", alternatives: ["E", "A", "I", "O"], fullWord: "CONTINENTE", hint: "Grande porção de terra" },
      { emoji: "🏛️", word: "MON__MENTO", correct: "U", alternatives: ["U", "A", "E", "I"], fullWord: "MONUMENTO", hint: "Construção histórica" },
      { emoji: "🚀", word: "FOG__TE", correct: "U", alternatives: ["U", "A", "E", "I"], fullWord: "FOGUETE", hint: "Vai ao espaço" },
      { emoji: "🦕", word: "DIN__SSAURO", correct: "O", alternatives: ["O", "A", "E", "I"], fullWord: "DINOSSAURO", hint: "Animal pré-histórico" },
      { emoji: "🏰", word: "CAST__LO", correct: "E", alternatives: ["E", "A", "I", "O"], fullWord: "CASTELO", hint: "Moradia de reis" },
      { emoji: "🧪", word: "CIÊNCI__", correct: "A", alternatives: ["A", "E", "I", "O"], fullWord: "CIÊNCIA", hint: "Estudo do conhecimento" },
    ],
  };

  return levelData[level] || levelData[1];
};

export default function SilabaFaltanteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ level: string }>();
  const level = parseInt(params.level || "1");
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const words = getWordsByLevel(level);
  const currentWord = words[currentIndex];
  const isLastWord = currentIndex === words.length - 1;

  const handleAlternativePress = (alt: string) => {
    if (showFeedback) return;
    
    setSelectedAlternative(alt);
    setShowFeedback(true);

    if (alt === currentWord.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAlternative(null);
    setShowFeedback(false);

    if (isLastWord) {
      setCompleted(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const resetExercise = () => {
    setCurrentIndex(0);
    setSelectedAlternative(null);
    setShowFeedback(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const totalQuestions = words.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        
        <View style={styles.card}>
          <Text style={styles.completionEmoji}>🎉</Text>
          <Text style={styles.completionTitle}>Parabéns!</Text>
          <Text style={styles.completionText}>Você completou o exercício!</Text>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{score}/{totalQuestions} acertos</Text>
            <Text style={styles.percentageText}>{percentage}%</Text>
          </View>
          
          <TouchableOpacity style={styles.resetButton} onPress={resetExercise}>
            <Text style={styles.resetButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </Pressable>

      <View style={styles.progressContainer}>
        <Text style={styles.exerciseTitle}>Sílaba Faltante</Text>
        <Text style={styles.levelText}>Nível {level}</Text>
        <Text style={styles.progressText}>{currentIndex + 1} de {words.length}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentIndex + 1) / words.length) * 100}%` }]} />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emojiText}>{currentWord.emoji}</Text>
        </View>

        <Text style={styles.hintText}>💡 {currentWord.hint}</Text>

        <View style={styles.wordContainer}>
          {currentWord.word.split("").map((char, index) => {
            const isMissing = char === "_";
            return (
              <View key={index} style={[
                styles.letterBox,
                isMissing && styles.missingLetterBox,
                isMissing && showFeedback && selectedAlternative === currentWord.correct && styles.correctLetterBox,
                isMissing && showFeedback && selectedAlternative !== currentWord.correct && selectedAlternative !== null && styles.wrongLetterBox,
              ]}>
                <Text style={[styles.letterText, isMissing && styles.missingLetter]}>
                  {isMissing && selectedAlternative && showFeedback ? selectedAlternative : char}
                </Text>
              </View>
            );
          })}
        </View>

        {showFeedback && (
          <View style={[
            styles.feedbackContainer,
            selectedAlternative === currentWord.correct ? styles.feedbackCorrect : styles.feedbackWrong
          ]}>
            <Text style={styles.feedbackText}>
              {selectedAlternative === currentWord.correct ? "✅ Correto!" : `❌ A resposta correta era: ${currentWord.correct}`}
            </Text>
            {selectedAlternative !== currentWord.correct && (
              <Text style={styles.fullWordText}>Palavra: {currentWord.fullWord}</Text>
            )}
          </View>
        )}

        <Text style={styles.alternativesLabel}>Escolha a sílaba correta:</Text>
        <View style={styles.alternativesContainer}>
          {currentWord.alternatives.map((alt, index) => {
            const isCorrect = alt === currentWord.correct;
            const isSelected = alt === selectedAlternative;
            let buttonStyle = styles.alternativeButton;
            
            if (showFeedback) {
              if (isCorrect) {
                buttonStyle = {...styles.alternativeButton, ...styles.alternativeCorrect};
              } else if (isSelected && !isCorrect) {
                buttonStyle = {...styles.alternativeButton, ...styles.alternativeWrong};
              } else {
                buttonStyle = {...styles.alternativeButton, ...styles.alternativeDisabled};
              }
            }

            return (
              <TouchableOpacity key={index} style={buttonStyle} onPress={() => handleAlternativePress(alt)} disabled={showFeedback}>
                <Text style={[styles.alternativeText, showFeedback && styles.alternativeTextDisabled]}>{alt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {showFeedback && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>{isLastWord ? "Ver resultados" : "Próxima →"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

// Styles (mesmos do exercício anterior)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#341e42",
    paddingHorizontal: 20,
    paddingTop: 54,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 16,
  },
  backButtonText: {
    color: "#341e42",
    fontWeight: "800",
  },
  progressContainer: {
    marginBottom: 16,
  },
  exerciseTitle: {
    color: "#ffd54f",
    fontSize: 22,
    fontWeight: "900",
  },
  levelText: {
    color: "#f6ebff",
    fontSize: 14,
    marginBottom: 4,
  },
  progressText: {
    color: "#f6ebff",
    fontSize: 14,
    marginBottom: 6,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ffd54f",
    borderRadius: 4,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#ffd54f",
  },
  emojiContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  emojiText: {
    fontSize: 80,
  },
  hintText: {
    color: "#e5c96f",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 16,
    textAlign: "center",
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    gap: 6,
    flexWrap: "wrap",
  },
  letterBox: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  missingLetterBox: {
    borderColor: "#ffd54f",
    borderWidth: 3,
    backgroundColor: "rgba(255,213,79,0.15)",
  },
  correctLetterBox: {
    borderColor: "#4CAF50",
    backgroundColor: "rgba(76, 175, 80, 0.3)",
  },
  wrongLetterBox: {
    borderColor: "#f44336",
    backgroundColor: "rgba(244, 67, 54, 0.3)",
  },
  letterText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },
  missingLetter: {
    color: "#ffd54f",
  },
  alternativesLabel: {
    color: "#f6ebff",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  alternativesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginBottom: 20,
  },
  alternativeButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    minWidth: 60,
    alignItems: "center",
  },
  alternativeCorrect: {
    backgroundColor: "#4CAF50",
  },
  alternativeWrong: {
    backgroundColor: "#f44336",
  },
  alternativeDisabled: {
    opacity: 0.5,
  },
  alternativeText: {
    color: "#341e42",
    fontSize: 18,
    fontWeight: "700",
  },
  alternativeTextDisabled: {
    color: "#ffffff",
  },
  feedbackContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  feedbackCorrect: {
    backgroundColor: "rgba(76, 175, 80, 0.3)",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  feedbackWrong: {
    backgroundColor: "rgba(244, 67, 54, 0.3)",
    borderWidth: 1,
    borderColor: "#f44336",
  },
  feedbackText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  fullWordText: {
    color: "#ffd54f",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 4,
  },
  nextButton: {
    backgroundColor: "#ffd54f",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#341e42",
    fontWeight: "800",
    fontSize: 16,
  },
  completionEmoji: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 16,
  },
  completionTitle: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
  },
  completionText: {
    color: "#f6ebff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  scoreContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  scoreText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },
  percentageText: {
    color: "#ffd54f",
    fontSize: 18,
    marginTop: 4,
  },
  resetButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
});