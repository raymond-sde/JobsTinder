import React from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import HTML from "react-native-render-html";
import { styles } from "./styles";
import { jobs } from "../../mock-data";

let job = jobs[2]; // mock data for now

export const JobCard = () => {
  const contentWidth = useWindowDimensions().width;
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{ uri: job.company_logo }}></Image>
      <Text>Job Title: {job.title}</Text>
      <Text>Type: {job.type}</Text>
      <Text>Company: {job.company}</Text>
      <Text>Location: {job.location}</Text>
      <Text>Date Created: {new Date(job.created_at).toLocaleDateString()}</Text>
      <HTML source={{ html: job.how_to_apply }} contentWidth={contentWidth} />
    </View>
  );
};