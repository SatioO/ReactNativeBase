import React from 'react';
import { View, Button } from 'react-native';

export default function Sales({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button
        onPress={() => navigation.navigate('Dashboard')}
        title="Go to Dashboard"
      />
    </View>
  );
}
