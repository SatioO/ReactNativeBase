import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import UsernameScreen from './UsernameScreen';

export default function Login(props) {
  const { colors } = useTheme();

  return <UsernameScreen params={{}} />;
}
