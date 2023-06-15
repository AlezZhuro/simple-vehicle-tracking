import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Colors, Header } from "react-native/Libraries/NewAppScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Mapbox from "@rnmapbox/maps";
import { useTranslation } from "react-i18next";
import { config } from "./config/app.config";
import "./config/i18n.config";
import { LANG_KEY_EN, LANG_KEY_RU } from "./constants";

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    Mapbox.setAccessToken(config.keys.MapBox);
    Mapbox.setTelemetryEnabled(false);
  }, []);

  const { t, i18n } = useTranslation();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const changeLangHandle = () => {
    const currentLang = i18n.language;
    if (currentLang === LANG_KEY_RU) {
      i18n.changeLanguage(LANG_KEY_EN);
      return;
    }
    i18n.changeLanguage(LANG_KEY_RU);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>{`${t("core.appName")}`}</Text>
          <TouchableOpacity onPress={changeLangHandle}>
            <Text>{t('buttons.changeLang')}</Text>
          </TouchableOpacity>

          <Mapbox.MapView style={styles.container} />
    </SafeAreaView>
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
