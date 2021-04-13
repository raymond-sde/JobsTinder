import "react-native-gesture-handler";
import * as React from "react";
import { Tab } from "../App";
import { NavigationContainer } from "@react-navigation/native";
import { SavedOrRejectedJobs } from "./SavedOrRejectedJobs";
import { SearchForJobs } from "./SearchForJobs";
import { Ionicons } from "@expo/vector-icons";
import { JobStatus } from "./JobStatus";

export const ParentContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Search Jobs") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Saved Jobs") {
              iconName = focused ? "bookmark" : "bookmark-outline";
            } else if (route.name === "Rejected Jobs") {
              iconName = focused ? "trash-bin" : "trash-bin-outline";
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
        <Tab.Screen
          name="Saved Jobs"
          children={() => <SavedOrRejectedJobs jobStatus={JobStatus.SAVED} />}
        />
        <Tab.Screen
          name="Rejected Jobs"
          children={() => (
            <SavedOrRejectedJobs jobStatus={JobStatus.REJECTED} />
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
