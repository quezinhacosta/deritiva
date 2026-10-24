import { View, Text, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { styles } from "../../styles/tutorial";
import TutorialCard from "../../components/TutorialCard";
import { TutorialStep } from "../../types/tutorial";

// ===== DADOS =====
const tutorialSteps: TutorialStep[] = [
  {
    id: 0,
    title: "Bem-vindo ao Deritiva!",
    description: "Um aplicativo educativo para aprender brincando. Explore todos os níveis e exercícios no seu ritmo. Divirta-se enquanto aprende novas palavras!",
    type: 'welcome',
  },
  {
    id: 1,
    title: "Estrutura do Jogo",
    description: "O jogo possui 5 níveis de dificuldade: Iniciante, Explorador, Aventureiro, Mestre e Lenda. Cada nível contém 4 exercícios diferentes para você praticar e evoluir.",
    type: 'levels',
  },
  {
    id: 2,
    title: "Exercício 1: Sílaba Faltante",
    description: "Neste exercício, você verá uma palavra incompleta com um espaço para uma sílaba. Sua missão é escolher a sílaba correta entre as opções para completar a palavra. Use a dica se precisar de ajuda!",
    type: 'exercise1',
  },
  {
    id: 3,
    title: "Exercício 2: Formando a Palavra",
    description: "As sílabas da palavra estão embaralhadas. Você precisa organizá-las na ordem correta para formar a palavra certa. Toque nas sílabas para organizá-las até formar a palavra correta.",
    type: 'exercise2',
  },
  {
    id: 4,
    title: "Exercício 3: Construtor",
    description: "Uma palavra está incompleta e você precisa escolher a sílaba correta entre as opções para completá-la. Cada palavra tem uma única sílaba que a completa corretamente.",
    type: 'exercise3',
  },
  {
    id: 5,
    title: "Exercício 4: Intruso",
    description: "Você receberá uma família de palavras e uma delas não pertence a essa família. Sua tarefa é identificar qual palavra é a intrusa. Preste atenção no radical e no significado!",
    type: 'exercise4',
  },
  {
    id: 6,
    title: "Sistema de Pontuação",
    description: "Cada exercício concluído concede até 4 estrelas de acordo com seu desempenho. Conquiste 100% de acertos para ganhar as 4 estrelas máximas, ou pelo menos 1 estrela ao concluir a atividade!",
    type: 'stars',
  },
  {
    id: 7,
    title: "Liberdade para Explorar",
    description: "O primeiro nível começa desbloqueado. Ao completar os 4 exercícios de um nível, o próximo nível é liberado para você continuar avançando no seu ritmo.",
    type: 'freedom',
  },
  {
    id: 8,
    title: "Dicas e Estratégias",
    description: "Use as dicas disponíveis em cada exercício para ajudar. Não tenha medo de errar: cada erro é uma oportunidade de aprender. Leia com atenção, pense e divirta-se aprendendo!",
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
            <Text style={styles.navButtonText}>Próximo</Text>
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