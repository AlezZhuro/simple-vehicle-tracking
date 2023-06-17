import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList, Screens, StackNavigation } from "./screens";
import { HomeScreen, DetailScreen, SettingModal } from "../screens";
import { HeaderRightSetting } from "../components";
import { useTranslation } from "react-i18next";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerTitle(props) {
            return (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                }}
              >
                {t(`${props.children}Screen.title`)}
              </Text>
            );
          },
        }}
      >
        <RootStack.Group
          screenOptions={{
            headerRight: () => <HeaderRightSetting />,
          }}
        >
          <RootStack.Screen name={Screens.HOME} component={HomeScreen} />
          <RootStack.Screen
            name={Screens.DETAIL}
            component={DetailScreen}
            options={{}}
          />
        </RootStack.Group>

        <RootStack.Group
          screenOptions={{
            presentation: "modal",
          }}
        >
          <RootStack.Screen name={Screens.SETTING} component={SettingModal} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
