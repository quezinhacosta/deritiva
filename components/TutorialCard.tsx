import { View, Text } from "react-native";
import { styles } from "../styles/tutorial";

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  type: 'welcome' | 'levels' | 'exercise1' | 'exercise2' | 'rules' | 'tips';
}

interface TutorialCardProps {
  step: TutorialStep;
}

export default function TutorialCard({ step }: TutorialCardProps) {
  const renderDemo = () => {
    switch (step.type) {
      case 'exercise1':
        return (
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Exemplo: Sílaba Faltante</Text>
            
            <View style={styles.demoRow}>
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>
                PALAVRA: 
              </Text>
            </View>
            
            <View style={[styles.demoRow, { marginTop: 8 }]}>
              <View style={styles.demoWord}>
                <View style={styles.demoWordPart}>
                  <Text style={styles.demoWordPartText}>GA</Text>
                </View>
                <View style={[styles.demoWordPart, styles.demoWordPartHighlight]}>
                  <Text style={styles.demoWordPartHighlightText}>?  </Text>
                </View>
                <View style={styles.demoWordPart}>
                  <Text style={styles.demoWordPartText}>TA</Text>
                </View>
              </View>
            </View>

            <View style={[styles.demoRow, { marginTop: 12 }]}>
              <Text style={{ color: '#E480BB', fontSize: 14 }}>Escolha a sílaba que falta:</Text>
            </View>

            <View style={[styles.demoRow, { marginTop: 8 }]}>
              <View style={styles.demoSyllable}>
                <Text style={styles.demoSyllableText}>TO</Text>
              </View>
              <View style={[styles.demoSyllable, styles.demoSyllableHighlight]}>
                <Text style={[styles.demoSyllableText, styles.demoSyllableHighlightText]}>TA</Text>
              </View>
              <View style={styles.demoSyllable}>
                <Text style={styles.demoSyllableText}>TE</Text>
              </View>
            </View>

            <View style={[styles.demoRow, { marginTop: 8 }]}>
              <Text style={{ color: '#F5B55A', fontSize: 12, fontWeight: '600' }}>
                ✅ A sílaba correta é "TA" → GATA
              </Text>
            </View>
          </View>
        );

      case 'exercise2':
        return (
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Exemplo: Formando a Palavra</Text>
            
            <View style={styles.demoRow}>
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>
                Organize as sílabas:
              </Text>
            </View>

            <View style={[styles.demoRow, { marginTop: 8 }]}>
              <View style={styles.demoSyllable}>
                <Text style={styles.demoSyllableText}>CA</Text>
              </View>
              <View style={styles.demoSyllable}>
                <Text style={styles.demoSyllableText}>SA</Text>
              </View>
              <View style={[styles.demoSyllable, styles.demoSyllableHighlight]}>
                <Text style={[styles.demoSyllableText, styles.demoSyllableHighlightText]}>CHO</Text>
              </View>
            </View>

            <Text style={{ color: '#E480BB', fontSize: 14, textAlign: 'center', marginTop: 8 }}>
              Arraste as sílabas para formar a palavra
            </Text>

            <View style={[styles.demoRow, { marginTop: 12 }]}>
              <Text style={{ color: '#F5B55A', fontSize: 16, fontWeight: '700' }}>
                CA → SA → CHO = CASACHO
              </Text>
            </View>
          </View>
        );

      case 'welcome':
        return (
          <View style={styles.demoContainer}>
            <Text style={[styles.demoTitle, { fontSize: 16 }]}>
              Seu aprendizado começa aqui
            </Text>
            <View style={[styles.demoRow, { marginTop: 8 }]}>
              <Text style={{ color: '#E480BB', fontSize: 14, textAlign: 'center', lineHeight: 20 }}>
                Este aplicativo foi criado para ajudar você a 
                aprender de forma divertida e interativa.
              </Text>
            </View>
            <View style={[styles.demoRow, { marginTop: 12 }]}>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ backgroundColor: 'rgba(245, 181, 90, 0.15)', padding: 12, borderRadius: 8, alignItems: 'center', flex: 1 }}>
                  <Text style={{ color: '#F5B55A', fontSize: 24, fontWeight: '900' }}>5</Text>
                  <Text style={{ color: '#E480BB', fontSize: 12 }}>Níveis</Text>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 181, 90, 0.15)', padding: 12, borderRadius: 8, alignItems: 'center', flex: 1 }}>
                  <Text style={{ color: '#F5B55A', fontSize: 24, fontWeight: '900' }}>15</Text>
                  <Text style={{ color: '#E480BB', fontSize: 12 }}>Exercícios</Text>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 181, 90, 0.15)', padding: 12, borderRadius: 8, alignItems: 'center', flex: 1 }}>
                  <Text style={{ color: '#F5B55A', fontSize: 24, fontWeight: '900' }}>∞</Text>
                  <Text style={{ color: '#E480BB', fontSize: 12 }}>Aprendizado</Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 'levels':
        return (
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Sua Jornada</Text>
            <View style={[styles.demoRow, { flexDirection: 'column', gap: 8 }]}>
              {[1, 2, 3, 4, 5].map((level) => (
                <View key={level} style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  backgroundColor: level === 1 ? 'rgba(245, 181, 90, 0.15)' : 'rgba(255,255,255,0.05)',
                  padding: 8,
                  borderRadius: 8,
                  width: '100%',
                  borderWidth: level === 1 ? 1 : 0,
                  borderColor: '#F5B55A',
                }}>
                  <View style={{ 
                    width: 30, 
                    height: 30, 
                    borderRadius: 15, 
                    backgroundColor: level === 1 ? '#F5B55A' : 'rgba(255,255,255,0.1)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                  }}>
                    <Text style={{ 
                      color: level === 1 ? '#601938' : '#666',
                      fontWeight: '900',
                      fontSize: 14,
                    }}>
                      {level}
                    </Text>
                  </View>
                  <Text style={{ 
                    color: level === 1 ? '#F5B55A' : '#666',
                    fontWeight: level === 1 ? '700' : '400',
                  }}>
                    {level === 1 ? 'Nível 1: Desbloqueado' : `Nível ${level}: Bloqueado`}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );

      case 'rules':
        return (
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Como Avançar</Text>
            <View style={{ gap: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#F5B55A', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#601938', fontWeight: '900', fontSize: 12 }}>1</Text>
                </View>
                <Text style={{ color: '#FFFFFF' }}>Complete todos os exercícios do nível</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#E480BB', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#FFFFFF', fontWeight: '900', fontSize: 12 }}>2</Text>
                </View>
                <Text style={{ color: '#FFFFFF' }}>Desbloqueie o próximo nível</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#E97E0C', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#FFFFFF', fontWeight: '900', fontSize: 12 }}>3</Text>
                </View>
                <Text style={{ color: '#FFFFFF' }}>Continue aprendendo e evoluindo</Text>
              </View>
            </View>
          </View>
        );

      case 'tips':
        return (
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Dicas Importantes</Text>
            <View style={{ gap: 8 }}>
              <View style={{ backgroundColor: 'rgba(245, 181, 90, 0.1)', padding: 10, borderRadius: 8 }}>
                <Text style={{ color: '#F5B55A', fontWeight: '700' }}>Leia com atenção</Text>
                <Text style={{ color: '#E480BB', fontSize: 13 }}>Cada exercício tem uma dica que ajuda na resposta</Text>
              </View>
              <View style={{ backgroundColor: 'rgba(228, 128, 187, 0.1)', padding: 10, borderRadius: 8 }}>
                <Text style={{ color: '#E480BB', fontWeight: '700' }}>Não tenha medo de errar</Text>
                <Text style={{ color: '#E480BB', fontSize: 13 }}>Errar é parte do aprendizado, tente novamente</Text>
              </View>
              <View style={{ backgroundColor: 'rgba(245, 181, 90, 0.1)', padding: 10, borderRadius: 8 }}>
                <Text style={{ color: '#F5B55A', fontWeight: '700' }}>Pratique todos os dias</Text>
                <Text style={{ color: '#E480BB', fontSize: 13 }}>A prática constante ajuda a fixar o conhecimento</Text>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{step.title}</Text>
      <Text style={styles.cardDescription}>{step.description}</Text>
      {renderDemo()}
    </View>
  );
}