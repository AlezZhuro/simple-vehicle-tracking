import React from "react";
//@ts-ignorets
import { MapView, MarkerView, Camera } from "@rnmapbox/maps";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { VehicleCategoryType, VehicleItemType } from "../../models/entities";
import { VehicleCategory, VehicleCategoryColor } from "../../models/misc";

const Marker = require("../../assets/pinpoint.png");

type Props = {
  onItemPress: (id: number) => void;
  item: VehicleItemType;
};

const MapMarker = ({
  item: { coordinats, id, category },
  onItemPress,
}: Props) => {
  const pointId = `pointAnnotation#${id}`;
  const coordinate = [coordinats.lat, coordinats.lan];

  const handlePress = () => {
    onItemPress(id);
  };

  return (
    <MarkerView
      key={pointId}
      id={pointId}
      title="Test"
      coordinate={coordinate}
      allowOverlap={true}
      style={styles.marker}
    >
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={Marker}
          style={[styles.markerIcon, styles.marker, styles[category]]}
        />
      </TouchableOpacity>
    </MarkerView>
  );
};

const styles = StyleSheet.create({
  marker: { width: 25, height: 25 },
  markerIcon: {
    resizeMode: "contain",
    tintColor: "red",
  },
  CARGO: {
    tintColor: VehicleCategoryColor.CARGO,
  },
  PASSENGER: {
    tintColor: VehicleCategoryColor.PASSENGER,
  },
  SPECIAL: {
    tintColor: VehicleCategoryColor.SPECIAL,
  },
});

export default MapMarker;
