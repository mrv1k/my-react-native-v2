import React, {useState} from 'react';
import {FlatList, StyleSheet, Switch, Text, View} from 'react-native';

const ItemSeparatorComponent = () => <View style={styles.cellSeparator} />;

const ColorSwitch = ({color, parentCallback}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    console.log('a', isEnabled);
    setIsEnabled((previousState) => {
      const state = !previousState;
      parentCallback(state, color);
      return state;
    });
  };

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
      const updatedState = colors.filter(
        (color) => color.hexCode !== deselectedColor.hexCode,
      );
      console.log(colors);
      return updatedState;
    });
  };

  const parentCallback = (switchIsEnabled, color) => {
    console.log('parentCallback', switchIsEnabled, color);
    switchIsEnabled ? selectColor(color) : deselectColor(color);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.colorName}</Text>
        <ColorSwitch color={item} parentCallback={parentCallback} />
      </View>
    );
  };

  return (
    <View style={styles.global}>
      <Text>
        selectedColors: {selectedColors.map((color) => color.colorName + ' ')}
      </Text>
      <FlatList
        data={COLORS}
        renderItem={renderItem}
        keyExtractor={(item) => item.colorName}
        ItemSeparatorComponent={ItemSeparatorComponent}
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
