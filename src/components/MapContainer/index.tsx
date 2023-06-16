import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
//@ts-ignorets
import { MapView, MarkerView, Camera } from "@rnmapbox/maps";

import { VehicleItemType } from "../../models/entities";
const Marker = require("../../assets/pinpoint.png");

interface MapContainerProps {
  vehicleList: VehicleItemType[] | undefined;
}

const MapContainer: FC<MapContainerProps> = ({ vehicleList }) => {
  let _map = useRef<MapView>(null);
  const camera = useRef<Camera>(null);

  const [currentList, setCurrentList] = useState<VehicleItemType[]>([]);

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
          <MapMarker key={v.id} {...v} />
        ))}
      </MapView>
    </View>
  );
};

const MapMarker = ({ coordinats, id }: VehicleItemType) => {
  const pointId = `pointAnnotation#${id}`;
  const coordinate = [coordinats.lat, coordinats.lan];

  return (
    <MarkerView
      key={pointId}
      id={pointId}
      title="Test"
      coordinate={coordinate}
      allowOverlap={true}
      style={{ width: 25, height: 25 }}
    >
      <TouchableOpacity
        onPress={() => {
          console.log("click");
        }}
      >
        <Image
          source={Marker}
          style={{
            flex: 1,
            resizeMode: "contain",
            width: 25,
            height: 25,
            tintColor: "red",
            backgroundColor: "black",
          }}
        />
      </TouchableOpacity>
    </MarkerView>
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
