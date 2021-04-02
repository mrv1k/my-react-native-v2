import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
export interface Color {
  colorName: string;
  hexCode: string;
}
export interface Palette {
  paletteName: string;
  id: number;
  colors: Color[];
}

export type MainStackParamList = {
  Home: {newPalette: Palette | undefined};
  ColorPalette: {paletteName: string; colors: Color[]};
};
export type RootStackParamList = {
  Main: undefined;
  AddNewPalette: undefined;
};

export type ColorPaletteRouteProp = RouteProp<
  MainStackParamList,
  'ColorPalette'
>;

// ? Doesn't feel right but works /shrug
export type AddNewPaletteNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Home'
>;

// import {CompositeNavigationProp} from '@react-navigation/native';
// export type RootScreenNavigationProp = CompositeNavigationProp<
//   StackNavigationProp<MainStackParamList, 'Home'>,
//   StackNavigationProp<AddNewPaletteStackParamList>
// >;
