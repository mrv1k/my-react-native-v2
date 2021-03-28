import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../data/colors';

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

export default function AddNewPaletteModal({navigation, route}) {
  const [paletteName, setPaletteName] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  const updateSelectedColors = useCallback((switchIsEnabled, color) => {
    setSelectedColors((oldState) =>
      switchIsEnabled
        ? Array.from(oldState).concat(color)
        : oldState.filter((aColor) => aColor.colorName !== color.colorName),
    );
  }, []);

  const handleSubmitPress = () => {
    if (paletteName.length === 0) {
      return Alert.alert(
        'Missing palette name',
        'Please name your palette before submitting.',
      );
    }
    if (selectedColors.length < 3) {
      return Alert.alert(
        'Not enough colors',
        'A palette requires at minimum 3 colors',
      );
    }

    const newPalette = {id: paletteName, paletteName, colors: selectedColors};
    navigation.navigate('Home', {newPalette});
  };

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
        data={COLORS}
        renderItem={renderItem}
        keyExtractor={(item) => item.colorName}
        ItemSeparatorComponent={() => <View style={styles.cellSeparator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text>Name of your color palette</Text>
            <TextInput
              value={paletteName}
              onChangeText={setPaletteName}
              style={styles.input}
            />
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity onPress={handleSubmitPress} style={styles.button}>
            <Text style={styles.buttonText}>Submit!</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const grayColor = 'rgb(196, 197, 197)';
const styles = StyleSheet.create({
  global: {paddingHorizontal: 10, backgroundColor: '#fff'},
  header: {paddingVertical: 10},
  input: {
    marginVertical: 10,
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: grayColor,
    borderRadius: 5,
  },
  cell: {
    flexDirection: 'row',
    alignContent: 'space-between',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {flex: 1, marginLeft: 10},
  cellSwitch: {alignSelf: 'flex-end', marginRight: 10},
  cellSeparator: {height: 1, backgroundColor: grayColor},
  button: {
    backgroundColor: '#78C5EF',
    borderRadius: 5,
    padding: 15,
    textAlignVertical: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// Requirements
// [x] pressing on "add color scheme" opens a modal
// [x] the user can enter the name for the color scheme
// [x] the user can use toggle buttons to select colors to add to the scheme
// [x] if the user hits submit without entering a name for the color, they will get an error message
// [x] if the user hits submit without entering the number of colors, they will get an error message
// [x] if the user has entered a name for the color scheme and picked at least 3 colors,
// ^ the modal will close and the color scheme they created gets added to the top of the list
