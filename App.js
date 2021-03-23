import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import ColorBox from './components/ColorBox';

const App = () => {
  const renderItem = ({item}) => (
    <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Here are some colors</Text>
        <FlatList
          data={COLORS}
          renderItem={renderItem}
          keyExtractor={(item) => item.hexCode}
        />
      </View>
    </SafeAreaView>
  );
};

const COLORS = [
  {colorName: 'Base03', hexCode: '#002b36'},
  {colorName: 'Base02', hexCode: '#073642'},
  {colorName: 'Base01', hexCode: '#586e75'},
  {colorName: 'Base00', hexCode: '#657b83'},
  {colorName: 'Base0', hexCode: '#839496'},
  {colorName: 'Base1', hexCode: '#93a1a1'},
  {colorName: 'Base2', hexCode: '#eee8d5'},
  {colorName: 'Base3', hexCode: '#fdf6e3'},
  {colorName: 'Yellow', hexCode: '#b58900'},
  {colorName: 'Orange', hexCode: '#cb4b16'},
  {colorName: 'Red', hexCode: '#dc322f'},
  {colorName: 'Magenta', hexCode: '#d33682'},
  {colorName: 'Violet', hexCode: '#6c71c4'},
  {colorName: 'Blue', hexCode: '#268bd2'},
  {colorName: 'Cyan', hexCode: '#2aa198'},
  {colorName: 'Green', hexCode: '#859900'},
];

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default App;
