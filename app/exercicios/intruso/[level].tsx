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
import { styles } from "../../../styles/intruso";
import { saveExerciseResult, starsFromPercentage } from "../../../utils/progress";

// ===== DADOS POR NIVEL =====
const getIntrusoData = (level: number) => {
  const levelData: Record<number, Array<{
    family: string;
    words: string[];
    intruder: string;
    hint: string;
  }>> = {
    1: [
      { 
        family: 'FLOR', 
        words: ['FLORAL', 'FLORIDO', 'FLOREIRA'], 
        intruder: 'FLORESTA',
        hint: 'Qual palavra nao vem de FLOR?'
      },
      { 
        family: 'TERRA', 
        words: ['TERRENO', 'TERRESTRE', 'ENTERRAR'], 
        intruder: 'TERMINAR',
        hint: 'Qual palavra nao vem de TERRA?'
      },
      { 
        family: 'SOL', 
        words: ['SOLAR', 'SOLEIRA', 'ENSOLAR'], 
        intruder: 'SOLTAR',
        hint: 'Qual palavra nao vem de SOL?'
      },
    ],
    2: [
      { 
        family: 'MAR', 
        words: ['MARINHO', 'MARE', 'SUBMARINO'], 
        intruder: 'MERGULHAR',
        hint: 'Qual palavra nao vem de MAR?'
      },
      { 
        family: 'LUZ', 
        words: ['LUMINOSO', 'ILUMINAR', 'LUZIR'], 
        intruder: 'LUXAR',
        hint: 'Qual palavra nao vem de LUZ?'
      },
      { 
        family: 'FELIZ', 
        words: ['FELIZARDO', 'FELICIDADE'], 
        intruder: 'FESTA',
        hint: 'Qual palavra nao vem de FELIZ?'
      },
    ],
    3: [
      { 
        family: 'MENINA', 
        words: ['MENINO', 'MENINICE', 'MENININHA'], 
        intruder: 'MULHER',
        hint: 'Qual palavra nao vem de MENINA?'
      },
      { 
        family: 'CASA', 
        words: ['CASINHA', 'CASARÃO', 'CASAMENTO'], 
        intruder: 'CASTELO',
        hint: 'Qual palavra nao vem de CASA?'
      },
      { 
        family: 'GATO', 
        words: ['GATINHO', 'GATUNO', 'GATARRADA'], 
        intruder: 'GARRA',
        hint: 'Qual palavra nao vem de GATO?'
      },
    ],
    4: [
      { 
        family: 'AGUA', 
        words: ['AQUATICO', 'AGUACEIRO', 'AGUADO'], 
        intruder: 'CHUVA',
        hint: 'Qual palavra nao vem de AGUA?'
      },
      { 
        family: 'PEDRA', 
        words: ['PEDREIRA', 'PEDRINHA', 'EMPEDRAR'], 
        intruder: 'MONTANHA',
        hint: 'Qual palavra nao vem de PEDRA?'
      },
      { 
        family: 'FOGO', 
        words: ['FOGUEIRA', 'FOGAREU', 'FOGUETE'], 
        intruder: 'INCENDIO',
        hint: 'Qual palavra nao vem de FOGO?'
      },
    ],
    5: [
      { 
        family: 'AMOR', 
        words: ['AMOROSO', 'AMADO', 'AMANTE'], 
        intruder: 'CARINHO',
        hint: 'Qual palavra nao vem de AMOR?'
      },
      { 
        family: 'PAZ', 
        words: ['PACIFICO', 'APAZIGUAR'], 
        intruder: 'PASSEAR',
        hint: 'Qual palavra nao vem de PAZ?'
      },
      { 
        family: 'BELEZA', 
        words: ['BELO', 'EMBELEZAR', 'BELISSIMO'], 
        intruder: 'FORMOSURA',
        hint: 'Qual palavra nao vem de BELEZA?'
      },
    ],
  };

  return levelData[level] || levelData[1];
};

