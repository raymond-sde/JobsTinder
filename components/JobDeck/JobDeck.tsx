import React from "react";
import { View } from "react-native";
import { JobCard } from "../JobCard/JobCard";
import { styles } from "./styles";

export const JobDeck = () => {
  return (
    <View style={styles.container}>
      <JobCard />
    </View>
  );
};
