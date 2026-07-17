import { View, Text, StyleSheet, ScrollView } from "react-native";
import { styles as homeStyles } from "../../styles/homestyles";

export default function Explore() {
  return (
    <ScrollView style={homeStyles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={homeStyles.content}>
        <Text style={homeStyles.title}> Seu Progresso</Text>

        <View style={homeStyles.card}>
          <Text style={homeStyles.cardTitle}> Desafios Concluídos</Text>
          <Text style={homeStyles.cardText}> 9 de 20 exercícios</Text>
          <Text style={homeStyles.cardText}> 18 estrelas conquistadas</Text>
          <Text style={homeStyles.cardText}> Sequência: 5 dias</Text>
        </View>

        <View style={homeStyles.card}>
          <Text style={homeStyles.cardTitle}> Progresso Geral</Text>
          <View style={homeStyles.barBackground}>
            <View style={[homeStyles.barFill, { width: "45%" }]} />
          </View>
          <Text style={{ color: "#FFFFFF", marginTop: 8, fontSize: 14 }}>
            45% completo
          </Text>
        </View>

        <View style={homeStyles.card}>
          <Text style={homeStyles.cardTitle}> Conquistas</Text>
          <Text style={homeStyles.cardText}> Primeira estrela</Text>
          <Text style={homeStyles.cardText}> 5 exercícios</Text>
          <Text style={homeStyles.cardText}> Sequência de 3 dias</Text>
        </View>
      </View>
    </ScrollView>
  );
}