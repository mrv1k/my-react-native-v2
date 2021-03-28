import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({navigation, route}) => {
  const [colorPalets, setColorPalets] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const newPalette = route.params?.newPalette;
  useEffect(() => {
    if (newPalette) {
      // prevents duplicate insertions of the same pallets on routes navigation
      const firstPaletteName = colorPalets[0]?.paletteName || '';
      if (firstPaletteName !== newPalette.paletteName) {
        setColorPalets((prevState) => {
          return [newPalette].concat(prevState);
        });
      }
    }
  }, [newPalette, colorPalets]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchColorPallets();
    setIsRefreshing(false);
  };

  useEffect(() => fetchColorPallets(), []);

  const fetchColorPallets = async () => {
    const url = 'https://color-palette-api.kadikraman.now.sh/palettes';
    const response = await fetch(url);
    const json = await response.json();
    setColorPalets(json);
  };

  const renderItem = ({item}) => (
    <PalettePreview
      handleOnPress={() => navigation.navigate('ColorPalette', item)}
      colorPalette={item}
    />
  );

  return (
    <FlatList
      data={colorPalets}
      renderItem={renderItem}
      keyExtractor={(item) => item.paletteName}
      style={styles.list}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListHeaderComponent={
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddNewPalette')}>
          <Text style={styles.buttonText}>Add color scheme</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    height: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'teal',
  },
});

export default Home;
