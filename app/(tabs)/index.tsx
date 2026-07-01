import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../../styles/homestyles";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.bubble1} />
      <View style={styles.bubble2} />
      <View style={styles.bubble3} />

      <Text style={styles.title}>DERITIVA</Text>

      <Text style={styles.subtitle}>
        Aprender pode ser divertido, colorido e acessível.
      </Text>

      <View style={styles.mascotCard}>
        <Text style={styles.mascotText}>
          {"Bem-vindo ao Deritiva!\n\nExplore exercícios, escolha seu nível e acompanhe seu progresso."}
        </Text>
      </View>

      <Pressable style={styles.button} onPress={() => router.push("/exercicio1" as never)}>
        <Text style={styles.buttonText}>Exercícios</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push("/(tabs)/explore")}>
        <Text style={styles.buttonText}>Meu Progresso</Text>
      </Pressable>

    
    </View>
  );
}