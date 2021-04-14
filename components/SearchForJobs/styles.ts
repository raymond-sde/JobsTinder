import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "gold",
  },
  searchStyling: {
    width: "100%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: "#841584",
    borderRadius: 0,
    marginHorizontal: 12,
  },
  topContainer: {
    width: "100%",
  },
  header: {
    fontSize: 48,
    fontFamily: "Helvetica",
    fontWeight: "300",
    textAlign: "center",
  },
  bottomContainer: {
    position: "absolute",
    bottom: -100,
    width: "100%",
  },
  swiperContainer: {
    flex: 0.5,
  },
  clearButton: {
    backgroundColor: "#841584",
    borderRadius: 0,
    marginHorizontal: 12,
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#841584",
    borderRadius: 0,
    marginTop: 20,
    marginHorizontal: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
