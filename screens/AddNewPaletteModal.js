import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Switch, Text, View} from 'react-native';

const ColorSwitch = ({color, updateSelectedColors}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((state) => !state);

  useEffect(() => {
    updateSelectedColors(isEnabled, color);
  }, [isEnabled, updateSelectedColors, color]);

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

  const updateSelectedColors = useCallback((switchIsEnabled, color) => {
    setSelectedColors((oldState) => {
      let state = oldState.slice();
      if (switchIsEnabled) {
        state.push(color);
      } else {
        state = state.filter((aColor) => aColor.hexCode !== color.hexCode);
      }
      return state;
    });
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.colorName}</Text>
        <ColorSwitch color={item} updateSelectedColors={updateSelectedColors} />
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

// Requirements
// [x] pressing on "add color scheme" opens a modal
// [] the user can enter the name for the color scheme
// [x] the user can use toggle buttons to select colors to add to the scheme
// [] if the user hits submit without entering a name for the color, they will get an error message
// [] if the user hits submit without entering the number of colors, they will get an error message
// [] if the user has entered a name for the color scheme and picked at least 3 colors,
// ^ the modal will close and the color scheme they created gets added to the top of the list
