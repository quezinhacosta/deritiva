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
    description: "Um aplicativo educativo para aprender brincando. Explore todos os niveis e exercicios no seu ritmo. Divirta-se enquanto aprende novas palavras!",
    type: 'welcome',
  },
  {
    id: 1,
    title: "Estrutura do Jogo",
    description: "O jogo possui 5 niveis de dificuldade: Iniciante, Explorador, Aventureiro, Mestre e Lenda. Cada nivel contem 4 exercicios diferentes para você praticar e evoluir.",
    type: 'levels',
  },
  {
    id: 2,
    title: "Exercicio 1: Silaba Faltante",
    description: "Neste exercicio, você verá uma palavra incompleta com um espaco para uma silaba. Sua missao e escolher a silaba correta entre as opcoes para completar a palavra. Use a dica se precisar de ajuda!",
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
    description: "Cada exercicio concluido concede ate 4 estrelas de acordo com seu desempenho. Conquiste 100% de acertos para ganhar as 4 estrelas maximas, ou pelo menos 1 estrela ao concluir a atividade!",
    type: 'stars',
  },
  {
    id: 7,
    title: "Liberdade para Explorar",
    description: "O primeiro nivel começa desbloqueado. Ao completar os 4 exercicios de um nivel, o proximo nivel e liberado para voce continuar avancando no seu ritmo.",
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