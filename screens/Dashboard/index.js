import React from 'react';
import { View, Button, StatusBar } from 'react-native';

function Dashboard({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Button
        onPress={() => navigation.navigate('Sales')}
        title="Go to Sales"
      />
    </View>
  );
}

export default Dashboard;
