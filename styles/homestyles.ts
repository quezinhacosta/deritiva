import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#341e42",
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 24,
    overflow: "hidden",
  },

  bubble1: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#ffcf4d",
    opacity: 0.16,
    top: -40,
    right: -60,
  },

  bubble2: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#ffffff",
    opacity: 0.1,
    bottom: 90,
    left: -40,
  },

  bubble3: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ff8a3d",
    opacity: 0.2,
    top: 260,
    right: 20,
  },

  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#ffd54f",
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: 10,
  },

  subtitle: {
    color: "#f8f2ff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 26,
    letterSpacing: 0.3,
    marginBottom: 24,
  },

  mascotCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 24,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: "#ffd54f",
  },

  mascotText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 28,
    fontWeight: "600",
    letterSpacing: 0.2,
  },

  button: {
    height: 64,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  buttonText: {
    color: "#1f1a24",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  footer: {
    marginTop: 20,
    textAlign: "center",
    color: "#e9dff5",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});