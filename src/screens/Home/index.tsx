import Mapbox from "@rnmapbox/maps";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LANG_KEY_RU, LANG_KEY_EN } from "../../constants";
import { Screens, StackNavigationProps } from "../../navigation/screens";
import { useFetchMockData } from "../../hooks/useFetchMockData";
import { useEffect } from "react";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps & StackNavigationProps> = ({
  navigation,
}) => {
  const { data, isLoading, fetch } = useFetchMockData();

  const { t, i18n } = useTranslation();

  const changeLangHandle = () => {
    const currentLang = i18n.language;
    if (currentLang === LANG_KEY_RU) {
      i18n.changeLanguage(LANG_KEY_EN);
      return;
    }
    i18n.changeLanguage(LANG_KEY_RU);
  };

  const itemClickHandle = () => {
    navigation.navigate(Screens.DETAIL);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Text>{`${t("core.appName")}`}</Text>

      <TouchableOpacity onPress={changeLangHandle}>
        <Text>{t("buttons.changeLang")}</Text>
      </TouchableOpacity>
      <Mapbox.MapView style={styles.mapContainer} />
      <TouchableOpacity onPress={itemClickHandle}>
        <Text>Goto</Text>
      </TouchableOpacity>
      {isLoading && <Text>Loading</Text>}
      {data && <Text>{JSON.stringify(data, null, 2)}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1 },
  mapContainer: {
    height: 300,
    width: 300,
    backgroundColor: "tomato",
  },
});

export default HomeScreen;
