import { View, Text, Pressable, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import * as Speech from "expo-speech";

export default function TutorialScreen() {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "🎯 Bem-vindo ao Deritiva!",
      description: "Um aplicativo educativo para aprender brincando! Complete desafios e evolua no seu ritmo.",
      image: "📚",
    },
    {
      title: "📊 Trilha de Desafios",
      description: "São 5 níveis de dificuldade. Cada nível tem 3 exercícios para você completar.",
      image: "🗺️",
    },
    {
      title: "🧩 Exercício 1: Sílaba Faltante",
      description: "Veja a imagem, leia a dica e escolha a sílaba correta para completar a palavra!",
      image: "🔤",
    },
    {
      title: "🧩 Exercício 2: Formando a Palavra",
      description: "Organize as sílabas na ordem certa para formar a palavra correta.",
      image: "🧩",
    },
    {
      title: "🏆 Como Ganhar",
      description: "Complete os exercícios para desbloquear novos níveis. Quanto mais você acerta, mais avança!",
      image: "⭐",
    },
    {
      title: "🚀 Dicas",
      description: "• Preste atenção na imagem\n• Leia a dica com cuidado\n• Não tenha medo de errar, aprenda com os erros!",
      image: "💡",
    },
  ];

  const speakText = (text: string) => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    Speech.speak(text, {
      language: "pt-BR",
      pitch: 1,
      rate: 0.9,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const speakAllTutorial = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const fullText = tutorialSteps.map(step => 
      `${step.title}. ${step.description}`
    ).join(". ");

    Speech.speak(fullText, {
      language: "pt-BR",
      pitch: 1,
      rate: 0.9,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const speakCurrentStep = () => {
    const step = tutorialSteps[currentStep];
    speakText(`${step.title}. ${step.description}`);
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const current = tutorialSteps[currentStep];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Tutorial</Text>
      </View>

      {/* Controles de Voz */}
      <View style={styles.voiceControls}>
        <TouchableOpacity 
          style={[styles.voiceButton, isSpeaking && styles.voiceButtonActive]} 
          onPress={speakCurrentStep}
        >
          <Text style={styles.voiceButtonText}>
            {isSpeaking ? "⏹️ Parar" : "🔊 Ouvir esta etapa"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.voiceButton, styles.voiceButtonAll]} 
          onPress={speakAllTutorial}
        >
          <Text style={styles.voiceButtonText}>
            {isSpeaking ? "⏹️ Parar" : "🔊 Ouvir tudo"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo do Tutorial */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Progresso */}
        <View style={styles.progressContainer}>
          {tutorialSteps.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.progressDot, 
                index === currentStep && styles.progressDotActive,
                index < currentStep && styles.progressDotCompleted
              ]} 
            />
          ))}
        </View>

        {/* Card do Step */}
        <View style={styles.card}>
          <Text style={styles.stepEmoji}>{current.image}</Text>
          <Text style={styles.stepTitle}>{current.title}</Text>
          <Text style={styles.stepDescription}>{current.description}</Text>
        </View>

        {/* Navegação */}
        <View style={styles.navigation}>
          <TouchableOpacity 
            style={[styles.navButton, currentStep === 0 && styles.navButtonDisabled]} 
            onPress={prevStep}
            disabled={currentStep === 0}
          >
            <Text style={styles.navButtonText}>← Anterior</Text>
          </TouchableOpacity>

          <Text style={styles.stepCounter}>
            {currentStep + 1} / {tutorialSteps.length}
          </Text>

          <TouchableOpacity 
            style={[styles.navButton, currentStep === tutorialSteps.length - 1 && styles.navButtonDisabled]} 
            onPress={nextStep}
            disabled={currentStep === tutorialSteps.length - 1}
          >
            <Text style={styles.navButtonText}>Próximo →</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Jogar */}
        {currentStep === tutorialSteps.length - 1 && (
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => router.push("/exercicio1" as never)}
          >
            <Text style={styles.playButtonText}>🎮 Começar a Jogar!</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#341e42",
    paddingHorizontal: 20,
    paddingTop: 54,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 12,
  },
  backButtonText: {
    color: "#341e42",
    fontWeight: "800",
  },
  headerTitle: {
    color: "#ffd54f",
    fontSize: 24,
    fontWeight: "900",
  },
  voiceControls: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  voiceButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
  },
  voiceButtonActive: {
    backgroundColor: "rgba(255, 213, 79, 0.3)",
    borderColor: "#ffd54f",
  },
  voiceButtonAll: {
    flex: 1,
  },
  voiceButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  scrollContent: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  progressDotActive: {
    backgroundColor: "#ffd54f",
    width: 24,
  },
  progressDotCompleted: {
    backgroundColor: "rgba(255, 213, 79, 0.5)",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#ffd54f",
    minHeight: 280,
    justifyContent: "center",
    alignItems: "center",
  },
  stepEmoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  stepTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  stepDescription: {
    color: "#f6ebff",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  stepCounter: {
    color: "#f6ebff",
    fontSize: 14,
    fontWeight: "500",
  },
  playButton: {
    backgroundColor: "#ffd54f",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  playButtonText: {
    color: "#341e42",
    fontSize: 18,
    fontWeight: "800",
  },
});