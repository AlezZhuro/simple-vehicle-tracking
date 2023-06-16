import { TFunction } from "i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FilterControllBtn } from "../../models/misc";

interface FilterButtonProps {
  isActive: boolean;
  item: FilterControllBtn;
  tCallback: TFunction;
  onPress: (id: number) => void;
}

const FilterControllButton: React.FC<FilterButtonProps> = ({
  item,
  tCallback: t,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item.id)}
      style={[styles.button, isActive && styles.active]}
    >
      <Text>{t(`vehicle.${item.label}`)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  active: { backgroundColor: "grey" },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    marginRight: 10,
  },
});

export default FilterControllButton;
