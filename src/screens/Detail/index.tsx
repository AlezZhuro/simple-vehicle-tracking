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
import { Loader, MapContainer } from "../../components";
import { VehicleItemType } from "../../models/entities";
import { useTranslation } from "react-i18next";
import {
  Text as CardText,
  Button,
  Card,
  ActivityIndicator,
} from "react-native-paper";

type DetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.DETAIL
>;

const DetailScreen = ({ route, navigation }: DetailScreenProps) => {
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
    <View style={styles.screenContainer}>
      <Card contentStyle={{ padding: 4 }}>
        {isLoading && <Loader />}
        {!isLoading && vehicle && (
          <>
            <Card.Title title={`#${vehicle.id}`} />
            <Card.Content>
              <CardText variant="titleLarge">{vehicle.driverName}</CardText>
              <CardText variant="bodyMedium">{vehicle.driverPhone}</CardText>
              <CardText variant="bodyMedium">
                {t(`DetailScreen.category`)}: {t(`vehicle.${vehicle.category}`)}
              </CardText>
            </Card.Content>
            <View style={styles.mapContainer}>
              <MapContainer
                vehicleList={[vehicle] as VehicleItemType[]}
                navigation={navigation}
                markersClickable={false}
              />
            </View>
            <Card.Actions>
              <Button onPress={sendMessageHandle}>
                {t(`buttons.message`)}
              </Button>
              <Button onPress={makePhoneHandle}>{t(`buttons.call`)}</Button>
            </Card.Actions>
          </>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1, padding: 10 },
  mapContainer: {
    width: "100%",
    height: 300,
    overflow: "hidden",
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default DetailScreen;
