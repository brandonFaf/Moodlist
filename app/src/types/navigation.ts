import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Mood: undefined;
  Create: undefined;
  List: undefined;
};

export interface NavigationProps<T extends keyof RootStackParamList> {
  navigation: StackNavigationProp<RootStackParamList, T>;
}
