import * as React from "react";
import { useEffect, useState } from "react";
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

import { useRetrieveSavedOrRejectedJobs } from "../hooks/useStorageJobs";
import { JobStatus } from "./JobStatus";
import { StorageJob } from "./StorageJob";
import { TestWebView } from "./TestWebView";

type SavedOrRejectedJobsProps = {
  jobStatus: JobStatus;
};

export const SavedOrRejectedJobs = (props: SavedOrRejectedJobsProps) => {
  const [pressed, setPressed] = useState<string>("");
  const { jobStatus } = props;
  const data: StorageJob = useRetrieveSavedOrRejectedJobs(jobStatus);
  const storageJobsKeys = Object.keys(data);

  const Item = ({ item }: { item: string }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text
        style={{ color: "blue" }}
        onPress={() => Linking.openURL("http://google.com")}
      >
        Google
      </Text>
      <Button
        onPress={() => setPressed(item.url)}
        title="Apply"
        color="#841584"
      />
    </View>
  );

  const renderItem = ({ item }: { item: string }): JSX.Element => (
    <Item item={data[item]} />
  );
  
  const renderFlatList = () => {
    return storageJobsKeys.length ? (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={storageJobsKeys}
          renderItem={renderItem}
          keyExtractor={(item) => data[item].id}
        />
      </SafeAreaView>
    ) : (
      <Text>Nothing Saved Yet</Text>
    );
  }

  return pressed === "" ? (
    renderFlatList()
  ) : (
    <TestWebView onPress={setPressed} pressed={pressed}/>
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
