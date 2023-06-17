import React, { useEffect, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { List, Button, RadioButton } from "react-native-paper";
import { defaultFilterControllsList } from "../../../constants";
import { VehicleCategory, FilterControllBtn } from "../../../models/misc";

interface Props {
  value: number;
  modalVisible: boolean;
  onClose: () => void;
  onApply: (selectedId: number) => void;
  filtersListItems: FilterControllBtn[];
}

const CategoryFilterModal = ({
  value,
  onClose,
  modalVisible,
  onApply,
  filtersListItems,
}: Props) => {
  const { t } = useTranslation();

  const [selectedFilterId, setSelectedFilterId] = useState<number>(0);

  const selectHandler = (value: string) => {
    setSelectedFilterId(+value);
  };

  const applyHandler = () => {
    onApply(selectedFilterId);
  };

  useEffect(() => {
    setSelectedFilterId(value ?? 0);
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      presentationStyle="pageSheet"
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <List.Item
        style={styles.header}
        titleStyle={styles.title}
        title={t("FilterModal.title")}
        right={() => (
          <Button mode="contained" onPress={applyHandler}>
            {t("buttons.apply")}
          </Button>
        )}
        left={() => (
          <Button mode="outlined" onPress={onClose}>
            {t("buttons.cancel")}
          </Button>
        )}
      />

      <RadioButton.Group
        onValueChange={selectHandler}
        value={`${selectedFilterId}`}
      >
        {filtersListItems.map((type) => (
          <RadioButton.Item
            key={type.id}
            label={t(`vehicle.${type.label}`)}
            value={`${type.id}`}
          />
        ))}
      </RadioButton.Group>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  title: { textAlign: "center" },
});

export default CategoryFilterModal;
