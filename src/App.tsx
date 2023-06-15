import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Mapbox from "@rnmapbox/maps";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";

import { config } from "./config/app.config";

import "./config/i18n.config";
import AppNavigation from "./navigation";

function App(): JSX.Element {
  useEffect(() => {
    Mapbox.setAccessToken(config.keys.MapBox);
    Mapbox.setTelemetryEnabled(false);
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigation />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato",
  },
});

export default App;
