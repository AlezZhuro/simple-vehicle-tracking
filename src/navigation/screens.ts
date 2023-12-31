import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

enum Screens {
  HOME = "Home",
  DETAIL = "Detail",
  SETTING = "Setting",
}

type RootStackParamList = {
  Home: undefined;
  Setting: undefined;
  Detail: { id: number } | undefined;
};

type StackNavigation = NativeStackNavigationProp<RootStackParamList>;
type StackNavigationProps = {
  navigation: StackNavigation;
};

export { Screens };
export type { RootStackParamList, StackNavigationProps, StackNavigation };
