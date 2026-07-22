import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
} from "react-native-reanimated";
import { useEffect } from "react";
import AnimatedBackground from "../../components/AnimatedBackground";
import { styles } from "../../styles/homestyles";

// Botão sem shimmer
function SimpleButton({ title, onPress }: { title: string; onPress: () => void }) {
  const scale = useSharedValue(1);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
    >
      <Animated.View style={[styles.button, { transform: [{ scale: scale.value }] }]}>
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  // Animação do título
  const titleScale = useSharedValue(1);
  const titleRotate = useSharedValue(0);

  useEffect(() => {
    titleScale.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    titleRotate.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-1, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: titleScale.value },
      { rotate: `${titleRotate.value}deg` },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* Background animado */}
      <AnimatedBackground />

      {/* Glow de fundo */}
      <View style={styles.glowContainer} />

      <View style={styles.content}>
        {/* Título animado */}
        <Animated.View style={[styles.titleContainer, titleAnimatedStyle]}>
          <Text style={styles.titleShadow}>DERITIVA</Text>
          <Text style={styles.title}>DERITIVA</Text>
          <Text style={styles.titleSub}>Aprenda Brincando</Text>
        </Animated.View>

        <SimpleButton 
          title="Iniciar Jornada" 
          onPress={() => router.push("/exercicio1" as never)}
        />
      </View>
    </View>
  );
}