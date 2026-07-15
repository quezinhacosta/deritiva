import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, TouchableOpacity, ScrollView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useState, useEffect } from "react";
import { styles } from "../../../styles/silabaFaltante";

// ===== DADOS POR NÍVEL =====
const getWordsByLevel = (level: number) => {
  const levelData: Record<number, Array<{
    word: string;
    correct: string;
    alternatives: string[];
    fullWord: string;
    hint: string;
  }>> = {
    1: [
      { word: "CA__ORRO", correct: "CH", alternatives: ["CH", "SH", "SS", "RR"], fullWord: "CACHORRO", hint: "Animal de estimação que late" },
      { word: "G__TO", correct: "A", alternatives: ["A", "E", "I", "O"], fullWord: "GATO", hint: "Animal que mia" },
      { word: "P__SSARO", correct: "Á", alternatives: ["Á", "A", "Ã", "E"], fullWord: "PÁSSARO", hint: "Animal que voa" },
    ],
    2: [
      { word: "ELEF__NTE", correct: "A", alternatives: ["A", "E", "I", "O"], fullWord: "ELEFANTE", hint: "Animal com tromba" },
      { word: "BORB__LETA", correct: "O", alternatives: ["O", "A", "E", "U"], fullWord: "BORBOLETA", hint: "Inseto colorido" },
      { word: "TART__RUGA", correct: "A", alternatives: ["A", "E", "I", "O"], fullWord: "TARTARUGA", hint: "Animal com casco" },
      { word: "PE__XE", correct: "I", alternatives: ["I", "E", "A", "O"], fullWord: "PEIXE", hint: "Vive na água" },
    ],
    3: [
      { word: "CACHORRO-Q__ENTE", correct: "U", alternatives: ["U", "A", "E", "I"], fullWord: "CACHORRO-QUENTE", hint: "Comida de festa" },
      { word: "M__CARRÃO", correct: "A", alternatives: ["A", "E", "I", "O"], fullWord: "MACARRÃO", hint: "Comida italiana" },
      { word: "P__ZZA", correct: "I", alternatives: ["I", "E", "A", "O"], fullWord: "PIZZA", hint: "Comida redonda" },
      { word: "HAMB__RGUER", correct: "Ú", alternatives: ["Ú", "U", "A", "E"], fullWord: "HAMBÚRGUER", hint: "Sanduíche famoso" },
      { word: "SORV__TE", correct: "E", alternatives: ["E", "A", "I", "O"], fullWord: "SORVETE", hint: "Sobremesa gelada" },
    ],
    4: [
      { word: "ESCORR__GADOR", correct: "E", alternatives: ["E", "A", "I", "O"], fullWord: "ESCORREGADOR", hint: "Brinquedo de parque" },
      { word: "PARALELEP__PEDO", correct: "Í", alternatives: ["Í", "I", "E", "A"], fullWord: "PARALELEPÍPEDO", hint: "Pedra de rua" },
      { word: "REFRIG__RANTE", correct: "E", alternatives: ["E", "A", "I", "O"], fullWord: "REFRIGERANTE", hint: "Bebida gelada" },
      { word: "TELEV__SÃO", correct: "I", alternatives: ["I", "E", "A", "O"], fullWord: "TELEVISÃO", hint: "Aparelho de TV" },
      { word: "VENTIL__DOR", correct: "A", alternatives: ["A", "E", "I", "O"], fullWord: "VENTILADOR", hint: "Aparelho que faz vento" },
    ],
    5: [
      { word: "CONTIN__NTE", correct: "E", alternatives: ["E", "A", "I", "O"], fullWord: "CONTINENTE", hint: "Grande porção de terra" },
      { word: "MON__MENTO", correct: "U", alternatives: ["U", "A", "E", "I"], fullWord: "MONUMENTO", hint: "Construção histórica" },
      { word: "FOG__TE", correct: "U", alternatives: ["U", "A", "E", "I"], fullWord: "FOGUETE", hint: "Vai ao espaço" },
      { word: "DIN__SSAURO", correct: "O", alternatives: ["O", "A", "E", "I"], fullWord: "DINOSSAURO", hint: "Animal pré-histórico" },
      { word: "CAST__LO", correct: "E", alternatives: ["E", "A", "I", "O"], fullWord: "CASTELO", hint: "Moradia de reis" },
      { word: "CIÊNCI__", correct: "A", alternatives: ["A", "E", "I", "O"], fullWord: "CIÊNCIA", hint: "Estudo do conhecimento" },
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
  const [showHint, setShowHint] = useState(false);

  const words = getWordsByLevel(level);
  const currentWord = words[currentIndex];
  const isLastWord = currentIndex === words.length - 1;

  // Animações
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const feedbackScale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withTiming(1, { duration: 500 });
  }, [currentIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const feedbackStyle = useAnimatedStyle(() => ({
    transform: [{ scale: feedbackScale.value }],
  }));

  const handleAlternativePress = (alt: string) => {
    if (showFeedback) return;
    
    setSelectedAlternative(alt);
    setShowFeedback(true);
    feedbackScale.value = withSequence(
      withSpring(0.8),
      withSpring(1)
    );

    if (alt === currentWord.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAlternative(null);
    setShowFeedback(false);
    setShowHint(false);

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
    setShowHint(false);
  };

  const getLevelTitle = () => {
    const titles: Record<string, string> = {
      '1': 'Iniciante',
      '2': 'Aprendiz',
      '3': 'Intermediário',
      '4': 'Avançado',
      '5': 'Mestre',
    };
    return titles[String(level)] || 'Nível';
  };

  if (completed) {
    const totalQuestions = words.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </Pressable>
          <View style={styles.headerInfo}>
            <Text style={styles.levelBadge}>Concluído!</Text>
            <Text style={styles.levelTitle}>Sílaba Faltante</Text>
          </View>
        </View>
        
        <View style={styles.completionCard}>
          <Text style={styles.completionEmoji}>✅</Text>
          <Text style={styles.completionTitle}>Parabéns!</Text>
          <Text style={styles.completionText}>Você completou o exercício!</Text>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreTotal}>/{totalQuestions}</Text>
            <Text style={styles.scoreLabel}>acertos</Text>
          </View>
          
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>{percentage}%</Text>
            <View style={styles.percentageBar}>
              <View style={[styles.percentageFill, { width: `${percentage}%` }]} />
            </View>
          </View>

          <View style={styles.completionButtons}>
            <TouchableOpacity style={styles.retryButton} onPress={resetExercise}>
              <Text style={styles.retryButtonText}>Tentar novamente</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.continueButton} 
              onPress={() => router.push('/exercicio1')}
            >
              <Text style={styles.continueButtonText}>Voltar aos níveis</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <View style={styles.headerInfo}>
          <Text style={styles.levelBadge}>Nível {level}</Text>
          <Text style={styles.levelTitle}>{getLevelTitle()}</Text>
        </View>
      </View>

      {/* Progresso */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progresso</Text>
          <Text style={styles.progressText}>{currentIndex + 1} de {words.length}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentIndex + 1) / words.length) * 100}%` }]} />
        </View>
      </View>

      <Animated.View style={[styles.card, animatedStyle]}>
        {/* Dica */}
        <Pressable 
          style={styles.hintButton}
          onPress={() => setShowHint(!showHint)}
        >
          <Text style={styles.hintButtonText}>
            {showHint ? 'Ocultar dica' : 'Ver dica'}
          </Text>
        </Pressable>

        {showHint && (
          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>💡 {currentWord.hint}</Text>
          </View>
        )}

        {/* Palavra com espaço faltante */}
        <View style={styles.wordContainer}>
          <Text style={styles.wordLabel}>Complete a palavra:</Text>
          <View style={styles.wordBoxes}>
            {currentWord.word.split("").map((char, index) => {
              const isMissing = char === "_";
              const isCorrect = isMissing && showFeedback && selectedAlternative === currentWord.correct;
              const isWrong = isMissing && showFeedback && selectedAlternative !== currentWord.correct && selectedAlternative !== null;
              const displayChar = isMissing && selectedAlternative && showFeedback ? selectedAlternative : char;
              
              return (
                <View key={index} style={[
                  styles.letterBox,
                  isMissing && styles.missingLetterBox,
                  isCorrect && styles.correctLetterBox,
                  isWrong && styles.wrongLetterBox,
                ]}>
                  <Text style={[
                    styles.letterText,
                    isMissing && styles.missingLetter,
                    isCorrect && styles.correctLetter,
                    isWrong && styles.wrongLetter,
                  ]}>
                    {displayChar}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Alternativas */}
        <Text style={styles.alternativesLabel}>Escolha a sílaba correta:</Text>
        <View style={styles.alternativesContainer}>
          {currentWord.alternatives.map((alt, index) => {
            const isCorrect = alt === currentWord.correct;
            const isSelected = alt === selectedAlternative;
            let buttonStyle = styles.alternativeButton;
            
            if (showFeedback) {
              if (isCorrect) {
                buttonStyle = styles.alternativeCorrect;
              } else if (isSelected && !isCorrect) {
                buttonStyle = styles.alternativeWrong;
              } else {
                buttonStyle = styles.alternativeDisabled;
              }
            }

            return (
              <TouchableOpacity 
                key={index} 
                style={buttonStyle} 
                onPress={() => handleAlternativePress(alt)} 
                disabled={showFeedback}
              >
                <Text style={styles.alternativeText}>{alt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback */}
        {showFeedback && (
          <Animated.View style={[styles.feedbackContainer, feedbackStyle]}>
            {selectedAlternative === currentWord.correct ? (
              <View style={styles.feedbackCorrect}>
                <Text style={styles.feedbackEmoji}>✅</Text>
                <Text style={styles.feedbackTitle}>Resposta correta!</Text>
                <Text style={styles.feedbackText}>
                  A palavra completa é: {currentWord.fullWord}
                </Text>
              </View>
            ) : (
              <View style={styles.feedbackWrong}>
                <Text style={styles.feedbackEmoji}>❌</Text>
                <Text style={styles.feedbackTitle}>Resposta incorreta</Text>
                <Text style={styles.feedbackText}>
                  A resposta correta é: {currentWord.correct}
                </Text>
                <Text style={styles.feedbackFullWord}>
                  Palavra: {currentWord.fullWord}
                </Text>
              </View>
            )}
          </Animated.View>
        )}

        {/* Botão Próximo */}
        {showFeedback && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {isLastWord ? 'Ver resultados' : 'Próximo →'}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </ScrollView>
  );
}