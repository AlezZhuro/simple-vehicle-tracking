import React, { FC, useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { VehicleItemType } from "../../models/entities";
import { FilterControllBtn, VehicleCategory } from "../../models/misc";
import { useTranslation } from "react-i18next";
import { FilterControllButton } from "..";
import { defaultFilterControllsList } from "../../constants";

interface VehicleCategoryControllsProps {
  vehicleList: VehicleItemType[] | undefined;
  children: (ctx: {
    filteredVehicles: VehicleItemType[];
  }) => React.ReactElement;
}

const controlsList = Object.values(VehicleCategory).reduce(
  (acc, item, index) => {
    acc.push({
      id: index + 1,
      label: item,
    });

    return acc;
  },
  defaultFilterControllsList as FilterControllBtn[]
);

const VehicleCategoryFilter: FC<VehicleCategoryControllsProps> = ({
  vehicleList,
  children,
}) => {
  const { t } = useTranslation();
  const [selectedFilterId, setSelectedFilterId] = useState<number>(0);

  const renderItem = useCallback(
    ({ item }: { item: FilterControllBtn }) => (
      <FilterControllButton
        key={item.id}
        item={item}
        tCallback={t}
        onPress={setSelectedFilterId}
        isActive={selectedFilterId === item.id}
      />
    ),
    [selectedFilterId]
  );

  const filteredVehicles = useMemo(() => {
    if (!vehicleList?.length) {
      return [];
    }
    if (selectedFilterId === 0) {
      return vehicleList;
    }
    return vehicleList.filter(
      (v) => v.category === controlsList[selectedFilterId].label
    );
  }, [selectedFilterId, vehicleList]);

  return (
    <View style={styles.container}>
      <View style={styles.controllWrapper}>
        <FlatList
          style={styles.buttonRow}
          data={controlsList}
          renderItem={renderItem}
          horizontal
          keyExtractor={(item) => `${item.id}`}
          extraData={selectedFilterId}
        />
        <View
          style={styles.modeSwitch}
        >
          <Text>M/L</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>{children({ filteredVehicles })}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controllWrapper: { width: "100%", flexDirection: "row" },
  buttonRow:{ width: "80%", padding: 10 },
  modeSwitch:{
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default VehicleCategoryFilter;
