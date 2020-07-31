import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Text from '../Text';
import Block from '../Block';

export default function Input({
  email,
  phone,
  number,
  secure,
  error,
  style,
  label,
  ...props
}) {
  function renderLabel() {
    return (
      <Block flex={false}>
        {label ? (
          <Text caption gray3={!error} accent={error}>
            {label}
          </Text>
        ) : null}
      </Block>
    );
  }

  const inputStyles = [
    styles.input,
    error && { borderColor: colors.border },
    style,
  ];

  const inputType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';

  return (
    <Block flex={false} margin={[16, 0]}>
      {renderLabel()}
      <TextInput
        style={inputStyles}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        {...props}
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    right: 0,
  },
});
