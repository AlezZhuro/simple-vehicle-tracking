import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

//@ts-ignore
import Mapbox from "@rnmapbox/maps";

import { config } from "./config/app.config";
import AppNavigation from "./navigation";

import "./config/i18n.config";

function App(): JSX.Element {
  useEffect(() => {
    Mapbox.setAccessToken(config.keys.MapBox);
    Mapbox.setTelemetryEnabled(false);
  }, []);

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
