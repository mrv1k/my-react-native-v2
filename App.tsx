import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import ColorPalette from './screens/ColorPalette';
import AddNewPaletteModal from './screens/AddNewPaletteModal';
import {Color, Palette} from './shared/types';

// navigation.navigate('Home', {newPalette});
// AddNewPaletteModal: undefined;
type RootStackParamList = {
  Main: undefined;
  AddNewPalette: undefined;
};
type MainStackParamList = {
  Home: {newPalette: Palette | undefined};
  // data={params.route.params.colors}
  // <Text style={styles.heading}>{params.route.params.paletteName}</Text>
  ColorPalette: {paletteName: string; colors: Color[]};
};
const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

type Props = {
  route: RouteProp<RootStackParamList, 'Main'>;
};
// function ProfileScreen({ route, navigation }: Props) {
//   // ...
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainStackScreen = ({route}: Props) => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({route: {params}}) => ({title: params.paletteName})}
      />
    </MainStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen name="AddNewPalette" component={AddNewPaletteModal} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
