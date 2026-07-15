import { View, Text, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { styles } from "../../styles/tutorial";
import TutorialCard from "../../components/TutorialCard";

// ===== TIPOS =====
interface TutorialStep {
  id: number;
  title: string;
  description: string;
  type: 'welcome' | 'levels' | 'exercise1' | 'exercise2' | 'exercise3' | 'exercise4' | 'rules' | 'tips';
}

// ===== DADOS =====
const tutorialSteps: TutorialStep[] = [
  {
    id: 0,
    title: "Bem-vindo ao Deritiva!",
    description: "Um aplicativo educativo para aprender brincando. Complete os desafios e evolua no seu ritmo.",
    type: 'welcome',
  },
  {
    id: 1,
    title: "Trilha de Niveis",
    description: "Sao 5 niveis de dificuldade. Cada nivel tem 4 exercicios para voce completar.",
    type: 'levels',
  },
  {
    id: 2,
    title: "Exercicio: Silaba Faltante",
    description: "Veja a dica, leia a palavra incompleta e escolha a silaba correta para completa-la.",
    type: 'exercise1',
  },
  {
    id: 3,
    title: "Exercicio: Formando a Palavra",
    description: "Organize as silabas na ordem certa para formar a palavra correta.",
    type: 'exercise2',
  },
  {
    id: 4,
    title: "Exercicio: Construtor",
    description: "Crie suas proprias palavras combinando silabas e letras.",
    type: 'exercise3',
  },
  {
    id: 5,
    title: "Exercicio: Intruso",
    description: "Encontre a palavra que nao pertence a familia de palavras.",
    type: 'exercise4',
  },
  {
    id: 6,
    title: "Sistema de Estrelas",
    description: "Cada exercicio concluido concede estrelas. Quanto mais estrelas, melhor seu desempenho!",
    type: 'rules',
  },
  {
    id: 7,
    title: "Dicas para Jogar",
    description: "Leia com atencao, nao tenha medo de errar e aprenda com os erros.",
    type: 'tips',
  },
];

export default function TutorialScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

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
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Tutorial</Text>
      </View>

      {/* Conteudo do Tutorial */}
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

        {/* Card do Step com Demonstracao Visual */}
        <TutorialCard step={current} />

        {/* Navegacao */}
        <View style={styles.navigation}>
          <TouchableOpacity 
            style={[styles.navButton, currentStep === 0 && styles.navButtonDisabled]} 
            onPress={prevStep}
            disabled={currentStep === 0}
          >
            <Text style={styles.navButtonText}>Anterior</Text>
          </TouchableOpacity>

          <Text style={styles.stepCounter}>
            {currentStep + 1} / {tutorialSteps.length}
          </Text>

          <TouchableOpacity 
            style={[styles.navButton, currentStep === tutorialSteps.length - 1 && styles.navButtonDisabled]} 
            onPress={nextStep}
            disabled={currentStep === tutorialSteps.length - 1}
          >
            <Text style={styles.navButtonText}>Proximo</Text>
          </TouchableOpacity>
        </View>

        {/* Botao Jogar */}
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