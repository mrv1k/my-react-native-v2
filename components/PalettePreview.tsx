import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Color {
  colorName: string;
  hexCode: string;
}
interface ColorPalette {
  paletteName: string;
  id: number;
  colors: Color[];
}

const PalettePreview: React.FC<{
  handleOnPress: () => {};
  colorPalette: ColorPalette;
}> = ({handleOnPress, colorPalette}) => {
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Text style={styles.text}>{colorPalette.paletteName}</Text>
      <FlatList
        style={styles.list}
        data={colorPalette.colors.slice(0, 5)}
        keyExtractor={(item) => item.colorName}
        renderItem={({item}) => (
          <View style={[styles.box, {backgroundColor: item.hexCode}]} />
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  box: {
    width: 30,
    height: 30,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  list: {
    marginBottom: 20,
    flexDirection: 'row',
  },
});

export default PalettePreview;
