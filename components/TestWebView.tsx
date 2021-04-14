import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
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
      <WebView source={{ uri: url }} style={{ marginTop: 20 }} />
      <Button
        onPress={() => handleOnPress()}
        title="Return to Jobs"
        buttonStyle={styles.returnButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  returnButton: {
    backgroundColor: "#841584",
    borderRadius: 0,
    width: "100%",
  },
});
