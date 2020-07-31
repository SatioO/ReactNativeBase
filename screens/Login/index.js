import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Login({ navigation }) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity style={{ backgroundColor: colors.card }}>
        <Text style={{ color: colors.text }}>Button!</Text>
      </TouchableOpacity>
    </View>
  );
}
