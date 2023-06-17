import React, { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { VehicleItemType } from "../../models/entities";

interface Props {
  onItemPress: (id: number) => void;
  item: VehicleItemType;
}

const VehicleItem: FC<Props> = ({ item, onItemPress }) => {
  const handlePress = () => {
    onItemPress(item.id);
  };

  return (
    <TouchableOpacity style={styles.rowContainer} onPress={handlePress}>
      <Text style={[styles.id, styles.commonText]}>TC#{item.id}</Text>
      <Text style={[styles.name, styles.commonText]}>{item.driverName}</Text>
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
    padding: 4,
    borderWidth: 1,
    borderColor: "black",
  },
  id: { flex: 2, flexWrap: "wrap" },
  name: { flex: 4, flexWrap: "wrap" },
  category: { flex: 2, flexWrap: "wrap" },
  commonText: { borderWidth: 1, borderColor: "red" },
});

export default React.memo(VehicleItem);
