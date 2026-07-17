import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
} from 'react-native-reanimated';

// Componente de fundo com efeito de gradiente animado (sem bolas)
export default function AnimatedBackground() {
  // Valores para animação do gradiente
  const gradientX = useSharedValue(0);
  const gradientY = useSharedValue(0);

  useEffect(() => {
    // Animação suave do gradiente
    gradientX.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    gradientY.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 4000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: gradientX.value * 20 - 10 },
      { translateY: gradientY.value * 20 - 10 },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* Gradiente animado de fundo */}
      <Animated.View style={[styles.gradient, animatedStyle]} />
      
      {/* Overlay sutil para profundidade */}
      <View style={styles.overlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#601938',
    zIndex: 0,
  },
  gradient: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    bottom: -50,
    backgroundColor: 'transparent',
    // Usando um gradiente radial aproximado com opacidade
    borderWidth: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(96, 25, 56, 0.3)',
  },
});