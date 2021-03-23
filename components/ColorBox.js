import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ColorBox = ({colorName, hexCode}) => {
  const background = {backgroundColor: hexCode};
  let textColor = {color: 'white'};
  if (colorName === 'Base2' || colorName === 'Base3') {
    textColor.color = 'black';
  }

  return (
    <View style={[styles.box, background]}>
      <Text style={[styles.text, textColor]}>{colorName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    // color: 'white',
    fontWeight: 'bold',
  },
});

export default ColorBox;
