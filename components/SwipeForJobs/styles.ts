import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const overlayLabels = {
  left: {
    title: "Rejected!",
    style: {
      label: {
        backgroundColor: "red",
        color: "white",
        fontSize: 24,
      },
      wrapper: {
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        marginTop: 20,
        marginLeft: -20,
      },
    },
  },
  right: {
    title: "Saved!",
    style: {
      label: {
        backgroundColor: "blue",
        color: "white",
        fontSize: 24,
      },
      wrapper: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 20,
        marginLeft: 20,
      },
    },
  },
};
