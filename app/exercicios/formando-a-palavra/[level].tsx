import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, TouchableOpacity, ScrollView, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useState, useEffect } from "react";
import { styles } from "../../../styles/formandoPalavra";
import { saveExerciseResult, starsFromPercentage } from '../../../utils/progress';

// ===== DADOS POR NÍVEL (3 PALAVRAS CADA) =====
const WORDS_DATA: Record<number, {
  word: string;
  syllables: string[];
  hint: string;
  image: any;
}[]> = {
  1: [
    { 
      word: 'DENTE', 
      syllables: ['DEN', 'TE'], 
      hint: 'Parte da boca',
      image: require('../../../assets/images/formando-a-palavra/nivel-1/dente.png')
    },
    { 
      word: 'SOL', 
      syllables: ['SOL'], 
      hint: 'Estrela que ilumina o dia',
      image: require('../../../assets/images/formando-a-palavra/nivel-1/sol.png')
    },
    { 
      word: 'DOIS', 
      syllables: ['DO', 'IS'], 
      hint: '1+1=?',
      image: require('../../../assets/images/formando-a-palavra/nivel-1/dois.png')
    },
  ],
  2: [
    { 
      word: 'CACHORRO', 
      syllables: ['CA', 'CHOR', 'RO'], 
      hint: 'Animal domestico que late',
      image: require('../../../assets/images/formando-a-palavra/nivel-2/cachorro.png')
    },
    { 
      word: 'ESCOLA', 
      syllables: ['ES', 'CO', 'LA'], 
      hint: 'Instituição de aprendizagem',
      image: require('../../../assets/images/formando-a-palavra/nivel-2/escola.png')
    },
    { 
      word: 'BILHETE', 
      syllables: ['BI', 'LHE', 'TE'], 
      hint: 'Similar de carta',
      image: require('../../../assets/images/formando-a-palavra/nivel-2/bilhete.png')
    },
  ],
  3: [
    { 
      word: 'BORBOLETA', 
      syllables: ['BOR', 'BO', 'LE', 'TA'], 
      hint: 'Inseto colorido que voa',
      image: require('../../../assets/images/formando-a-palavra/nivel-3/borboleta.png')
    },
    { 
      word: 'MORANGO', 
      syllables: ['MO', 'RAN', 'GO'], 
      hint: 'Fruta vermelha e doce',
      image: require('../../../assets/images/formando-a-palavra/nivel-3/morango.png')
    },
    { 
      word: 'CAMISA', 
      syllables: ['CA', 'MI', 'SA'], 
      hint: 'Peça de roupa',
      image: require('../../../assets/images/formando-a-palavra/nivel-3/camisa.png')
    },
  ],
  4: [
    { 
      word: 'MACHUCADO', 
      syllables: ['MA', 'CHU', 'CA', 'DO'], 
      hint: 'Lesão corporal',
      image: null
    },
    { 
      word: 'BICICLETA', 
      syllables: ['BI', 'CI', 'CLE', 'TA'], 
      hint: 'Meio de transporte de duas rodas',
      image: require('../../../assets/images/formando-a-palavra/nivel-4/bicicleta.png')
    },
    { 
      word: 'CHOCOLATE', 
      syllables: ['CHO', 'CO', 'LA', 'TE'], 
      hint: 'Doce feito de cacau',
      image: require('../../../assets/images/formando-a-palavra/nivel-4/chocolate.png')
    },
  ],
  5: [
    { 
      word: 'MACARRAO', 
      syllables: ['MA', 'CAR', 'RAO'], 
      hint: 'Comida italiana',
      image: null
    },
    { 
      word: 'DINOSSAURO', 
      syllables: ['DI', 'NOS', 'SAU', 'RO'], 
      hint: 'Animal pré-histórico',
      image: null
    },
    { 
      word: 'AEROPORTO', 
      syllables: ['A', 'E', 'RO', 'POR', 'TO'], 
      hint: 'Area onde aviões pousam e decolam',
      image: require('../../../assets/images/formando-a-palavra/nivel-5/aeroporto.png')
    },
  ],
};

