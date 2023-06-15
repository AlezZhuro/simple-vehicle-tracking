import React, { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { VehicleItemType } from "../../models/entities";

const VehicleItem: FC<{ item: VehicleItemType }> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.rowContainer}>
      <Text style={[styles.id, styles.commonText]}>TC#{item.id}</Text>
      <Text style={[styles.name, styles.commonText]}>
        {item.driverName}
        {item.driverName}
      </Text>
      <Text style={[styles.category, styles.commonText]}>{item.category}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  id: { flex: 2, flexWrap: "wrap" },
  name: { flex: 4, flexWrap: "wrap" },
  category: { flex: 2, flexWrap: "wrap" },
  commonText: { borderWidth: 1, borderColor: "red" },
});

export default React.memo(VehicleItem);
