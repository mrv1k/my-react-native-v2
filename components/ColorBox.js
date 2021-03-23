import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ColorBox = ({hexCode, colorName}) => {
  const background = {backgroundColor: hexCode};

  return (
    <View style={[styles.box, background]}>
      <Text style={styles.text}>{colorName}</Text>
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
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ColorBox;
