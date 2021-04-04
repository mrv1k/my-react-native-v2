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
import {AddNewPaletteNavigationProp, Color, Palette} from '../types';

interface AddNewPaletteProps {
  navigation: AddNewPaletteNavigationProp;
}

export default function AddNewPaletteModal({navigation}: AddNewPaletteProps) {
  const [name, setName] = useState('');
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);

  const updateSelectedColors = useCallback(
    (switchIsEnabled: boolean, color: Color) => {
      setSelectedColors((oldState) =>
        switchIsEnabled
          ? oldState.concat(color)
          : oldState.filter((aColor) => aColor.colorName !== color.colorName),
      );
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    if (name.length === 0) {
      return Alert.alert('Please enter palette name');
    }
    if (selectedColors.length < 3) {
      return Alert.alert('A palette requires at minimum 3 colors');
    }

    const newPalette: Palette = {
      id: Date.now(),
      paletteName: name,
      colors: selectedColors,
    };
    navigation.navigate('Home', {newPalette});
  }, [name, selectedColors, navigation]);

  const renderItem = ({item}: {item: Color}) => {
    return (
      <View style={styles.cell}>
        <Text>{item.colorName}</Text>
        <ColorSwitch color={item} updateSelectedColors={updateSelectedColors} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Name of your color palette</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />
      </View>
      <FlatList
        data={COLORS}
        renderItem={renderItem}
        keyExtractor={(item) => item.colorName}
        ItemSeparatorComponent={() => <View style={styles.cellSeparator} />}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit!</Text>
      </TouchableOpacity>
    </View>
  );
}

interface ColorSwitchProps {
  color: Color;
  updateSelectedColors: (isEnabled: boolean, color: Color) => void;
}
const ColorSwitch: React.FC<ColorSwitchProps> = ({
  color,
  updateSelectedColors,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((state) => !state);

  useEffect(() => {
    updateSelectedColors(isEnabled, color);
  }, [isEnabled, updateSelectedColors, color]);

  return <Switch value={isEnabled} onValueChange={toggleSwitch} />;
};

const grayColor = 'rgb(196, 197, 197)';
const styles = StyleSheet.create({
  container: {paddingHorizontal: 10, backgroundColor: '#fff', flex: 1},
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cellSeparator: {height: 1, backgroundColor: grayColor},
  button: {
    backgroundColor: 'teal',
    borderRadius: 5,
    marginVertical: 20,

    height: 40,
    justifyContent: 'center',
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
