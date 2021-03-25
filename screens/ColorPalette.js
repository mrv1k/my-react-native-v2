import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = (params) => (
  <View style={styles.container}>
    <FlatList
      data={params.route.params.colors}
      renderItem={({item}) => (
        <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
      )}
      keyExtractor={(item) => item.hexCode}
      ListHeaderComponent={
        <Text style={styles.heading}>{params.route.params.paletteName}</Text>
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
