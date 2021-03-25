import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Home = ({navigation}) => (
  <View>
    <TouchableOpacity>
      <Text
        onPress={() => {
          navigation.navigate('ColorPalette');
        }}>
        Solarized
      </Text>
    </TouchableOpacity>
  </View>
);

export default Home;
