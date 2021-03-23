import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Here are some colors</Text>
        <Text style={[styles.box, styles.cyan]}>
          {styles.cyan.backgroundColor}
        </Text>
        <Text style={[styles.box, styles.blue]}>
          {styles.blue.backgroundColor}
        </Text>
        <Text style={[styles.box, styles.magenta]}>
          {styles.magenta.backgroundColor}
        </Text>
        <Text style={[styles.box, styles.orange]}>
          {styles.orange.backgroundColor}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  box: {
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    padding: 10,
  },
  cyan: {backgroundColor: '#2aa198'},
  blue: {backgroundColor: '#268bd2'},
  magenta: {backgroundColor: '#d33682'},
  orange: {backgroundColor: '#cb4b16'},
});

export default App;
