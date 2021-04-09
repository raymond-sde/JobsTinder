import * as React from "react";
import { Tab } from "../App";
import { NavigationContainer } from "@react-navigation/native";
import { RejectedJobs } from "./RejectedJobs";
import { SavedJobs } from "./SavedJobs";
import { SearchForJobs } from "./SearchForJobs";
import { Ionicons } from '@expo/vector-icons'

export const ParentContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Search Jobs") {
              iconName = focused
                ? "search"
                : "search-outline";
            } else if (route.name === "Saved Jobs") {
              iconName = focused 
                ? "bookmark" 
                : "bookmark-outline";
            } else if (route.name === "Rejected Jobs") {
              iconName = focused
                ? "trash-bin"
                : "trash-bin-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Search Jobs" component={SearchForJobs} />
        <Tab.Screen name="Saved Jobs" component={SavedJobs} />
        <Tab.Screen name="Rejected Jobs" component={RejectedJobs} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
