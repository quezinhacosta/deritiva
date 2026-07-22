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
import { styles } from "../../../styles/construtor";
import { saveExerciseResult, starsFromPercentage } from "../../../utils/progress";

// ===== DADOS POR NIVEL =====
const getConstrutorData = (level: number) => {
  const levelData: Record<number, Array<{
    word: string;
    missingPart: string;
    options: string[];
    hint: string;
  }>> = {
    1: [
      { 
        word: 'FLORAL',
        missingPart: 'AL',
        options: ['AL', 'EL', 'UL'],
        hint: 'Qual sufixo completa FLOR?'
      },
      { 
        word: 'TERRENO',
        missingPart: 'NO',
        options: ['NO', 'NI', 'NE'],
        hint: 'Qual sufixo completa "TERRE" corretamente?'
      },
      { 
        word: 'SOLAR',
        missingPart: 'AR',
        options: ['AR', 'OR', 'IR'],
        hint: 'Qual sufixo completa SOL?'
      },
    ],
    2: [
      { 
        word: 'MARINHO',
        missingPart: 'INHO',
        options: ['INHO', 'ENHO', 'ONHO'],
        hint: 'Qual sufixo completa MAR?'
      },
      { 
        word: 'MARE',
        missingPart: 'E',
        options: ['E', 'A', 'O'],
        hint: 'Qual sufixo completa MAR?'
      },
      { 
        word: 'FELIZARDO',
        missingPart: 'ARDO',
        options: ['ARDO', 'ERDO', 'ORDO'],
        hint: 'Qual sufixo completa FELIZ?'
      },
    ],
    3: [
      { 
        word: 'MENININHA',
        missingPart: 'INHA',
        options: ['INHA', 'INHU', 'ONHA'],
        hint: 'Qual sufixo completa MENINA?'
      },
      { 
        word: 'CASA',
        missingPart: 'SA',
        options: ['SA', 'ZA', 'SSA'],
        hint: 'Qual silaba completa CASA?'
      },
      { 
        word: 'GATINHO',
        missingPart: 'INHO',
        options: ['INHO', 'ENHO', 'ONHO'],
        hint: 'Qual sufixo completa GATO?'
      },
    ],
    4: [
      { 
        word: 'LUMINOSO',
        missingPart: 'OSO',
        options: ['OSO', 'ESE', 'ISO'],
        hint: 'Qual sufixo completa LUMIN...?'
      },
      { 
        word: 'PEDREIRA',
        missingPart: 'EIRA',
        options: ['EIRA', 'AIRA', 'OIRA'],
        hint: 'Qual sufixo completa PEDRA?'
      },
      { 
        word: 'FOGUEIRA',
        missingPart: 'EIRA',
        options: ['EIRA', 'AIRA', 'OIRA'],
        hint: 'Qual sufixo completa FOGO?'
      },
    ],
    5: [
      { 
        word: 'AMOROSO',
        missingPart: 'OSO',
        options: ['OSO', 'ISA', 'USU'],
        hint: 'Qual sufixo completa AMOR?'
      },
      { 
        word: 'PACIFICO',
        missingPart: 'IFICO',
        options: ['IFICO', 'EFICO', 'AFICO'],
        hint: 'Qual sufixo completa PAZ?'
      },
      { 
        word: 'BELEZA',
        missingPart: 'EZA',
        options: ['EZA', 'IZA', 'OZA'],
        hint: 'Qual sufixo completa BELO?'
      },
    ],
  };

  return levelData[level] || levelData[1];
};

export default function ConstrutorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ level: string }>();
  const level = parseInt(params.level || "1");
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const wordsData = getConstrutorData(level);
  const currentWord = wordsData[currentIndex];
  const isLastWord = currentIndex === wordsData.length - 1;

  useEffect(() => {
    if (!completed) return;
    const totalQuestions = wordsData.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const errors = totalQuestions - score;
    saveExerciseResult(level, `construtor-${level}`, starsFromPercentage(percentage), errors);
  }, [completed]);

  // Animacoes
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const feedbackScale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withTiming(1, { duration: 500 });
    
    // Embaralha as opcoes
    const options = [...currentWord.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
    setSelectedOption(null);
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

  const handleOptionPress = (option: string) => {
    if (showFeedback) return;
    
    setSelectedOption(option);
    setShowFeedback(true);
    feedbackScale.value = withSequence(
      withSpring(0.8),
      withSpring(1)
    );

    const isCorrect = option === currentWord.missingPart;
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
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
    setSelectedOption(null);
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
      '4': 'Avancado',
      '5': 'Mestre',
    };
    return titles[String(level)] || 'Nivel';
  };

  // Mostra a palavra com a parte faltante
  const getDisplayWord = () => {
    const parts = currentWord.word.split(currentWord.missingPart);
    if (parts.length === 2) {
      return (
        <View style={styles.wordDisplay}>
          <Text style={styles.wordPart}>{parts[0]}</Text>
          <Text style={styles.wordMissing}>___</Text>
          <Text style={styles.wordPart}>{parts[1]}</Text>
        </View>
      );
    }
    return <Text style={styles.wordPart}>{currentWord.word}</Text>;
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
            <Text style={styles.levelTitle}>Construtor</Text>
          </View>
        </View>
        
        <View style={styles.completionCard}>
          <Text style={styles.completionEmoji}>✓</Text>
          <Text style={styles.completionTitle}>Parabens!</Text>
          <Text style={styles.completionText}>Voce completou todas as palavras!</Text>
          
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
        {/* Instrucao */}
        <Text style={styles.instruction}>
          Complete a palavra com a silaba correta:
        </Text>

        {/* Palavra com espaco faltante */}
        <View style={styles.wordContainer}>
          {getDisplayWord()}
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

        {/* Opcoes */}
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsLabel}>Escolha a silaba:</Text>
          <View style={styles.optionsGrid}>
            {shuffledOptions.map((option, index) => {
              const isSelected = option === selectedOption;
              const isCorrect = option === currentWord.missingPart;
              let buttonStyle = styles.optionButton;
              
              if (showFeedback) {
                if (isCorrect) {
                  buttonStyle = styles.optionButtonCorrect;
                } else if (isSelected && !isCorrect) {
                  buttonStyle = styles.optionButtonWrong;
                } else {
                  buttonStyle = styles.optionButtonDisabled;
                }
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={buttonStyle}
                  onPress={() => handleOptionPress(option)}
                  disabled={showFeedback}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Feedback */}
        {showFeedback && (
          <Animated.View style={[styles.feedbackContainer, feedbackStyle]}>
            {selectedOption === currentWord.missingPart ? (
              <View style={styles.feedbackCorrect}>
                <Text style={styles.feedbackEmoji}>✓</Text>
                <Text style={styles.feedbackTitle}>Acertou!</Text>
                <Text style={styles.feedbackText}>
                  A palavra completa e: {currentWord.word}
                </Text>
                <Text style={styles.feedbackFamily}>
                  "{currentWord.missingPart}" e a silaba correta!
                </Text>
              </View>
            ) : (
              <View style={styles.feedbackWrong}>
                <Text style={styles.feedbackEmoji}>✗</Text>
                <Text style={styles.feedbackTitle}>Tente novamente!</Text>
                <Text style={styles.feedbackText}>
                  A silaba correta e "{currentWord.missingPart}"
                </Text>
                <Text style={styles.feedbackFamily}>
                  Palavra completa: {currentWord.word}
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