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

enum ViewState {
  LOADING,
  ERROR,
  NO_DATA,
  SUCCESS,
}

export const SearchForJobs = () => {
  const [jobs, onChangeJobs] = useState<string>("");
  const [location, onChangeLocation] = useState<string>("");
  const [data, setData] = useState<Job[]>([]);
  const [viewState, setViewState] = useState<ViewState | null>(null);

  const handleSearch = (): void => {
    setViewState(ViewState.LOADING);
    const url = `https://jobs.github.com/positions.json?description=${jobs}&location=${location}`;
    axios
      .get(url)
      .then((response) => {
        !response.data.length
          ? setViewState(ViewState.NO_DATA)
          : setViewState(ViewState.SUCCESS);

        setData(response.data);
      })
      .catch((error) => {
        setViewState(ViewState.ERROR);
        console.log(error);
      });
  };

  const handleBack = (): void => {
    setViewState(null);
  };

  const renderBack = (message?: string): React.ReactElement => {
    return (
      <View>
        <Button onPress={handleBack} title="Back To Search" color="#841584" />
        {message ? <p>{message}</p> : null}
      </View>
    );
  };

  const renderJobsView = (): React.ReactElement => {
    switch (viewState) {
      case ViewState.LOADING:
        return <p>Loading...</p>;
      case ViewState.ERROR:
        return renderBack("Something went wrong.");
      case ViewState.NO_DATA:
        return renderBack("No jobs found. Blame Covid.");
      case ViewState.SUCCESS:
        return (
          <View>
            <SwipeForJobs jobs={data} />
            {renderBack()}
          </View>
        );
      default:
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
            <Button onPress={handleSearch} title="Search" color="#841584" />
          </SafeAreaView>
        );
    }
  };

  return <View>{renderJobsView()}</View>;
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
