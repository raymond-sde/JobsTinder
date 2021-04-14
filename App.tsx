import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SavedOrRejectedJobs } from "./components/SavedOrRejectedJobs";
import { SearchForJobs } from "./components/SearchForJobs/SearchForJobs";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { JobStatus } from "./components/JobStatus";
const SearchStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search For Job" component={SearchForJobs} />
  </SearchStack.Navigator>
);

export const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
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
          <Tab.Screen name="Search Jobs" component={SearchStackScreen} />
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
    </View>
  );
};

export default App;
