import React, { FC, useCallback, useMemo, useState } from "react";
import {
  Button as RNButton,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { VehicleItemType } from "../../models/entities";
import { FilterControllBtn, VehicleCategory } from "../../models/misc";
import { useTranslation } from "react-i18next";

import { defaultFilterControllsList } from "../../constants";

import { List, Button, RadioButton } from "react-native-paper";
import { CategoryFilterModal } from "../modal";

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

const filtersListItems = Object.values(VehicleCategory).reduce(
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
  const [modalVisible, setModalVisible] = useState(false);

  const filteredVehicles = useMemo(() => {
    if (!vehicleList?.length) {
      return [];
    }
    if (selectedFilterId === 0) {
      return vehicleList;
    }
    return vehicleList.filter(
      (v) => v.category === filtersListItems[selectedFilterId].label
    );
  }, [selectedFilterId, vehicleList]);

  const viewModeIcon = useMemo(
    () => (!isListMode ? ListViewIcon : MapViewIcon),
    [isListMode]
  );

  const onCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.controllWrapper}>
        {modalVisible && (
          <CategoryFilterModal
            modalVisible={modalVisible}
            onApply={setSelectedFilterId}
            onClose={onCloseModal}
            filtersListItems={filtersListItems}
            value={selectedFilterId}
          />
        )}

        <RNButton
          title={t("FilterModal.title")}
          onPress={() => setModalVisible(true)}
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
  controllWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});

export default VehicleCategoryFilter;
