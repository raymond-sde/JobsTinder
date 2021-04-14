import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexWrap: "wrap",
    marginTop: -50,
    minHeight: 350,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 30,
  },
  logo: {
    width: 100,
    flex: 1,
    resizeMode: "contain",
  },
});
