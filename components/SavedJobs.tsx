import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export const SavedJobs = () => {
  const [data, setData] = useState({});

  React.useEffect(() => {
    retrieveSavedJobs();
  }, []);

  const retrieveSavedJobs = async () => {
    try {
      const result = await AsyncStorage.getItem("savedJobs");
      if (result !== null) {
        setData(JSON.parse(result));
      }
    } catch (e) {
      console.log("failed to retrieve jobs data");
    }
  };

  const renderItem = ({ item }) => <Item title={data[item].title} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.keys(data)}
        renderItem={renderItem}
        keyExtractor={(item) => data[item].id}
      />
    </SafeAreaView>
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
