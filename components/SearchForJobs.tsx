import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Text,
} from "react-native";
import axios from "axios";
import { Job } from "./Job";
import { SwipeForJobs } from "./SwipeForJobs/SwipeForJobs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from 'react-native-elements';
import { NavigationContainer } from "@react-navigation/native";
import { ScreenContainer } from "react-native-screens";
import { Message } from "./Message";

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

  const clearCurrentStorage = async () => {
    await AsyncStorage.clear().then(() => {
      console.log("Storage Cleared");
    });
  };

  const handleSearch = (): void => {
    setViewState(ViewState.LOADING);
    const url = `https://jobs.github.com/positions.json?description=${jobs}&location=${location}`;
    axios
      .get(url)
      .then((response) => {
        setData(response.data);

        !response.data.length
          ? setViewState(ViewState.NO_DATA)
          : setViewState(ViewState.SUCCESS);

        onChangeJobs("");
        onChangeLocation("");
      })
      .catch((error) => {
        setViewState(ViewState.ERROR);
        onChangeJobs("");
        onChangeLocation("");
        console.log(error);
      });
  };

  const handleBack = (): void => {
    setViewState(null);
  };

  const renderBack = (message?: string): JSX.Element => {
    return (
      <View style={styles.buttonContainer}>
        {message ? <Message message={message} /> : null}
        <Button onPress={handleBack} title="Back To Search" buttonStyle={styles.backButton} />
      </View>
    );
  };

  const renderJobsView = (): JSX.Element => {
    switch (viewState) {
      case ViewState.LOADING:
        return <Message message="Loading..." />;
      case ViewState.ERROR:
        return renderBack("Something went wrong.");
      case ViewState.NO_DATA:
        return renderBack("No jobs found. Blame Covid.");
      case ViewState.SUCCESS:
        return (
          <View>
            {data.length ? (
              <View>
                <View>
                  <SwipeForJobs jobs={data} />
                </View>
                <View>
                  {renderBack()}
                </View>
              </View>
            ) : null}
          </View>
        );
      default:
        return (
          <ScreenContainer style={styles.searchStyling}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeJobs}
              value={jobs}
              placeholder="Search Jobs"
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeLocation}
              value={location}
              placeholder="Location"
            />
            <Button onPress={handleSearch} title="Search" buttonStyle={styles.searchButton} />
          </ScreenContainer>
        );
    }
  };
  return (
    <View style={styles.container}>
      <View>
        {renderJobsView()}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={clearCurrentStorage}
          title="Clear Storage"
          buttonStyle={styles.clearButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "gold",
  },
  searchStyling: {
    width: "100%",
    paddingLeft: "20%",
    paddingRight: "20%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: "#841584",
    borderRadius: 15,
    width: "100%",
  },
  buttonContainer: {
    paddingLeft: "20%",
    paddingRight: "20%",
  },
  clearButton: {
    backgroundColor: "#841584",
    borderRadius: 15,
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#841584",
    borderRadius: 15,
    marginTop: 20,
  },
});
