import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#140535", // Azul-marinho escuro de alto contraste
    paddingHorizontal: 25,
    paddingTop: 70,
    overflow: "hidden",
  },

  /* Bolhas lúdicas de fundo */
  bubble1: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#FF6B6B", 
    opacity: 0.25,
    top: -50,
    right: -60,
  },

  bubble2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#4EA8DE", 
    opacity: 0.25,
    bottom: 80,
    left: -50,
  },

  bubble3: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#ae7b06", 
    opacity: 0.20,
    top: 280,
    left: 230,
  },

  stars: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFD166",
  },

  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 2, // Essencial para dislexia: mais espaço entre letras
    marginBottom: 12,
    textShadowColor: "#4EA8DE",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },

  subtitle: {
    color: "#E2EAFC",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 30, // Linhas bem espaçadas para não embaralhar a leitura
    letterSpacing: 1,
    marginBottom: 35,
  },

  /* Bloco do Mascote: Fundo Transparente e Letras Chamativas */
  mascotCard: {
    backgroundColor: "transparent", // Totalmente transparente conforme solicitado
    borderRadius: 35,
    padding: 25,
    marginBottom: 35,
    borderWidth: 4,
    borderColor: "#574605", // Borda amarela chamativa para delimitar o espaço
    borderStyle: "dashed", // Estilo tracejado que remete a mapas de tesouro/lúdico
  },

  mascotText: {
    fontSize: 22,
    color: "#FFF176", // Amarelo vivo e super chamativo sobre o fundo azul
    textAlign: "center",
    lineHeight: 34,
    fontWeight: "800",
    letterSpacing: 1.2,
    // Sombra leve escura para destacar a letra do fundo
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },

  /* Botões Super Arredondados e Destoantes (Alto Contraste) */
  button: {
    color: "#FFF176",
    height: 75,
    borderRadius: 37.5, // Metade da altura torna o botão perfeitamente oval/arredondado
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    // Efeito 3D sutil para destacar o botão do fundo
    borderBottomWidth: 5,
    shadowColor: "#fbdf0c",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  exerciseButton: {
    backgroundColor: "#FF6B6B", // Vermelho/Coral vivo (destoa completamente do azul)
    borderBottomColor: "#D94E4E",
  },

  readingButton: {
    backgroundColor: "#FFD166", // Amarelo Ouro
    borderBottomColor: "#E6B847",
  },

  progressButton: {
    backgroundColor: "#06D6A0", // Verde Menta brilhante
    borderBottomColor: "#04B385",
  },

  /* Texto dos botões adaptado para leitura fácil */
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1.5, // Facilita a identificação da palavra
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },

  footer: {
    marginTop: 25,
    textAlign: "center",
    color: "#9BB1FF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
});