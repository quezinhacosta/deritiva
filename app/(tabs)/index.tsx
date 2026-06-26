import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../../styles/homestyles";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={styles.backgroundGlow1} />
      <View style={styles.backgroundGlow2} />

      <View style={styles.floatingBubble1} />
      <View style={styles.floatingBubble2} />
      <View style={styles.floatingBubble3} />

      <Text style={styles.title}>DERITIVA</Text>

      <Text style={styles.subtitle}>
        Aprender pode ser divertido, colorido e acessível.
      </Text>

      {/* Card principal */}
      <View style={styles.mascotCard}>
        <Text style={styles.mascotText}>
          Bem-vindo ao Deritiva!{"\n\n"}
          Explore exercícios, desenvolva habilidades de leitura e acompanhe seu progresso.
        </Text>
      </View>

      {/* Botões */}
      <Pressable
        style={styles.button}
        onPress={() => router.push("/(tabs)/explore")}
      >
        <Text style={styles.buttonText}>
          Exercícios
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.buttonBlue]}
      >
        <Text style={styles.buttonText}>
          Leitura Assistida
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.buttonGreen]}
      >
        <Text style={styles.buttonText}>
          Meu Progresso
        </Text>
      </Pressable>

      <Text style={styles.footer}>
        Feito com para inclusão e aprendizagem.
      </Text>

    </View>
  );
}