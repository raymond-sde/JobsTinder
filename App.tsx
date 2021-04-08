import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParentContainer } from "./components/ParentContainer";

export const Tab = createBottomTabNavigator();

export default function App() {
  return (
    ParentContainer()
  );
}


