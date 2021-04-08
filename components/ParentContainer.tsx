import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RejectedJobs } from "./RejectedJobs";
import { SavedJobs } from "./SavedJobs";
import { Tab } from "../App";
import { SwipeForJobs } from "./SwipeForJobs";
import { SearchForJobs } from "./SearchForJobs";

export const ParentContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Search Jobs" component={SearchForJobs} />
        <Tab.Screen name="Swipe Jobs" component={SwipeForJobs} />
        <Tab.Screen name="Saved Jobs" component={SavedJobs} />
        <Tab.Screen name="Rejected Jobs" component={RejectedJobs} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
