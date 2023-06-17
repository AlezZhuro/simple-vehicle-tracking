import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
//@ts-ignorets
import { MapView, Camera } from "@rnmapbox/maps";

import { VehicleItemType } from "../../models/entities";
import MapMarker from "../MapMarker";
import { Screens, StackNavigationProps } from "../../navigation/screens";

interface MapContainerProps {
  vehicleList: VehicleItemType[] | undefined;
  markersClickable?: boolean;
}

const MapContainer: FC<MapContainerProps & StackNavigationProps> = ({
  vehicleList,
  navigation,
  markersClickable = true,
}) => {
  let _map = useRef<MapView>(null);
  const camera = useRef<Camera>(null);

  const [currentList, setCurrentList] = useState<VehicleItemType[]>([]);

  const onItemPress = useCallback((id: number) => {
    markersClickable &&
      navigation.navigate(Screens.DETAIL, {
        id: id,
      });
  }, []);

  useEffect(() => vehicleList && setCurrentList(vehicleList), [vehicleList]);

  useEffect(() => {
    const getMaxMin = (arr: number[]) => {
      return {
        max: Math.max(...arr),
        min: Math.min(...arr),
      };
    };

    const getFitBoundsList = (list: VehicleItemType[] | undefined) => {
      if (!list?.length) {
        return [];
      }

      if (list.length === 1) {
        return [[list[0].coordinats.lan, list[0].coordinats.lat]];
      }

      const lat = getMaxMin([...list.map((v) => v.coordinats.lat)]);
      const lang = getMaxMin([...list.map((v) => v.coordinats.lan)]);

      return [
        [lang.max, lat.max], //ne
        [lang.min, lat.min], //sw
        0, //padding
        1000, //animDuration
      ];
    };

    const fitBoundsArgs = getFitBoundsList(currentList);

    fitBoundsArgs && camera.current?.fitBounds(...fitBoundsArgs);
  }, [currentList]);

  useEffect(() =>{
    camera.current && markersClickable && vehicleList && camera.current?.moveTo([
      vehicleList[0].coordinats.lan,
      vehicleList[0].coordinats.lat,], 200);
  },[vehicleList, markersClickable, camera])

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        compassEnabled={false}
        logoEnabled={false}
        scaleBarEnabled={false}
        attributionEnabled={false}
        style={styles.mapContainer}
      >
        <Camera ref={camera} />
        {vehicleList?.map((v) => (
          <MapMarker item={v} onItemPress={onItemPress} key={v.id} />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  mapContainer: {
    flex: 1,
  },
});

export default MapContainer;
