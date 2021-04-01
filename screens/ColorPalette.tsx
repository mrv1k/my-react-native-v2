import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import ColorBox from '../components/ColorBox';
import {ColorPaletteRouteProp} from '../types';

interface ColorPaletteProps {
  route: ColorPaletteRouteProp;
}
const ColorPalette = ({route}: ColorPaletteProps) => (
  <View style={styles.container}>
    <FlatList
      data={route.params.colors}
      renderItem={({item}) => (
        <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
      )}
      keyExtractor={(item) => item.hexCode}
      ListHeaderComponent={
        <Text style={styles.heading}>{route.params.paletteName}</Text>
      }
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ColorPalette;
