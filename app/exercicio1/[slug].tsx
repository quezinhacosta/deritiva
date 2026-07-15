import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { styles } from "../../styles/exercicio1";

export default function ExerciseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ 
    slug: string; 
    level: string; 
    title: string;
    exerciseId: string;
  }>();
  
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const floatY = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withTiming(1, { duration: 500 });
    
    floatY.value = withRepeat(
      withTiming(-10, { 
        duration: 1500, 
        easing: Easing.inOut(Easing.ease) 
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  // Mapeamento de slugs para emojis
  const getExerciseEmoji = (slug: string) => {
    const emojis: Record<string, string> = {
      'silaba-faltante': '🔍',
      'formando-a-palavra': '🧩',
    };
    return emojis[slug] || '🎯';
  };

  const emoji = getExerciseEmoji(params.slug || '');

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </Pressable>

      <Animated.View style={[styles.card, animatedStyle]}>
        {/* Ícone animado */}
        <View style={styles.cardIconContainer}>
          <Animated.Text style={[styles.cardEmoji, floatStyle]}>
            {emoji}
          </Animated.Text>
        </View>

        {/* Badge do nível */}
        <View style={styles.cardHeader}>
          <View style={styles.cardBadge}>
            <Text style={styles.cardBadgeText}>Nível {params.level}</Text>
          </View>
        </View>

        {/* Título */}
        <Text style={styles.cardTitle}>
          {params.title ?? "Exercício"}
        </Text>

        {/* Divisor */}
        <View style={styles.cardDivider} />

        {/* Descrição */}
        <Text style={styles.cardSubtitle}>
          Este espaço será usado para construir o exercício {params.slug} em breve.
        </Text>

        {/* Dicas */}
        <View style={styles.cardTips}>
          <Text style={styles.cardTip}>💡 Dica: Preste atenção nas sílabas!</Text>
          <Text style={styles.cardTip}> Complete todos os níveis para desbloquear o próximo</Text>
        </View>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <Text style={styles.cardFooterText}>🚀 Prepare-se para o desafio!</Text>
        </View>
      </Animated.View>
    </View>
  );
}