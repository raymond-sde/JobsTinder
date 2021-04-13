import * as React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import { useRenderedJobsData } from "../hooks/useStorageJobs";
import { JobStatus } from "./JobStatus";
import { useIsFocused } from "@react-navigation/native";

const Item = ({ title }: { title: string }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

type SavedOrRejectedJobsProps = {
  jobStatus: JobStatus;
};

export const SavedOrRejectedJobs = (props: SavedOrRejectedJobsProps) => {
  const { jobStatus } = props;
  const isFocused = useIsFocused();
  const { storageJob } = useRenderedJobsData([], jobStatus, isFocused, true);
  const storageJobsKeys = Object.keys(storageJob);

  const renderItem = ({ item }: { item: string }): JSX.Element => (
    <Item title={storageJob[item].title} />
  );

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
  title: {
    fontSize: 32,
  },
});
