import React from 'react';
import { Image, useWindowDimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Input, Container } from '../../components';
import UsernameScreen from './UsernameScreen';

export default function Login(props) {
  const { sizes, colors } = useTheme();
  const dimensions = useWindowDimensions();

  return (
    <Container>
      <Container
        height={dimensions.height * 0.35}
        padding={16}
        width={dimensions.width}
        alignment="center">
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            width: '80%',
            resizeMode: 'contain',
          }}
        />
      </Container>
      <UsernameScreen params={{}} />
    </Container>
  );
}
