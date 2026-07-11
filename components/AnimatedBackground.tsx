import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";

const AnimatedBackground = () => {
  // Bolhas animadas
  const bubble1 = useSharedValue(0);
  const bubble2 = useSharedValue(0);
  const bubble3 = useSharedValue(0);
  const bubble4 = useSharedValue(0);
  const bubble5 = useSharedValue(0);

  useEffect(() => {
    const duration = 4000;
    
    bubble1.value = withRepeat(
      withSequence(
        withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    bubble2.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 5000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    bubble3.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    bubble4.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 4500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 4500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    bubble5.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedBubble1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: bubble1.value * 60 - 30 },
      { translateY: bubble1.value * 50 - 25 },
      { scale: 1 + bubble1.value * 0.4 },
    ],
  }));

  const animatedBubble2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: bubble2.value * 80 - 40 },
      { translateY: bubble2.value * 30 - 15 },
      { scale: 1 + bubble2.value * 0.6 },
    ],
  }));

  const animatedBubble3 = useAnimatedStyle(() => ({
    transform: [
      { translateX: bubble3.value * 50 - 25 },
      { translateY: bubble3.value * 70 - 35 },
      { scale: 1 + bubble3.value * 0.5 },
    ],
  }));

  const animatedBubble4 = useAnimatedStyle(() => ({
    transform: [
      { translateX: bubble4.value * 90 - 45 },
      { translateY: bubble4.value * 40 - 20 },
      { scale: 1 + bubble4.value * 0.3 },
    ],
  }));

  const animatedBubble5 = useAnimatedStyle(() => ({
    transform: [
      { translateX: bubble5.value * 70 - 35 },
      { translateY: bubble5.value * 60 - 30 },
      { scale: 1 + bubble5.value * 0.7 },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bubble, styles.bubble1, animatedBubble1]} />
      <Animated.View style={[styles.bubble, styles.bubble2, animatedBubble2]} />
      <Animated.View style={[styles.bubble, styles.bubble3, animatedBubble3]} />
      <Animated.View style={[styles.bubble, styles.bubble4, animatedBubble4]} />
      <Animated.View style={[styles.bubble, styles.bubble5, animatedBubble5]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  bubble: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.2,
  },
  bubble1: {
    width: 250,
    height: 250,
    backgroundColor: "#F5B55A",
    top: -80,
    right: -80,
  },
  bubble2: {
    width: 180,
    height: 180,
    backgroundColor: "#E480BB",
    bottom: -60,
    left: -60,
  },
  bubble3: {
    width: 120,
    height: 120,
    backgroundColor: "#E97E0C",
    top: "35%",
    right: "5%",
  },
  bubble4: {
    width: 150,
    height: 150,
    backgroundColor: "#F5B55A",
    bottom: "30%",
    left: "-10%",
  },
  bubble5: {
    width: 100,
    height: 100,
    backgroundColor: "#E480BB",
    top: "10%",
    left: "20%",
  },
});

export default AnimatedBackground;