import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { WebView } from "react-native-webview";

type TestWebViewProps = {
  onPress: () => void;
  url: string;
};
export const TestWebView = (props: TestWebViewProps): JSX.Element => {
  const { onPress, url } = props;

  const handleOnPress = () => {
    onPress();
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={() => handleOnPress()}
        title="Return to Jobs"
        color="#841584"
      />
      <WebView source={{ uri: url }} style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
