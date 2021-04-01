import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import ColorPalette from './screens/ColorPalette';
import AddNewPaletteModal from './screens/AddNewPaletteModal';
import {RootStackParamList, MainStackParamList} from './types';

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

const MainStackScreen = () => {
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
