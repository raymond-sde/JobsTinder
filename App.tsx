import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParentContainer } from "./components/ParentContainer";

export const Tab = createBottomTabNavigator();

const App = () => {
  return <ParentContainer />;
};

export default App;
