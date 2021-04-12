import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const retrieveSavedJobs = async () => {
  let obj = {};
  await AsyncStorage.getItem("savedJobs", async (err, result) => {
    obj = JSON.parse(result);
    // if (result !== null) {
    //   console.log("Data Found");
    //   obj = JSON.parse(result);
    // } else {
    //   console.log("Data Not Found");
    // }
    // obj[jobs[index].id] = jobs[index];
    // await AsyncStorage.setItem("savedJobs", JSON.stringify(obj));
    return obj;
  });
};
const savedJobs = () => {
  return retrieveSavedJobs()
};

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export const SavedJobs = () => {
  // return (
  //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //     <Text>Saved Jobs!</Text>
  //   </View>
  // );
  const renderItem = ({ item }) => <Item title={item.id} />;
  retrieveSavedJobs();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        // data={DATA}
        // renderItem={renderItem}
        // keyExtractor={(item) => item.id}
        data={Object.keys(savedJobs)}
        renderItem={({ item }) => <Text>{savedJobs[item].name}</Text>}
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
