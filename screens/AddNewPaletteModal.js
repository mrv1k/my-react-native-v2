import React, {useState} from 'react';
import {FlatList, StyleSheet, Switch, Text, View} from 'react-native';

const ItemSeparatorComponent = () => <View style={styles.cellSeparator} />;

const AddNewPaletteModal = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const renderItem = ({item}) => {
    return (
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.colorName}</Text>
        <Switch
          style={styles.cellSwitch}
          value={isEnabled}
          onValueChange={toggleSwitch}
        />
      </View>
    );
  };

  return (
    <View style={styles.global}>
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
];

export default AddNewPaletteModal;
