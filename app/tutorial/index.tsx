import { View, Text, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import * as Speech from "expo-speech";
import { styles } from "../../styles/tutorial";
import TutorialCard from "../../components/TutorialCard";

// ===== TIPOS =====
interface TutorialStep {
  id: number;
  title: string;
  description: string;
  type: 'welcome' | 'levels' | 'exercise1' | 'exercise2' | 'rules' | 'tips';
}

// ===== DADOS =====
const tutorialSteps: TutorialStep[] = [
  {
    id: 0,
    title: "Bem-vindo ao Deritiva!",
    description: "Um aplicativo educativo para aprender brincando. Complete desafios e evolua no seu ritmo.",
    type: 'welcome',
  },
  {
    id: 1,
    title: "Trilha de Desafios",
    description: "São 5 níveis de dificuldade. Cada nível tem 3 exercícios para você completar.",
    type: 'levels',
  },
  {
    id: 2,
    title: "Exercício: Sílaba Faltante",
    description: "Veja a dica, leia a palavra incompleta e escolha a sílaba correta para completá-la.",
    type: 'exercise1',
  },
  {
    id: 3,
    title: "Exercício: Formando a Palavra",
    description: "Organize as sílabas na ordem certa para formar a palavra correta.",
    type: 'exercise2',
  },
  {
    id: 4,
    title: "Como Avançar",
    description: "Complete os exercícios para desbloquear novos níveis. Quanto mais você acerta, mais avança!",
    type: 'rules',
  },
  {
    id: 5,
    title: "Dicas para Jogar",
    description: "Leia com atenção, não tenha medo de errar e aprenda com os erros.",
    type: 'tips',
  },
];

export default function TutorialScreen() {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

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
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
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


      <View style={styles.voiceControls}>
        <TouchableOpacity 
          style={[styles.voiceButton, isSpeaking && styles.voiceButtonActive]} 
          onPress={speakCurrentStep}
        >
          <Text style={styles.voiceButtonText}>
            {isSpeaking ? "⏹ Parar" : " Ouvir etapa"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.voiceButton, styles.voiceButtonAll]} 
          onPress={speakAllTutorial}
        >
          <Text style={styles.voiceButtonText}>
            {isSpeaking ? "⏹ Parar" : "🔊 Ouvir tudo"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo do Tutorial */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
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

        {/* Card do Step com Demonstração Visual */}
        <TutorialCard step={current} />

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
            <Text style={styles.playButtonText}>Jogar Agora</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}