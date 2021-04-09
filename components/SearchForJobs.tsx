import React, { useState } from "react";
import { SafeAreaView, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export const SearchForJobs = () => {
  const [jobs, onChangeJobs] = useState("");
  const [location, onChangeLocation] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = () => {
    const url = `https://jobs.github.com/positions.json?description=${jobs}&location=${location}`;
    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.log(error));
  }

  return (
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
      <Button
        onPress={handleSearch}
        title="Search"
        color="#841584"
      />
      {/* placeholder, replace it with Card component */}
      {data.map((job, i) => <TextInput key={i} value={job["title"]} />)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1
  }
});
