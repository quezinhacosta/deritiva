import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { styles } from "../styles/homestyles";

type FloatingLetterProps = {
  char: string;
  style: any;
  duration?: number;
  amplitude?: number;
  delay?: number;
  xAmplitude?: number;
};

function FloatingLetter({
  char,
  style,
  duration = 2400,
  amplitude = 12,
  delay = 0,
  xAmplitude = 10,
}: FloatingLetterProps) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0.45);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-amplitude, {
          duration,
          easing: Easing.inOut(Easing.quad),
        }),
        -1,
        true
      )
    );

    translateX.value = withDelay(
      delay,
      withRepeat(
        withTiming(xAmplitude, {
          duration: duration * 1.25,
          easing: Easing.inOut(Easing.quad),
        }),
        -1,
        true
      )
    );

    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(0.9, {
          duration: duration / 2,
          easing: Easing.inOut(Easing.quad),
        }),
        -1,
        true
      )
    );
  }, [amplitude, delay, duration, opacity, translateX, translateY, xAmplitude]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.Text style={[styles.floatingLetter, style, animatedStyle]}>
      {char}
    </Animated.Text>
  );
}

export default function AnimatedBackground() {
  return (
    <View style={[StyleSheet.absoluteFillObject, { pointerEvents: "none" }]}>
      <FloatingLetter char="D" style={styles.letterD} duration={1800} amplitude={12} xAmplitude={14} />
      <FloatingLetter char="E" style={styles.letterE} duration={2000} amplitude={14} delay={120} xAmplitude={16} />
      <FloatingLetter char="R" style={styles.letterR} duration={1900} amplitude={13} delay={220} xAmplitude={15} />
      <FloatingLetter char="I" style={styles.letterI} duration={2200} amplitude={15} delay={320} xAmplitude={18} />
    </View>
  );
}