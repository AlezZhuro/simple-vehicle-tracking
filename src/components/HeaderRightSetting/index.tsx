import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screens, StackNavigation } from "../../navigation/screens";

const SettingIcon = require("../../assets/settings-icon.png");

interface HeaderRightSettingProps {}

const HeaderRightSetting: React.FC<HeaderRightSettingProps> = () => {
  const navigation = useNavigation<StackNavigation>();

  const iconHandler = () => {
    navigation.navigate(Screens.SETTING);
  };

  return (
    <TouchableOpacity style={styles.settingBtn} onPress={iconHandler}>
      <Image resizeMode="contain" style={styles.icon} source={SettingIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingBtn: {
    width: 25,
    height: 25,
  },
  icon: {
    width: "100%",
    height: "100%",
    tintColor: "blue",
  },
});

export default HeaderRightSetting;
