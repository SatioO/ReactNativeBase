import React from 'react';
import { View, Button } from 'react-native';

export default function Dashboard({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button onPress={() => navigation.navigate('Sales')} title="Go to Sales" />
    </View>
  );
}
