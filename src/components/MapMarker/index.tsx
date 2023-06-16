import React from "react";
//@ts-ignorets
import { MapView, MarkerView, Camera } from "@rnmapbox/maps";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { VehicleCategoryType, VehicleItemType } from "../../models/entities";
import { VehicleCategory, VehicleCategoryColor } from "../../models/misc";

const Marker = require("../../assets/pinpoint.png");

const MapMarker = ({ coordinats, id, category }: VehicleItemType) => {
  const pointId = `pointAnnotation#${id}`;
  const coordinate = [coordinats.lat, coordinats.lan];

  return (
    <MarkerView
      key={pointId}
      id={pointId}
      title="Test"
      coordinate={coordinate}
      allowOverlap={true}
      style={styles.marker}
    >
      <TouchableOpacity
        onPress={() => {
          console.log("click");
        }}
      >
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
