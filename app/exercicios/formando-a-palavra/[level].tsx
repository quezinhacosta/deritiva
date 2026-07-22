import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useState, useEffect } from "react";
import { styles } from "../../../styles/formandoPalavra";
import { saveExerciseResult } from "../../../utils/progress";

// ===== DADOS DAS PALAVRAS POR NÍVEL =====
const wordData: Record<string, { word: string; syllables: string[]; hint: string }> = {
  '1': {
    word: 'GATO',
    syllables: ['GA', 'TO'],
    hint: 'Animal de estimação que mia',
  },
  '2': {
    word: 'CACHORRO',
    syllables: ['CA', 'CHO', 'RRO'],
    hint: 'Animal de estimação que late',
  },
  '3': {
    word: 'BORBOLETA',
    syllables: ['BOR', 'BO', 'LE', 'TA'],
    hint: 'Inseto colorido que voa',
  },
  '4': {
    word: 'ELEFANTE',
    syllables: ['E', 'LE', 'FAN', 'TE'],
    hint: 'Animal grande com tromba',
  },
  '5': {
    word: 'MORANGO',
    syllables: ['MO', 'RAN', 'GO'],
    hint: 'Fruta vermelha e doce',
  },
};

export default function FormandoPalavraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ level: string }>();
  const level = params.level || '1';
  
  const [syllables, setSyllables] = useState<string[]>([]);
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentWord = wordData[level] || wordData['1'];

  useEffect(() => {
    if (!isComplete) return;
    const stars = attempts === 0 ? 3 : attempts <= 2 ? 2 : 1;
    saveExerciseResult(parseInt(level), `formando-a-palavra-${level}`, stars, attempts);
  }, [isComplete]);

  // Animações
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const feedbackScale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  useEffect(() => {
    // Embaralhar sílabas
    const shuffled = [...currentWord.syllables];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setSyllables(shuffled);
    setSelectedSyllables([]);
    setIsCorrect(false);
    setIsWrong(false);
    setIsComplete(false);
    setAttempts(0);
  }, [level]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const feedbackStyle = useAnimatedStyle(() => ({
    transform: [{ scale: feedbackScale.value }],
  }));

  const handleSyllablePress = (syllable: string, index: number) => {
    if (isComplete) return;

    // Remove a sílaba da lista de disponíveis
    const newSyllables = [...syllables];
    newSyllables.splice(index, 1);
    setSyllables(newSyllables);

    // Adiciona à lista de selecionadas
    const newSelected = [...selectedSyllables, syllable];
    setSelectedSyllables(newSelected);

    // Verifica se completou a palavra
    if (newSelected.length === currentWord.syllables.length) {
      const formedWord = newSelected.join('');
      if (formedWord === currentWord.word) {
        setIsCorrect(true);
        setIsComplete(true);
        feedbackScale.value = withSequence(
          withSpring(1.2),
          withSpring(1)
        );
      } else {
        setIsWrong(true);
        setAttempts(attempts + 1);
        setTimeout(() => {
          // Reset
          setSyllables(currentWord.syllables);
          setSelectedSyllables([]);
          setIsWrong(false);
          
          // Embaralhar novamente
          const shuffled = [...currentWord.syllables];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          setSyllables(shuffled);
        }, 1000);
      }
    }
  };

  const handleRemoveSyllable = (index: number) => {
    if (isComplete) return;
    
    const newSelected = [...selectedSyllables];
    const removed = newSelected.splice(index, 1);
    setSelectedSyllables(newSelected);
    
    // Devolve a sílaba à lista de disponíveis
    const newSyllables = [...syllables, removed[0]];
    setSyllables(newSyllables);
  };

  const resetExercise = () => {
    const shuffled = [...currentWord.syllables];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setSyllables(shuffled);
    setSelectedSyllables([]);
    setIsCorrect(false);
    setIsWrong(false);
    setIsComplete(false);
    setAttempts(0);
  };

  const goToNextLevel = () => {
    const nextLevel = parseInt(level) + 1;
    if (nextLevel <= 5) {
      router.push(`/exercicios/formando-a-palavra/${nextLevel}`);
    } else {
      router.push('/exercicio1');
    }
  };

  const getLevelTitle = () => {
    const titles: Record<string, string> = {
      '1': 'Iniciante',
      '2': 'Aprendiz',
      '3': 'Intermediário',
      '4': 'Avançado',
      '5': 'Mestre',
    };
    return titles[level] || 'Nível';
  };

  return (
    <View style={styles.container}>
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

      <Animated.View style={[styles.content, animatedStyle]}>
        {/* Palavra a ser formada (espaços) */}
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
                ]}
              >
                <Text style={[
                  styles.wordSlotText,
                  selectedSyllables[index] && styles.wordSlotTextFilled,
                  isCorrect && styles.wordSlotTextCorrect,
                ]}>
                  {selectedSyllables[index] || '?'}
                </Text>
              </View>
            ))}
          </View>
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
            <Text style={styles.hintText}>💡 {currentWord.hint}</Text>
          </View>
        )}

        {/* Sílabas disponíveis */}
        <View style={styles.syllablesContainer}>
          <Text style={styles.syllablesLabel}>Sílabas disponíveis:</Text>
          <View style={styles.syllablesGrid}>
            {syllables.map((syllable, index) => (
              <TouchableOpacity
                key={`${syllable}-${index}`}
                style={styles.syllableButton}
                onPress={() => handleSyllablePress(syllable, index)}
              >
                <Text style={styles.syllableText}>{syllable}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sílabas selecionadas (para remover) */}
        {selectedSyllables.length > 0 && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedLabel}>Clique na sílaba para remover:</Text>
            <View style={styles.selectedGrid}>
              {selectedSyllables.map((syllable, index) => (
                <TouchableOpacity
                  key={`selected-${index}`}
                  style={styles.selectedSyllable}
                  onPress={() => handleRemoveSyllable(index)}
                >
                  <Text style={styles.selectedSyllableText}>{syllable}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Feedback */}
        {isCorrect && (
          <Animated.View style={[styles.feedbackContainer, feedbackStyle]}>
            <View style={styles.feedbackCorrect}>
              <Text style={styles.feedbackEmoji}>✅</Text>
              <Text style={styles.feedbackTitle}>Palavra formada com sucesso!</Text>
              <Text style={styles.feedbackText}>
                Você formou a palavra {currentWord.word} corretamente!
              </Text>
              <Pressable 
                style={styles.nextButton}
                onPress={goToNextLevel}
              >
                <Text style={styles.nextButtonText}>
                  {parseInt(level) < 5 ? 'Próximo nível →' : '🏆 Concluído!'}
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        )}

        {isWrong && (
          <View style={styles.feedbackWrong}>
            <Text style={styles.feedbackEmoji}>❌</Text>
            <Text style={styles.feedbackTitle}>Tente novamente!</Text>
            <Text style={styles.feedbackText}>
              A ordem das sílabas não está correta.
            </Text>
          </View>
        )}

        {/* Tentativas */}
        {attempts > 0 && !isComplete && (
          <View style={styles.attemptsContainer}>
            <Text style={styles.attemptsText}>
              Tentativas: {attempts}
            </Text>
          </View>
        )}

        {/* Botão reset */}
        {!isComplete && (
          <Pressable 
            style={styles.resetButton}
            onPress={resetExercise}
          >
            <Text style={styles.resetButtonText}>Reiniciar</Text>
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
}