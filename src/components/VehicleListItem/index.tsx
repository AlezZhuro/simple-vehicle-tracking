import React, { FC } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { VehicleItemType } from "../../models/entities";
import { useTranslation } from "react-i18next";
import { DataTable } from "react-native-paper";

interface Props {
  onItemPress: (id: number) => void;
  item: VehicleItemType;
}

const VehicleItem: FC<Props> = ({ item, onItemPress }) => {
  const { t } = useTranslation();

  const handlePress = () => {
    onItemPress(item.id);
  };

  return (
    <DataTable.Row onPress={handlePress}>
      <DataTable.Cell>TC#{item.id}</DataTable.Cell>
      <DataTable.Cell>{item.driverName}</DataTable.Cell>
      <DataTable.Cell>{t(`vehicle.${item.category}`)}</DataTable.Cell>
    </DataTable.Row>
  );
};

export default React.memo(VehicleItem);
