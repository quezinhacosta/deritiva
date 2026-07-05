import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import AnimatedBackground from "../../components/AnimatedBackground";
import { styles } from "../../styles/homestyles";

function AnimatedButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
    >
      <Animated.View style={[styles.button, animatedStyle]}>
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AnimatedBackground />

      <View style={styles.content}>
        <Text style={styles.title}>DERITIVA</Text>

        <Text style={styles.subtitle}>Complete desafios e evolua no seu ritmo.</Text>

        <AnimatedButton
          title="Começar a Jogar"
          onPress={() => router.push("/exercicio1" as never)}
        />

        <AnimatedButton
          title="Sobre"
          onPress={() => router.push("/sobre" as never)}
        />

        <AnimatedButton
          title="Minhas Conquistas"
          onPress={() => router.push("/explore")}
        />
      </View>
    </View>
  );
}