export default function IntrusoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ level: string }>();
  const level = parseInt(params.level || "1");
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);

  const wordsData = getIntrusoData(level);
  const currentWord = wordsData[currentIndex];
  const isLastWord = currentIndex === wordsData.length - 1;

  useEffect(() => {
    if (!completed) return;
    const totalQuestions = wordsData.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const errors = totalQuestions - score;
    saveExerciseResult(level, `intruso-${level}`, starsFromPercentage(percentage), errors);
  }, [completed]);

  // Animacoes
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const feedbackScale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withTiming(1, { duration: 500 });
    
    // Embaralha as palavras
    const allWords = [...currentWord.words, currentWord.intruder];
    for (let i = allWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
    }
    setShuffledWords(allWords);
    setSelectedWord(null);
    setShowFeedback(false);
    setShowHint(false);
  }, [currentIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const feedbackStyle = useAnimatedStyle(() => ({
    transform: [{ scale: feedbackScale.value }],
  }));

  const handleWordPress = (word: string) => {
    if (showFeedback) return;
    
    setSelectedWord(word);
    setShowFeedback(true);
    feedbackScale.value = withSequence(
      withSpring(0.8),
      withSpring(1)
    );

    const isIntruder = word === currentWord.intruder;
    if (isIntruder) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedWord(null);
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
    setSelectedWord(null);
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
    const totalQuestions = wordsData.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </Pressable>
          <View style={styles.headerInfo}>
            <Text style={styles.levelBadge}>Concluido!</Text>
            <Text style={styles.levelTitle}>O Intruso</Text>
          </View>
        </View>
        
        <View style={styles.completionCard}>
          <Text style={styles.completionEmoji}>✓</Text>
          <Text style={styles.completionTitle}>Parabens!</Text>
          <Text style={styles.completionText}>Voce encontrou todos os intrusos!</Text>
          
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
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
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
          <Text style={styles.progressText}>{currentIndex + 1} de {wordsData.length}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentIndex + 1) / wordsData.length) * 100}%` }]} />
        </View>
      </View>

      <Animated.View style={[styles.card, animatedStyle]}>
        {/* Familia */}
        <View style={styles.familyContainer}>
          <Text style={styles.familyLabel}>Familia das palavras:</Text>
          <Text style={styles.familyWord}>{currentWord.family}</Text>
        </View>

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

        {/* Instrucao */}
        <Text style={styles.instruction}>
          Encontre a palavra que NAO pertence a familia:
        </Text>

        {/* Palavras */}
        <View style={styles.wordsContainer}>
          {shuffledWords.map((word, index) => {
            const isIntruder = word === currentWord.intruder;
            const isSelected = word === selectedWord;
            let buttonStyle = styles.wordButton;
            
            if (showFeedback) {
              if (isIntruder) {
                buttonStyle = styles.wordButtonIntruder;
              } else if (isSelected && !isIntruder) {
                buttonStyle = styles.wordButtonWrong;
              } else {
                buttonStyle = styles.wordButtonDisabled;
              }
            }

            return (
              <TouchableOpacity 
                key={index} 
                style={buttonStyle} 
                onPress={() => handleWordPress(word)} 
                disabled={showFeedback}
              >
                <Text style={styles.wordText}>{word}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {showFeedback && (
          <Animated.View style={[styles.feedbackContainer, feedbackStyle]}>
            {selectedWord === currentWord.intruder ? (
              <View style={styles.feedbackCorrect}>
                <Text style={styles.feedbackEmoji}>✓</Text>
                <Text style={styles.feedbackTitle}>Acertou!</Text>
                <Text style={styles.feedbackText}>
                  "{currentWord.intruder}" nao pertence a familia {currentWord.family}
                </Text>
                <Text style={styles.feedbackFamily}>
                  Palavras da familia: {currentWord.words.join(', ')}
                </Text>
              </View>
            ) : (
              <View style={styles.feedbackWrong}>
                <Text style={styles.feedbackEmoji}>✗</Text>
                <Text style={styles.feedbackTitle}>Tente novamente!</Text>
                <Text style={styles.feedbackText}>
                  O intruso e "{currentWord.intruder}"
                </Text>
                <Text style={styles.feedbackFamily}>
                  Palavras da familia: {currentWord.words.join(', ')}
                </Text>
              </View>
            )}
          </Animated.View>
        )}

        {/* Botao Proximo */}
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