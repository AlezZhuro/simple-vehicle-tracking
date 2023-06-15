import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, DetailScreen } from "../screens";
import {Screens} from './screens';

const RootStack = createNativeStackNavigator();

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
