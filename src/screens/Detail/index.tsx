import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Share,
  Linking,
} from "react-native";
import {
  RootStackParamList,
  Screens,
  StackNavigationProps,
} from "../../navigation/screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFetchMockData } from "../../hooks/useFetchMockData";
import { MapContainer } from "../../components";
import { VehicleItemType } from "../../models/entities";
import { useTranslation } from "react-i18next";

type ProfileScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  Screens.DETAIL
>;
type DetailScreenProps = {} & ProfileScreenRouteProp & StackNavigationProps;

const DetailScreen: React.FC<DetailScreenProps> = ({ route, navigation }) => {
  const { data, isLoading, fetch } = useFetchMockData();
  const vehicle = data && data[0];

  const { t } = useTranslation();

  const sendMessageHandle = () => {
    Linking.openURL(`tel:${vehicle?.driverPhone}`);
  };

  const makePhoneHandle = () => {
    Linking.openURL(`whatsapp://send?phone=${vehicle?.driverPhone}`);
  };

  useLayoutEffect(() => {
    route.params?.id && fetch(route.params?.id);
  }, [route]);

  return (
    <ScrollView style={styles.screenContainer}>
      {vehicle && (
        <View style={styles.contentWrapper}>
          <View style={styles.infoBlock}>
            <Text>
              {t(`DetailScreen.category`)}: {t(`vehicle.${vehicle.category}`)}
            </Text>
            <Text>{vehicle.driverName}</Text>
            <Text>{vehicle.driverPhone}</Text>
          </View>
          <View style={styles.btnBlock}>
            <TouchableOpacity style={styles.btn} onPress={makePhoneHandle}>
              <Text style={styles.btnText}>{t(`buttons.call`)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={sendMessageHandle}>
              <Text style={styles.btnText}>{t(`buttons.message`)}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mapContainer}>
            <MapContainer
              vehicleList={[vehicle] as VehicleItemType[]}
              navigation={navigation}
              markersClickable={false}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1, padding: 10 },
  contentWrapper: {
    flex: 1,
    gap: 10,
  },
  infoBlock: {
    gap: 10,
  },
  btnBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  btn: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    minHeight: 30,
    backgroundColor: "#544ae8",
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
  },
  mapContainer: {
    width: "100%",
    height: 300,
  },
});

export default DetailScreen;
