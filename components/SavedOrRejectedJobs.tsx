import React, { useState } from "react";
import { Linking } from "react-native";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
} from "react-native";

import { useRenderedJobsData } from "../hooks/useStorageJobs";
import { JobStatus } from "./JobStatus";
import { useIsFocused } from "@react-navigation/native";
import { TestWebView } from "./TestWebView";
import { Job } from "./Job";

type SavedOrRejectedJobsProps = {
  jobStatus: JobStatus;
};

export const SavedOrRejectedJobs = (props: SavedOrRejectedJobsProps) => {
  const [url, setUrl] = useState<string>("");
  const { jobStatus } = props;
  const isFocused = useIsFocused();
  const { storageJob } = useRenderedJobsData([], jobStatus, isFocused, true);
  const storageJobsKeys = Object.keys(storageJob);

  const Item = ({ item }: { item: Job }): JSX.Element => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Button onPress={() => setUrl(item.url)} title="Apply" color="#841584" />
    </View>
  );

  const renderItem = ({ item }: { item: string }): JSX.Element => (
    <Item item={storageJob[item]} />
  );

  const renderFlatList = (): JSX.Element => {
    return storageJobsKeys.length ? (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={storageJobsKeys}
          renderItem={renderItem}
          keyExtractor={(item) => storageJob[item].id}
        />
      </SafeAreaView>
    ) : (
      <Text>Nothing Saved Yet</Text>
    );
  };

  const handleOnPress = (): void => {
    setUrl("");
  };

  return url === "" ? (
    renderFlatList()
  ) : (
    <TestWebView onPress={handleOnPress} url={url} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  button: {
    margin: 10,
    backgroundColor: "#356bca",
    borderRadius: 5,
    padding: 10,
  },
  title: {
    fontSize: 32,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});
