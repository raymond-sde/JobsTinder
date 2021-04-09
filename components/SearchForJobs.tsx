import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  View,
} from "react-native";
import axios from "axios";
import { Job } from "./Job";
import { SwipeForJobs } from "./SwipeForJobs/SwipeForJobs";

export const SearchForJobs = () => {
  const [jobs, onChangeJobs] = useState<string>("");
  const [location, onChangeLocation] = useState<string>("");
  const [data, setData] = useState<Job[]>([]);
  const [isSubmitted, onChangeSubmit] = useState<boolean>(false);

  const handleSearch = (): void => {
    const url = `https://jobs.github.com/positions.json?description=${jobs}&location=${location}`;
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        onChangeSubmit(true);
      })
      .catch((error) => console.log(error));
  };

  const handleBack = (): void => {
    onChangeSubmit(false);
  };

  return (
    <View>
      {isSubmitted ? (
        <View>
          <SwipeForJobs jobs={data} />
          <Button onPress={handleBack} title="Back To Search" color="#841584" />
        </View>
      ) : (
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeJobs}
            value={jobs}
            placeholder="Search Jobs"
          />
          <TextInput />
          <TextInput
            style={styles.input}
            onChangeText={onChangeLocation}
            value={location}
            placeholder="Location"
          />
          <TextInput />
          <Button onPress={handleSearch} title="Search" color="#841584" />
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
