import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList, Screens, StackNavigation } from "./screens";
import { HomeScreen, DetailScreen } from "../screens";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name={Screens.HOME} component={HomeScreen} />
        <RootStack.Screen name={Screens.DETAIL} component={DetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
