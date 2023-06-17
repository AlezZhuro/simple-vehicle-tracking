import { NativeStackNavigationProp } from "@react-navigation/native-stack";

enum Screens {
  HOME = "Home",
  DETAIL = "Detail",
}

type RootStackParamList = {
  Home: undefined;
  Detail: { id: number } | undefined;
};

type StackNavigation = NativeStackNavigationProp<RootStackParamList>;
type StackNavigationProps = {
  navigation: StackNavigation;
};

export { Screens };
export type { RootStackParamList, StackNavigationProps, StackNavigation };
