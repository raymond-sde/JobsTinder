import * as React from "react";
import { Tab } from "../App";
import { NavigationContainer } from "@react-navigation/native";
import { RejectedJobs } from "./RejectedJobs";
import { SavedJobs } from "./SavedJobs";
import { SearchForJobs } from "./SearchForJobs";

export const ParentContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Search Jobs" component={SearchForJobs} />
        <Tab.Screen name="Saved Jobs" component={SavedJobs} />
        <Tab.Screen name="Rejected Jobs" component={RejectedJobs} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
