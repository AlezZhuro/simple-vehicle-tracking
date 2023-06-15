import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Mapbox from "@rnmapbox/maps";

import { VehicleList } from "../../components";
import { useFetchMockData } from "../../hooks/useFetchMockData";
import { StackNavigationProps } from "../../navigation/screens";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps & StackNavigationProps> = ({
  navigation,
}) => {
  const { data, isLoading, fetch } = useFetchMockData();

  const [isListMode, setIsListMode] = useState<boolean>(true);

  // TODO: move late to modal with settings;

  //   const changeLangHandle = () => {
  //     const currentLang = i18n.language;
  //     if (currentLang === LANG_KEY_RU) {
  //       i18n.changeLanguage(LANG_KEY_EN);
  //       return;
  //     }
  //     i18n.changeLanguage(LANG_KEY_RU);
  //   };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      style={styles.screenContainer}
    >
      <View style={styles.screenContainer}>
        {!isListMode && <Mapbox.MapView style={styles.mapContainer} />}
        {isListMode && <VehicleList list={data} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentWrapper: {},
  mapContainer: {
    flex: 1,
  },
});

export default HomeScreen;
