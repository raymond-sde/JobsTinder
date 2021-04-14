import React, { useState } from "react";
import { TextInput, View, Text, Platform } from "react-native";
import axios from "axios";
import { Job } from "../Job";
import { SwipeForJobs } from "../SwipeForJobs/SwipeForJobs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";
import { ScreenContainer } from "react-native-screens";
import { Message } from "../Message";
import { styles } from "./styles";

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
  const [clearBtnText, setClearBtnText] = useState<string>("Clear Storage");

  const renderStorageSuccessOrFail = (success: boolean): void => {
    if (success) {
      setClearBtnText("Storage Cleared!");
      setTimeout(() => {
        setClearBtnText("Clear Storage");
      }, 1500);
      console.log("Storage Cleared!");
    } else {
      setClearBtnText("Clear Failed!");
      setTimeout(() => {
        setClearBtnText("Clear Storage");
      }, 1500);
    }
  };

  const clearCurrentStorage = async () => {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    try {
      if (Platform.OS === "android" || Platform.OS === "web") {
        await AsyncStorage.clear();
        renderStorageSuccessOrFail(true);
      }
      if (Platform.OS === "ios") {
        await AsyncStorage.multiRemove(asyncStorageKeys);
        renderStorageSuccessOrFail(true);
      }
    } catch (error) {
      renderStorageSuccessOrFail(false);
      console.log(error);
    }
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
      <View style={styles.bottomContainer}>
        {message ? <Message message={message} /> : null}
        <Button
          onPress={handleBack}
          title="Back To Search"
          buttonStyle={styles.backButton}
        />
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
        return data.length ? (
          <View style={styles.swiperContainer}>
            <View style={styles.topContainer}>
              <Text style={styles.header}>Jobs Tinder</Text>
            </View>
            <SwipeForJobs jobs={data} />
            {renderBack()}
          </View>
        ) : (
          <></>
        );
      default:
        return (
          <ScreenContainer style={styles.searchStyling}>
            <View style={styles.topContainer}>
              <Text style={styles.header}>Jobs Tinder</Text>
            </View>
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
            <Button
              onPress={handleSearch}
              title="Search"
              buttonStyle={styles.searchButton}
            />
            <Button
              onPress={clearCurrentStorage}
              title={clearBtnText}
              buttonStyle={styles.clearButton}
            />
          </ScreenContainer>
        );
    }
  };
  return <View style={styles.container}>{renderJobsView()}</View>;
};
