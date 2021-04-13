import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Message = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 30
  },
  text: {
    padding: 10,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  }
});
