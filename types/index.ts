import {RouteProp} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';
export interface Color {
  colorName: string;
  hexCode: string;
}
export interface Palette {
  paletteName: string;
  id: number;
  colors: Color[];
}

// navigation.navigate('Home', {newPalette});
// AddNewPaletteModal: undefined;
export type RootStackParamList = {
  Main: undefined;
  AddNewPalette: undefined;
};
export type MainStackParamList = {
  Home: {newPalette: Palette | undefined};
  // data={params.route.params.colors}
  // <Text style={styles.heading}>{params.route.params.paletteName}</Text>
  ColorPalette: {paletteName: string; colors: Color[]};
};

export type ColorPaletteRouteProp = RouteProp<
  MainStackParamList,
  'ColorPalette'
>;
