import React from "react";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  MapContainer,
  VehicleCategoryFilter,
  VehicleList,
} from "../../components";
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

  const changeModeHandler = useCallback(() => {
    setIsListMode((prev) => !prev);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      style={styles.screenContainer}
    >
      <VehicleCategoryFilter
        vehicleList={data}
        isListMode={isListMode}
        changeModeHandler={changeModeHandler}
      >
        {({ filteredVehicles }) => {
          return (
            <View style={styles.contentWrapper}>
              {!isListMode && <MapContainer navigation={navigation} vehicleList={filteredVehicles} />}
              {isListMode && <VehicleList navigation={navigation} list={filteredVehicles} />}
            </View>
          );
        }}
      </VehicleCategoryFilter>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
  mapContainer: {
    flex: 1,
  },
});

export default HomeScreen;
