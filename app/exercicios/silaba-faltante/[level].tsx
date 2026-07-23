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
import { saveExerciseResult, starsFromPercentage } from "../../../utils/progress";


const getWordsByLevel = (level: number) => {
  const levelData: Record<number, Array<{
    syllables: string[];      
    missingIndex: number;      
    correctSyllable: string;    
    alternatives: string[];    
    fullWord: string;        
    hint: string;
  }>> = {
    1: [
      { 
        syllables: ["DE", "DO"], 
        missingIndex: 1, 
        correctSyllable: "DO", 
        alternatives: ["DO", "DE", "DU", "DI"], 
        fullWord: "DEDO", 
        hint: "Parte da mão" 
      },
      { 
        syllables: ["GA", "TO"], 
        missingIndex: 1, 
        correctSyllable: "TO", 
        alternatives: ["TO", "TA", "TE", "TI"], 
        fullWord: "GATO", 
        hint: "Animal que mia" 
      },
      { 
        syllables: ["PAS", "SA", "RO"], 
        missingIndex: 1, 
        correctSyllable: "SA", 
        alternatives: ["SA", "SE", "SI", "SO"], 
        fullWord: "PASSARO", 
        hint: "Animal que voa" 
      },
    ],
    2: [
      { 
        syllables: ["E", "LE", "FAN", "TE"], 
        missingIndex: 2, 
        correctSyllable: "FAN", 
        alternatives: ["FAN", "FEN", "FIN", "FON"], 
        fullWord: "ELEFANTE", 
        hint: "Animal com tromba" 
      },
      { 
        syllables: ["BOR", "BO", "LE", "TA"], 
        missingIndex: 2, 
        correctSyllable: "LE", 
        alternatives: ["LE", "LA", "LI", "LO"], 
        fullWord: "BORBOLETA", 
        hint: "Inseto colorido" 
      },
      { 
        syllables: ["TAR", "TA", "RU", "GA"], 
        missingIndex: 2, 
        correctSyllable: "RU", 
        alternatives: ["RU", "RA", "RE", "RI"], 
        fullWord: "TARTARUGA", 
        hint: "Animal com casco" 
      },
      { 
        syllables: ["BE", "LE", "ZA"], 
        missingIndex: 0, 
        correctSyllable: "BE", 
        alternatives: ["BE", "BO", "BA", "BU"], 
        fullWord: "BELEZA", 
        hint: "Se algo é belo, então há..." 
      },
    ],
    3: [
      { 
        syllables: ["AS", "SUS", "TAR"], 
        missingIndex: 1, 
        correctSyllable: "SUS", 
        alternatives: ["SUS", "SAS", "SSUS", "SOS"], 
        fullWord: "ASSUSTAR", 
        hint: "Ação de assustar alguém" 
      },
      { 
        syllables: ["MA", "CAR", "RAO"], 
        missingIndex: 1, 
        correctSyllable: "CAR", 
        alternatives: ["CAR", "COR", "CUR", "CER"], 
        fullWord: "MACARRAO", 
        hint: "Comida italiana" 
      },
      { 
        syllables: ["PIZ", "ZA"], 
        missingIndex: 0, 
        correctSyllable: "PIZ", 
        alternatives: ["PIZ", "PEZ", "PAZ", "PUZ"], 
        fullWord: "PIZZA", 
        hint: "Comida redonda" 
      },
    ],
    4: [
      { 
        syllables: ["ES", "COR", "RER"], 
        missingIndex: 2, 
        correctSyllable: "RER", 
        alternatives: ["RER", "RAR", "RIR", "ROR"], 
        fullWord: "ESCORRER", 
        hint: "Brinquedo de parque" 
      },
      { 
        syllables: ["POR", "TU", "GUÊS"], 
        missingIndex: 1, 
        correctSyllable: "TU", 
        alternatives: ["TA", "TA", "TE", "TU"], 
        fullWord: "PORTUGUÊS", 
        hint: "Quem nasce em portugal é..." 
      },
      { 
        syllables: ["AS", "SUS", "TA", "DO"], 
        missingIndex: 0, 
        correctSyllable: "AS", 
        alternatives: ["AS", "TA", "SUS", "DO"], 
        fullWord: "ASSUSTADO", 
        hint: "Se eu me assustei, então estou..." 
      },
    ],
    5: [
      { 
        syllables: ["CON", "TI", "NEN", "TE"], 
        missingIndex: 2, 
        correctSyllable: "NEN", 
        alternatives: ["NEN", "NAN", "NIN", "NON"], 
        fullWord: "CONTINENTE", 
        hint: "Grande porcao de terra" 
      },
      { 
        syllables: ["MO", "NU", "MEN", "TO"], 
        missingIndex: 2, 
        correctSyllable: "MEN", 
        alternatives: ["MEN", "MAN", "MIN", "MON"], 
        fullWord: "MONUMENTO", 
        hint: "Construcao historica" 
      },
      { 
        syllables: ["BI", "CI","CLE", "TA"], 
        missingIndex: 1, 
        correctSyllable: "CI", 
        alternatives: ["CA", "CU", "CI", "CO"], 
        fullWord: "Bicicleta", 
        hint: "Meio de transporte de duas rodas" 
      },
      { 
        syllables: ["DI", "NOS", "SAU", "RO"], 
        missingIndex: 2, 
        correctSyllable: "SAU", 
        alternatives: ["SAU", "SEU", "SIU", "SOU"], 
        fullWord: "DINOSSAURO", 
        hint: "Animal pre-historico" 
      },
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

  useEffect(() => {
    if (!completed) return;
    const totalQuestions = words.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const errors = totalQuestions - score;
    saveExerciseResult(level, `silaba-faltante-${level}`, starsFromPercentage(percentage), errors);
  }, [completed]);

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

    if (alt === currentWord.correctSyllable) {
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
      '3': 'Intermediario',
      '4': 'Avançado',
      '5': 'Mestre',
    };
    return titles[String(level)] || 'Nivel';
  };

  if (completed) {
    const totalQuestions = words.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </Pressable>
          <View style={styles.headerInfo}>
            <Text style={styles.levelBadge}>Concluido!</Text>
            <Text style={styles.levelTitle}>Silaba Faltante</Text>
          </View>
        </View>
        
        <View style={styles.completionCard}>
          <Text style={styles.completionEmoji}>✓</Text>
          <Text style={styles.completionTitle}>Parabens!</Text>
          <Text style={styles.completionText}>Voce completou o exercicio!</Text>
          
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
              <Text style={styles.continueButtonText}>Voltar aos niveis</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
        <View style={styles.headerInfo}>
          <Text style={styles.levelBadge}>Nivel {level}</Text>
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
            <Text style={styles.hintText}>Dica: {currentWord.hint}</Text>
          </View>
        )}


        <View style={styles.wordContainer}>
          <Text style={styles.wordLabel}>Complete a palavra:</Text>
          <View style={styles.wordBoxes}>
            {currentWord.syllables.map((syllable, index) => {
              const isMissing = index === currentWord.missingIndex;
              
              // Para sílabas normais, mostra a sílaba
              if (!isMissing) {
                return (
                  <View key={index} style={styles.syllableBox}>
                    <Text style={styles.syllableText}>{syllable}</Text>
                  </View>
                );
              }
              
              // Para a sílaba faltante, mostra o espaço vazio ou a resposta
              const isCorrect = showFeedback && selectedAlternative === currentWord.correctSyllable;
              const isWrong = showFeedback && selectedAlternative !== currentWord.correctSyllable && selectedAlternative !== null;
              const displayText = showFeedback ? selectedAlternative : "___";
              
              return (
                <View key={index} style={[
                  styles.syllableBox,
                  styles.missingSyllableBox,
                  isCorrect && styles.correctSyllableBox,
                  isWrong && styles.wrongSyllableBox,
                ]}>
                  <Text style={[
                    styles.syllableText,
                    styles.missingSyllableText,
                    isCorrect && styles.correctSyllableText,
                    isWrong && styles.wrongSyllableText,
                  ]}>
                    {displayText}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Alternativas */}
        <Text style={styles.alternativesLabel}>Escolha a silaba correta:</Text>
        <View style={styles.alternativesContainer}>
          {currentWord.alternatives.map((alt, index) => {
            const isCorrect = alt === currentWord.correctSyllable;
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
            {selectedAlternative === currentWord.correctSyllable ? (
              <View style={styles.feedbackCorrect}>
                <Text style={styles.feedbackEmoji}>✓</Text>
                <Text style={styles.feedbackTitle}>Resposta correta!</Text>
                <Text style={styles.feedbackText}>
                  A palavra completa e: {currentWord.fullWord}
                </Text>
              </View>
            ) : (
              <View style={styles.feedbackWrong}>
                <Text style={styles.feedbackEmoji}>✗</Text>
                <Text style={styles.feedbackTitle}>Resposta incorreta</Text>
                <Text style={styles.feedbackText}>
                  A silaba correta e: {currentWord.correctSyllable}
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
              {isLastWord ? 'Ver resultados' : 'Proximo >'}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </ScrollView>
  );
}