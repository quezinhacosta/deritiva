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

// Botão com animação de shimmer
function ShimmerButton({ title, onPress }: { title: string; onPress: () => void }) {
  const scale = useSharedValue(1);
  const shimmerPosition = useSharedValue(-100);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Animação do shimmer (brilho passando)
    shimmerPosition.value = withRepeat(
      withSequence(
        withTiming(400, { duration: 1500, easing: Easing.linear }),
        withTiming(-100, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerPosition.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Efeito de pulso no botão
  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
    >
      <Animated.View style={[styles.button, animatedStyle, pulseStyle]}>
        {/* Efeito shimmer */}
        <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

// Componente de letra flutuante com animação
function FloatingLetter({ letter, style }: { letter: string; style: any }) {
  const translateY = useSharedValue(-20);
  const rotate = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-20, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    rotate.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-5, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.Text style={[styles.floatingLetter, style, animatedStyle]}>
      {letter}
    </Animated.Text>
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

      {/* Letras flutuantes */}
      <FloatingLetter letter="D" style={styles.letterD} />
      <FloatingLetter letter="E" style={styles.letterE} />
      <FloatingLetter letter="R" style={styles.letterR} />
      <FloatingLetter letter="I" style={styles.letterI} />
      <FloatingLetter letter="T" style={styles.letterT} />
      <FloatingLetter letter="V" style={styles.letterV} />
      <FloatingLetter letter="A" style={styles.letterA} />

      <View style={styles.content}>
        {/* Título animado */}
        <Animated.View style={[styles.titleContainer, titleAnimatedStyle]}>
          <Text style={styles.titleShadow}>DERITIVA</Text>
          <Text style={styles.title}>DERITIVA</Text>
          <Text style={styles.titleSub}>Aprenda Brincando</Text>
        </Animated.View>


        <ShimmerButton 
          title="Iniciar Jornada" 
          onPress={() => router.push("/exercicio1" as never)}
        />
      </View>
    </View>
  );
}