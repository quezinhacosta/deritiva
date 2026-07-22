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
import { styles } from "../../../styles/formandoPalavra";
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@deritiva_progress';

// ===== DADOS POR NÍVEL (3 PALAVRAS CADA) =====
const getWordsByLevel = (level: number) => {
  const levelData: Record<number, Array<{
    word: string;
    syllables: string[];
    hint: string;
  }>> = {
    1: [
      { word: 'GATO', syllables: ['GA', 'TO'], hint: 'Animal que mia' },
      { word: 'SOL', syllables: ['SOL'], hint: 'Estrela que ilumina o dia' },
      { word: 'MESA', syllables: ['ME', 'SA'], hint: 'Móvel usado para refeições' },
    ],
    2: [
      { word: 'CACHORRO', syllables: ['CA', 'CHO', 'RRO'], hint: 'Animal que late' },
      { word: 'BOLA', syllables: ['BO', 'LA'], hint: 'Objeto redondo usado em jogos' },
      { word: 'FELIZ', syllables: ['FE', 'LIZ'], hint: 'Sentimento de alegria' },
    ],
    3: [
      { word: 'BORBOLETA', syllables: ['BOR', 'BO', 'LE', 'TA'], hint: 'Inseto colorido que voa' },
      { word: 'MORANGO', syllables: ['MO', 'RAN', 'GO'], hint: 'Fruta vermelha e doce' },
      { word: 'CAMISA', syllables: ['CA', 'MI', 'SA'], hint: 'Peça de roupa' },
    ],
    4: [
      { word: 'ELEFANTE', syllables: ['E', 'LE', 'FAN', 'TE'], hint: 'Animal grande com tromba' },
      { word: 'BICICLETA', syllables: ['BI', 'CI', 'CLE', 'TA'], hint: 'Meio de transporte de duas rodas' },
      { word: 'CHOCOLATE', syllables: ['CHO', 'CO', 'LA', 'TE'], hint: 'Doce feito de cacau' },
    ],
    5: [
      { word: 'MACARRAO', syllables: ['MA', 'CAR', 'RAO'], hint: 'Comida italiana' },
      { word: 'DINOSSAURO', syllables: ['DI', 'NOS', 'SAU', 'RO'], hint: 'Animal pré-histórico' },
      { word: 'CONTINENTE', syllables: ['CON', 'TI', 'NEN', 'TE'], hint: 'Grande porção de terra' },
    ],
  };

  return levelData[level] || levelData[1];
};

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
  const [failed, setFailed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [saving, setSaving] = useState(false);

  const words = getWordsByLevel(level);
  const currentWord = words[currentIndex];
  const isLastWord = currentIndex === words.length - 1;
  const MAX_ERRORS = 1;

  // Animações
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const feedbackScale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withTiming(1, { duration: 500 });
    resetWord();
  }, [currentIndex, level]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const feedbackStyle = useAnimatedStyle(() => ({
    transform: [{ scale: feedbackScale.value }],
  }));

  const resetWord = () => {
    const shuffled = [...currentWord.syllables];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setSyllables(shuffled);
    setSelectedSyllables([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setIsWrong(false);
    setShowHint(false);
  };

  // ===== SALVAR PROGRESSO =====
  const saveProgress = async (stars: number) => {
    if (saving) return;
    setSaving(true);

    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      let progress = saved ? JSON.parse(saved) : [];

      let levelIndex = progress.findIndex((l: any) => l.id === level);
      if (levelIndex === -1) {
        progress.push({ id: level, unlocked: level === 1, exercises: [] });
        levelIndex = progress.length - 1;
      }

      const exerciseIndex = progress[levelIndex].exercises.findIndex(
        (e: any) => e.id === exerciseId
      );

      const exerciseData = {
        id: exerciseId,
        completed: true,
        stars: stars,
        errors: errors
      };

      if (exerciseIndex === -1) {
        progress[levelIndex].exercises.push(exerciseData);
      } else {
        progress[levelIndex].exercises[exerciseIndex] = exerciseData;
      }

      const levelExercises = progress[levelIndex].exercises;
      const allCompleted = levelExercises.every((e: any) => e.completed === true);

      if (allCompleted && levelExercises.length === 4) {
        const nextLevel = progress.find((l: any) => l.id === level + 1);
        if (nextLevel) {
          nextLevel.unlocked = true;
        }
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      router.replace('/exercicio1');

    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
      setSaving(false);
    }
  };

  const handleSyllablePress = (syllable: string, index: number) => {
    if (showFeedback || completed || failed || saving) return;

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
        setScore(score + 1);
        feedbackScale.value = withSequence(withSpring(1.2), withSpring(1));

        if (isLastWord) {
          const totalQuestions = words.length;
          const percentage = Math.round((score + 1) / totalQuestions * 100);
          let stars = 3;
          if (percentage < 70) stars = 1;
          else if (percentage < 100) stars = 2;
          saveProgress(stars);
        }
      } else {
        setIsWrong(true);
        setShowFeedback(true);
        const newErrors = errors + 1;
        setErrors(newErrors);

        if (newErrors >= MAX_ERRORS + 1) {
          setFailed(true);
        } else {
          setTimeout(resetWord, 1500);
        }
      }
    }
  };

  const handleRemoveSyllable = (index: number) => {
    if (showFeedback || completed || failed || saving) return;

    const newSelected = [...selectedSyllables];
    const removed = newSelected.splice(index, 1);
    setSelectedSyllables(newSelected);

    const newSyllables = [...syllables, removed[0]];
    setSyllables(newSyllables);
  };

  const handleNext = () => {
    resetWord();

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
    setFailed(false);
    setSaving(false);
    resetWord();
  };

  // ===== TELA DE FALHA =====
  if (failed) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </Pressable>
        </View>
        <View style={styles.failCard}>
          <Text style={styles.failEmoji}>😅</Text>
          <Text style={styles.failTitle}>Ops! Você errou!</Text>
          <Text style={styles.failText}>
            Você errou {errors} vezes. O limite é {MAX_ERRORS} erro.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={resetExercise}>
            <Text style={styles.retryButtonText}>🔄 Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ===== TELA DE CONCLUSÃO =====
  if (completed) {
    const totalQuestions = words.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    let stars = 3;
    if (percentage < 70) stars = 1;
    else if (percentage < 100) stars = 2;

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
              {Array(stars).fill('⭐').join('')}
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
            ❌ Erros: {errors}/{MAX_ERRORS + 1}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentIndex + 1) / words.length) * 100}%` }]} />
        </View>
      </View>

      <Animated.View style={[styles.card, animatedStyle]}>
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
          <View style={styles.feedbackWrong}>
            <Text style={styles.feedbackEmoji}>❌</Text>
            <Text style={styles.feedbackTitle}>Tente novamente!</Text>
            <Text style={styles.feedbackText}>
              A ordem das sílabas não está correta.
            </Text>
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}