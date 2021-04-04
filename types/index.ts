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

// going up from AddNew modal to Home screen
export type AddNewPaletteNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Home'
>;

export type HomeRouteProp = RouteProp<MainStackParamList, 'Home'>;

type HomeNavigationPropAddNewPalette = StackNavigationProp<
  RootStackParamList,
  'AddNewPalette'
>;
type HomeNavigationPropColorPalette = StackNavigationProp<
  MainStackParamList,
  'ColorPalette'
>;

export type HomeNavigationProp = HomeNavigationPropAddNewPalette &
  HomeNavigationPropColorPalette;
