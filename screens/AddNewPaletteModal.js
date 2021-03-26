import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Switch, Text, View} from 'react-native';

const ColorSwitch = ({color, parentCallback}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((state) => !state);

  useEffect(() => {
    parentCallback(isEnabled, color);
  }, [isEnabled, color, parentCallback]);

  return (
    <Switch
      style={styles.cellSwitch}
      value={isEnabled}
      onValueChange={toggleSwitch}
    />
  );
};

const AddNewPaletteModal = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const selectColor = (selectedColor) => {
    setSelectedColors((initColors) => {
      console.log('select', initColors);
      const updatedColors = initColors.slice(0);
      updatedColors.push(selectedColor);
      console.log('select', initColors, updatedColors);
      return updatedColors;
    });
  };
  const deselectColor = (deselectedColor) => {
    setSelectedColors((colors) => {
      console.log('deselect', colors);
      const updatedState = colors.filter((color) => {
        console.log(deselectedColor, color, color !== deselectedColor);
        return color !== deselectedColor;
      });
      console.log(colors);
      return updatedState;
    });
  };

  const parentCallback = (switchIsEnabled, color) => {
    console.log('parentCallback', switchIsEnabled);
    if (switchIsEnabled) {
      selectColor(color);
    } else {
      deselectColor(color);
    }
  };

  const wrappedParentCallback = useCallback(parentCallback, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.colorName}</Text>
        <ColorSwitch color={item} parentCallback={wrappedParentCallback} />
      </View>
    );
  };

  return (
    <View style={styles.global}>
      <FlatList
        data={selectedColors}
        renderItem={({item}) => <Text>{item.colorName}</Text>}
        keyExtractor={(item) => item.hexCode}
      />
      <FlatList
        data={COLORS}
        renderItem={renderItem}
        keyExtractor={(item) => item.colorName}
        ItemSeparatorComponent={() => <View style={styles.cellSeparator} />}
      />
    </View>
  );
};
// TODO: sticky header name field
// TODO: sticky footer: Submit button

const styles = StyleSheet.create({
  global: {paddingHorizontal: 10, backgroundColor: '#fff'},
  cell: {
    flexDirection: 'row',
    alignContent: 'space-between',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {flex: 1, marginLeft: 10},
  cellSwitch: {alignSelf: 'flex-end', marginRight: 10},
  cellSeparator: {height: 1, backgroundColor: 'rgb(196, 197, 197)'},
});

const COLORS = [
  {colorName: 'AliceBlue', hexCode: '#F0F8FF'},
  {colorName: 'AntiqueWhite', hexCode: '#FAEBD7'},
  {colorName: 'Aqua', hexCode: '#00FFFF'},
  {colorName: 'Aquamarine', hexCode: '#7FFFD4'},
  {colorName: 'Azure', hexCode: '#F0FFFF'},
  {colorName: 'Beige', hexCode: '#F5F5DC'},
  {colorName: 'Bisque', hexCode: '#FFE4C4'},
  {colorName: 'Black', hexCode: '#000000'},
  {colorName: 'BlanchedAlmond', hexCode: '#FFEBCD'},
];

export default AddNewPaletteModal;
