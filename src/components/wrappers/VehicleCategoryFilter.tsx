import React, { FC, useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { VehicleItemType } from "../../models/entities";
import { FilterControllBtn, VehicleCategory } from "../../models/misc";
import { useTranslation } from "react-i18next";
import { FilterControllButton } from "..";
import { defaultFilterControllsList } from "../../constants";

const MapViewIcon = require("../../assets/map-icon.png");
const ListViewIcon = require("../../assets/list-icon.png");

interface VehicleCategoryControllsProps {
  vehicleList: VehicleItemType[] | undefined;
  isListMode: boolean;
  changeModeHandler: () => void;
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
  isListMode,
  changeModeHandler,
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

  const viewModeIcon = useMemo(
    () => (isListMode ? ListViewIcon : MapViewIcon),
    [isListMode]
  );

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
        <TouchableOpacity style={styles.modeSwitch} onPress={changeModeHandler}>
          <View style={styles.switchBtn}>
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={viewModeIcon}
            />
          </View>
        </TouchableOpacity>
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
  buttonRow: { width: "85%", padding: 10 },
  modeSwitch: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  switchBtn: {
    width: 30,
    height: 30,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
});

export default VehicleCategoryFilter;
