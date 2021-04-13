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

  const logCurrentStorage = async () => {
    await AsyncStorage.getAllKeys().then((keyArray) => {
      AsyncStorage.multiGet(keyArray).then((keyValArray) => {
        let myStorage: any = {};
        for (let keyVal of keyValArray) {
          myStorage[keyVal[0]] = keyVal[1];
        }
        console.log("CURRENT STORAGE: ", myStorage);
      });
    });
  };

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
        !response.data.length
          ? setViewState(ViewState.NO_DATA)
          : setViewState(ViewState.SUCCESS);

        setData(response.data);
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
      <View>
        <Button onPress={handleBack} title="Back To Search" buttonStyle={styles.button} />
        {message ? <Text>{message}</Text> : null}
      </View>
    );
  };

  const renderJobsView = (): JSX.Element => {
    switch (viewState) {
      case ViewState.LOADING:
        return <Text>Loading...</Text>;
      case ViewState.ERROR:
        return renderBack("Something went wrong.");
      case ViewState.NO_DATA:
        return renderBack("No jobs found. Blame Covid.");
      case ViewState.SUCCESS:
        return (
          <View>
            {data.length ? (
              <View>
                <SwipeForJobs jobs={data} />
                {renderBack()}
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
            <Button onPress={handleSearch} title="Search" buttonStyle={styles.button} />
          </ScreenContainer>
        );
    }
  };
  return <View>{renderJobsView()}</View>;
};

const styles = StyleSheet.create({
  searchStyling: {
    width: "100%",
    paddingLeft: "20%",
    paddingRight: "20%",
    marginTop: 32,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#841584",
    borderRadius: 15,
    width: "100%",
  }
});
