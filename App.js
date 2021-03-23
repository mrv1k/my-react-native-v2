import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import ColorBox from './components/ColorBox';

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Here are some colors</Text>
        <ColorBox hexCode={COLORS.cyan} colorName={COLORS.cyan} />
        <ColorBox hexCode={COLORS.blue} colorName={COLORS.blue} />
        <ColorBox hexCode={COLORS.magenta} colorName={COLORS.magenta} />
        <ColorBox hexCode={COLORS.orange} colorName={COLORS.orange} />
      </View>
    </SafeAreaView>
  );
};

const COLORS = {
  cyan: '#2aa198',
  blue: '#268bd2',
  magenta: '#d33682',
  orange: '#cb4b16',
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default App;
