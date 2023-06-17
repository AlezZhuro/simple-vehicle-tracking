import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator animating={true} size={"large"} color={"red"} />
    </View>
  );
};

export default Loader;
