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

export default App;
