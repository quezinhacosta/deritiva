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
  type: 'welcome' | 'levels' | 'exercise1' | 'exercise2' | 'exercise3' | 'exercise4' | 'stars' | 'freedom' | 'tips';
}

// ===== DADOS =====
const tutorialSteps: TutorialStep[] = [
  {
    id: 0,
    title: "Bem-vindo ao Deritiva!",
    description: "Um aplicativo educativo para aprender brincando. Explore todos os niveis e exercicios no seu ritmo. Divirta-se enquanto aprende novas palavras!",
    type: 'welcome',
  },
  {
    id: 1,
    title: "Estrutura do Jogo",
    description: "O jogo possui 5 niveis de dificuldade: Iniciante, Aprendiz, Intermediario, Avancado e Mestre. Cada nivel contem 4 exercicios diferentes para voce praticar e evoluir.",
    type: 'levels',
  },
  {
    id: 2,
    title: "Exercicio 1: Silaba Faltante",
    description: "Neste exercicio, voce vera uma palavra incompleta com um espaco para uma silaba. Sua missao e escolher a silaba correta entre as opcoes para completar a palavra. Use a dica se precisar de ajuda!",
    type: 'exercise1',
  },
  {
    id: 3,
    title: "Exercicio 2: Formando a Palavra",
    description: "As silabas da palavra estao embaralhadas. Voce precisa organiza-las na ordem correta para formar a palavra certa. Toque nas silabas para rearranja-las ate formar a palavra correta.",
    type: 'exercise2',
  },
  {
    id: 4,
    title: "Exercicio 3: Construtor",
    description: "Uma palavra esta incompleta e voce precisa escolher a silaba correta entre as opcoes para completa-la. Cada palavra tem uma unica silaba que a completa corretamente.",
    type: 'exercise3',
  },
  {
    id: 5,
    title: "Exercicio 4: Intruso",
    description: "Voce recebera uma familia de palavras e uma delas nao pertence a essa familia. Sua tarefa e identificar qual palavra e o intruso. Preste atencao no radical e no significado!",
    type: 'exercise4',
  },
  {
    id: 6,
    title: "Sistema de Pontuacao",
    description: "Cada exercicio concluido concede estrelas de acordo com seu desempenho. Quanto mais estrelas voce ganha, melhor e seu progresso. As estrelas sao acumuladas em cada nivel e mostram seu dominio do conteudo.",
    type: 'stars',
  },
  {
    id: 7,
    title: "Liberdade para Explorar",
    description: "Todos os 5 niveis estao completamente desbloqueados desde o inicio! Voce pode escolher qualquer nivel e qualquer exercicio para jogar quando quiser. Nao ha restricoes, explore no seu proprio ritmo.",
    type: 'freedom',
  },
  {
    id: 8,
    title: "Dicas e Estrategias",
    description: "Use as dicas disponiveis em cada exercicio para te ajudar. Nao tenha medo de errar, cada erro e uma oportunidade de aprender. Leia com atencao, pense e divirta-se aprendendo!",
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