function shuffleSyllables(list: string[]): string[] {
  const shuffled = [...list];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FormandoPalavraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ level: string; exerciseId: string }>();
  const level = parseInt(params.level || "1");
  const exerciseId = params.exerciseId || `formando-a-palavra-${level}`;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [syllables, setSyllables] = useState<string[]>([]);
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [saving, setSaving] = useState(false);

  const words = WORDS_DATA[level] || WORDS_DATA[1];
  const currentWord = words[currentIndex];
  const isLastWord = currentIndex === words.length - 1;

  // Animações
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const feedbackScale = useSharedValue(0);

  // Inicializa e embaralha as sílabas UMA ÚNICA VEZ por palavra
  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withTiming(1, { duration: 500 });
    setSyllables(shuffleSyllables(currentWord.syllables));
    setSelectedSyllables([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setIsWrong(false);
    setShowHint(false);
    setShowImage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, level]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const feedbackStyle = useAnimatedStyle(() => ({
    transform: [{ scale: feedbackScale.value }],
  }));

  // ===== SALVAR PROGRESSO =====
  useEffect(() => {
    if (!completed) return;
    const totalQuestions = words.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const stars = starsFromPercentage(percentage);
    void saveExerciseResult(level, exerciseId, stars, errors);
  }, [completed, errors, exerciseId, level, score, words.length]);

  const handleSyllablePress = (syllable: string, index: number) => {
    if (showFeedback || completed || saving) return;

    const newSyllables = [...syllables];
    newSyllables.splice(index, 1);
    setSyllables(newSyllables);

    const newSelected = [...selectedSyllables, syllable];
    setSelectedSyllables(newSelected);

    if (newSelected.length === currentWord.syllables.length) {
      const formedWord = newSelected.join('');
      if (formedWord === currentWord.word) {
        setIsCorrect(true);
        setShowFeedback(true);
        setScore((prev) => prev + 1);
        feedbackScale.value = withSequence(withSpring(1.2), withSpring(1));
      } else {
        setIsWrong(true);
        setShowFeedback(true);
        setErrors((prev) => prev + 1);
        feedbackScale.value = withSequence(withSpring(0.8), withSpring(1));
      }
    }
  };

  const handleRemoveSyllable = (index: number) => {
    if (showFeedback || completed || saving) return;

    const newSelected = [...selectedSyllables];
    const removed = newSelected.splice(index, 1);
    setSelectedSyllables(newSelected);

    const newSyllables = [...syllables, removed[0]];
    setSyllables(newSyllables);
  };

  const handleRetryCurrentWord = () => {
    setSyllables(shuffleSyllables(currentWord.syllables));
    setSelectedSyllables([]);
    setShowFeedback(false);
    setIsWrong(false);
  };

  const handleNext = () => {
    if (isLastWord) {
      setCompleted(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const resetExercise = () => {
    setCurrentIndex(0);
    setScore(0);
    setErrors(0);
    setCompleted(false);
    setSaving(false);
    setSyllables(shuffleSyllables((WORDS_DATA[level] || WORDS_DATA[1])[0].syllables));
    setSelectedSyllables([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setIsWrong(false);
    setShowHint(false);
    setShowImage(false);
  };

  // ===== TELA DE CONCLUSÃO =====
  if (completed) {
    const totalQuestions = words.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const stars = starsFromPercentage(percentage);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </Pressable>
          <View style={styles.headerInfo}>
            <Text style={styles.levelBadge}>Concluído!</Text>
            <Text style={styles.levelTitle}>Formando a Palavra</Text>
          </View>
        </View>

        <View style={styles.completionCard}>
          <Text style={styles.completionEmoji}>🎉</Text>
          <Text style={styles.completionTitle}>Parabéns!</Text>
          <Text style={styles.completionText}>Você completou o exercício!</Text>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreTotal}>/{totalQuestions}</Text>
            <Text style={styles.scoreLabel}>acertos</Text>
          </View>

          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>{percentage}%</Text>
            <Text style={styles.starsEarned}>
              {'⭐'.repeat(stars)}
            </Text>
            <Text style={{ color: '#F5B55A', fontSize: 15, fontWeight: '700', marginBottom: 6 }}>
              {stars === 4 ? 'Excelente! 4 de 4 estrelas ⭐' : `${stars} de 4 estrelas conquistadas`}
            </Text>
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

  // ===== TELA DO EXERCÍCIO =====
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
        <View style={styles.headerInfo}>
          <Text style={styles.levelBadge}>Nível {level}</Text>
          <Text style={styles.levelTitle}>Formando a Palavra</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progresso</Text>
          <Text style={styles.progressText}>{currentIndex + 1} de {words.length}</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, errors > 0 && styles.errorTextWarning]}>
            {errors > 0 ? `❌ Erros: ${errors}` : `🎯 Acertos: ${score}/${words.length}`}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentIndex + 1) / words.length) * 100}%` }]} />
        </View>
      </View>

      <Animated.View style={[styles.card, animatedStyle]}>
        {/* ===== BOTÃO PARA MOSTRAR IMAGEM ===== */}
        {!!currentWord.image && (
          <TouchableOpacity 
            style={styles.imageButton}
            onPress={() => setShowImage(!showImage)}
          >
            <Text style={styles.imageButtonText}>
              {showImage ? 'Ocultar imagem' : '🖼️ Ver imagem'}
            </Text>
          </TouchableOpacity>
        )}

        {/* ===== IMAGEM ===== */}
        {showImage && currentWord.image && (
          <View style={styles.imageContainer}>
            <Image 
              source={currentWord.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}

        <View style={styles.wordContainer}>
          <Text style={styles.wordLabel}>Forme a palavra:</Text>
          <View style={styles.wordSlots}>
            {currentWord.syllables.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.wordSlot,
                  selectedSyllables[index] && styles.wordSlotFilled,
                  isCorrect && styles.wordSlotCorrect,
                  isWrong && styles.wordSlotWrong,
                ]}
              >
                <Text style={[
                  styles.wordSlotText,
                  selectedSyllables[index] && styles.wordSlotTextFilled,
                  isCorrect && styles.wordSlotTextCorrect,
                  isWrong && styles.wordSlotTextWrong,
                ]}>
                  {selectedSyllables[index] || '?'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable style={styles.hintButton} onPress={() => setShowHint(!showHint)}>
          <Text style={styles.hintButtonText}>
            {showHint ? 'Ocultar dica' : 'Ver dica'}
          </Text>
        </Pressable>

        {showHint && (
          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>💡 {currentWord.hint}</Text>
          </View>
        )}

        <View style={styles.syllablesContainer}>
          <Text style={styles.syllablesLabel}>Sílabas disponíveis:</Text>
          <View style={styles.syllablesGrid}>
            {syllables.map((syllable, index) => (
              <TouchableOpacity
                key={`${syllable}-${index}`}
                style={styles.syllableButton}
                onPress={() => handleSyllablePress(syllable, index)}
                disabled={showFeedback || saving}
              >
                <Text style={styles.syllableText}>{syllable}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedSyllables.length > 0 && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedLabel}>Clique na sílaba para remover:</Text>
            <View style={styles.selectedGrid}>
              {selectedSyllables.map((syllable, index) => (
                <TouchableOpacity
                  key={`selected-${index}`}
                  style={styles.selectedSyllable}
                  onPress={() => handleRemoveSyllable(index)}
                  disabled={showFeedback || saving}
                >
                  <Text style={styles.selectedSyllableText}>{syllable}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {isCorrect && showFeedback && (
          <Animated.View style={[styles.feedbackContainer, feedbackStyle]}>
            <View style={styles.feedbackCorrect}>
              <Text style={styles.feedbackEmoji}>✅</Text>
              <Text style={styles.feedbackTitle}>Palavra formada com sucesso!</Text>
              <Text style={styles.feedbackText}>
                Palavra: {currentWord.word}
              </Text>
              {!isLastWord && (
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                  <Text style={styles.nextButtonText}>Próxima →</Text>
                </TouchableOpacity>
              )}
              {isLastWord && (
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                  <Text style={styles.nextButtonText}>Ver resultados</Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        )}

        {isWrong && showFeedback && (
          <Animated.View style={[styles.feedbackContainer, feedbackStyle]}>
            <View style={styles.feedbackWrong}>
              <Text style={styles.feedbackEmoji}>❌</Text>
              <Text style={styles.feedbackTitle}>Quase lá!</Text>
              <Text style={styles.feedbackText}>
                A palavra correta é: {currentWord.word}
              </Text>
              <Text style={{ color: '#E480BB', fontSize: 13, marginTop: 4, textAlign: 'center' }}>
                Ordem das sílabas: {currentWord.syllables.join(' - ')}
              </Text>
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
                <TouchableOpacity
                  style={[styles.nextButton, { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.15)', borderColor: 'rgba(255, 255, 255, 0.3)' }]}
                  onPress={handleRetryCurrentWord}
                >
                  <Text style={[styles.nextButtonText, { color: '#FFFFFF' }]}>Tentar de novo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.nextButton, { flex: 1 }]}
                  onPress={handleNext}
                >
                  <Text style={styles.nextButtonText}>{isLastWord ? 'Ver resultados' : 'Próxima →'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    </ScrollView>
  );
}