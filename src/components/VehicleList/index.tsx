import React, { FC, useCallback } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";

import { VehicleListItem } from "..";
import { VehicleItemType } from "../../models/entities";
import { Screens, StackNavigationProps } from "../../navigation/screens";

interface VehicleListProps {
  list: VehicleItemType[] | undefined;
}

const VehicleList: FC<VehicleListProps & StackNavigationProps> = ({
  navigation,
  list,
}) => {
  const onItemPress = useCallback((id: number) => {
    navigation.navigate(Screens.DETAIL, {
      id: id,
    });
  }, []);

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
          renderItem={(item) => (
            <VehicleListItem
              key={item.index}
              {...item}
              onItemPress={onItemPress}
            />
          )}
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
