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

// ===== DADOS POR NÍVEL =====
const getConstrutorData = (level: number) => {
  const levelData: Record<number, Array<{
    radical: string;
    prefixes: string[];
    suffixes: string[];
    correctWords: string[];
    hint: string;
    emoji: string;
  }>> = {
    1: [
      { 
        radical: 'FLOR', 
        prefixes: [], 
        suffixes: ['AL', 'IDO', 'EIRA'],
        correctWords: ['FLORAL', 'FLORIDO', 'FLOREIRA'],
        hint: 'Adicione sufixos a FLOR',
        emoji: '🌸'
      },
      { 
        radical: 'TERRA', 
        prefixes: [], 
        suffixes: ['ENO', 'ESTRE', 'R'],
        correctWords: ['TERRENO', 'TERRESTRE', 'ENTERRAR'],
        hint: 'Adicione sufixos a TERRA',
        emoji: '🌍'
      },
    ],
    2: [
      { 
        radical: 'SOL', 
        prefixes: [], 
        suffixes: ['AR', 'EIRA', 'ADO'],
        correctWords: ['SOLAR', 'SOLEIRA', 'ENSOLADO'],
        hint: 'Adicione sufixos a SOL',
        emoji: '☀️'
      },
      { 
        radical: 'MAR', 
        prefixes: [], 
        suffixes: ['INHO', 'É', 'ÍTIMO'],
        correctWords: ['MARINHO', 'MARÉ', 'MARÍTIMO'],
        hint: 'Adicione sufixos a MAR',
        emoji: '🌊'
      },
    ],
    3: [
      { 
        radical: 'FELIZ', 
        prefixes: ['IN'], 
        suffixes: ['ARDO', 'MENTE', 'IDADE'],
        correctWords: ['FELIZARDO', 'FELIZMENTE', 'INFELIZ', 'FELICIDADE'],
        hint: 'Combine FELIZ com prefixos e sufixos',
        emoji: '😊'
      },
      { 
        radical: 'MENINA', 
        prefixes: [], 
        suffixes: ['NO', 'NICE', 'INHA', 'O'],
        correctWords: ['MENINO', 'MENINICE', 'MENININHA', 'MENINÃO'],
        hint: 'Adicione sufixos a MENINA',
        emoji: '👧'
      },
    ],
    4: [
      { 
        radical: 'LUZ', 
        prefixes: ['A', 'I'], 
        suffixes: ['OSO', 'AR', 'MINOSA'],
        correctWords: ['LUMINOSO', 'ILUMINAR', 'LUMINOSA'],
        hint: 'Transforme LUZ em palavras diferentes',
        emoji: '💡'
      },
      { 
        radical: 'PEDRA', 
        prefixes: ['EM'], 
        suffixes: ['EIRA', 'INHA', 'R'],
        correctWords: ['PEDREIRA', 'PEDRINHA', 'EMPEDRAR'],
        hint: 'Adicione sufixos a PEDRA',
        emoji: '🪨'
      },
    ],
    5: [
      { 
        radical: 'AMOR', 
        prefixes: ['DE'], 
        suffixes: ['OSO', 'ADO', 'ANTE'],
        correctWords: ['AMOROSO', 'AMADO', 'AMANTE', 'DESAMOR'],
        hint: 'Crie palavras a partir de AMOR',
        emoji: '❤️'
      },
      { 
        radical: 'PAZ', 
        prefixes: ['A'], 
        suffixes: ['ÍFICO', 'EAR', 'IGUAR'],
        correctWords: ['PACÍFICO', 'PASSEAR', 'APAZIGUAR'],
        hint: 'Transforme PAZ em palavras diferentes',
        emoji: '🕊️'
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
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [availableParts, setAvailableParts] = useState<string[]>([]);
  const [builtWords, setBuiltWords] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const wordsData = getConstrutorData(level);
  const currentWord = wordsData[currentIndex];
  const isLastWord = currentIndex === wordsData.length - 1;

  // Animações
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const feedbackScale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withTiming(1, { duration: 500 });
    
    // Inicializa as partes disponíveis
    const parts = [...currentWord.prefixes, ...currentWord.suffixes];
    for (let i = parts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [parts[i], parts[j]] = [parts[j], parts[i]];
    }
    setAvailableParts(parts);
    setSelectedParts([]);
    setBuiltWords([]);
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

  const handlePartPress = (part: string) => {
    if (showFeedback) return;
    
    const newSelected = [...selectedParts, part];
    setSelectedParts(newSelected);
    
    const newAvailable = availableParts.filter(p => p !== part);
    setAvailableParts(newAvailable);

    // Verifica se combinou todas as partes
    if (newSelected.length === currentWord.prefixes.length + currentWord.suffixes.length) {
      // Simula combinação para verificar
      const combined = currentWord.radical + newSelected.join('');
      const isValid = currentWord.correctWords.some(w => w === combined);
      
      setShowFeedback(true);
      feedbackScale.value = withSequence(
        withSpring(0.8),
        withSpring(1)
      );

      if (isValid) {
        setScore(score + 1);
        setBuiltWords([...builtWords, combined]);
      }
    }
  };

  const handleRemovePart = (index: number) => {
    if (showFeedback) return;
    
    const removed = selectedParts[index];
    const newSelected = selectedParts.filter((_, i) => i !== index);
    setSelectedParts(newSelected);
    setAvailableParts([...availableParts, removed]);
  };

  const handleNext = () => {
    setSelectedParts([]);
    setAvailableParts([...currentWord.prefixes, ...currentWord.suffixes]);
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
    setSelectedParts([]);
    setBuiltWords([]);
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

  const getDisplayWord = () => {
    let word = currentWord.radical;
    selectedParts.forEach(part => {
      word += part;
    });
    return word;
  };

  if (completed) {
    const totalQuestions = wordsData.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </Pressable>
          <View style={styles.headerInfo}>
            <Text style={styles.levelBadge}>Concluído!</Text>
            <Text style={styles.levelTitle}>Construtor de Palavras</Text>
          </View>
        </View>
        
        <View style={styles.completionCard}>
          <Text style={styles.completionEmoji}>✅</Text>
          <Text style={styles.completionTitle}>Parabéns!</Text>
          <Text style={styles.completionText}>Você construiu todas as palavras!</Text>
          
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

  // Verifica se já construiu todas as palavras
  const hasCompletedWord = selectedParts.length === currentWord.prefixes.length + currentWord.suffixes.length;

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
          <Text style={styles.progressText}>{currentIndex + 1} de {wordsData.length}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentIndex + 1) / wordsData.length) * 100}%` }]} />
        </View>
      </View>

      <Animated.View style={[styles.card, animatedStyle]}>
        {/* Radical */}
        <View style={styles.radicalContainer}>
          <Text style={styles.radicalLabel}>Radical:</Text>
          <Text style={styles.radicalWord}>{currentWord.radical}</Text>
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
            <Text style={styles.hintExample}>
              Exemplo: {currentWord.radical} + {currentWord.suffixes[0]} = {currentWord.radical}{currentWord.suffixes[0]}
            </Text>
          </View>
        )}

        {/* Palavra em construção */}
        <View style={styles.builderContainer}>
          <Text style={styles.builderLabel}>Palavra em construção:</Text>
          <View style={styles.builderWord}>
            <Text style={styles.builderRadical}>{currentWord.radical}</Text>
            {selectedParts.map((part, index) => (
              <TouchableOpacity
                key={index}
                style={styles.builderPart}
                onPress={() => handleRemovePart(index)}
              >
                <Text style={styles.builderPartText}>{part}</Text>
              </TouchableOpacity>
            ))}
            {selectedParts.length === 0 && (
              <Text style={styles.builderPlaceholder}>___</Text>
            )}
          </View>
          <Text style={styles.builderTip}>
            Clique na parte para removê-la
          </Text>
        </View>

        {/* Partes disponíveis */}
        <View style={styles.partsContainer}>
          <Text style={styles.partsLabel}>
            Peças disponíveis ({availableParts.length}):
          </Text>
          <View style={styles.partsGrid}>
            {availableParts.map((part, index) => (
              <TouchableOpacity
                key={index}
                style={styles.partButton}
                onPress={() => handlePartPress(part)}
              >
                <Text style={styles.partText}>{part}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Feedback */}
        {showFeedback && (
          <Animated.View style={[styles.feedbackContainer, feedbackStyle]}>
            {hasCompletedWord && selectedParts.length > 0 && (
              <View style={styles.feedbackCorrect}>
                <Text style={styles.feedbackEmoji}>✅</Text>
                <Text style={styles.feedbackTitle}>Palavra construída!</Text>
                <Text style={styles.feedbackText}>
                  Você formou: {currentWord.radical}{selectedParts.join('')}
                </Text>
                <Text style={styles.feedbackFamily}>
                  Palavras possíveis: {currentWord.correctWords.join(', ')}
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