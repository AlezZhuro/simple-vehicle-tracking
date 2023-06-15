import React, { FC } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { VehicleListItem } from "..";
import { VehicleItemType } from "../../models/entities";

interface VehicleListProps {
  list: VehicleItemType[] | undefined;
}

const VehicleList: FC<VehicleListProps> = ({ list }) => {
  return (
    <View style={styles.listWrapper}>
      {!list?.length && (
        <View style={styles.empty}>
          <Text>Empty list...</Text>
        </View>
      )}
      {!!list?.length && (
        <FlatList
          data={list}
          renderItem={(item) => <VehicleListItem {...item} />}
          keyExtractor={(item) => `${item.id}`}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listWrapper: { flex: 1 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default VehicleList;
