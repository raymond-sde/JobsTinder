// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import Button from "./components/TestPage";
// import { StyleSheet, Text, View } from "react-native";
// import TestPage from "./components/TestPage";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>asdfff</Text>
//       <TestPage />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParentContainer } from "./components/ParentContainer";

export const Tab = createBottomTabNavigator();

export default function App() {
  return (
    ParentContainer()
  );
}


