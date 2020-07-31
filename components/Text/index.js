import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Typography({
  h1,
  h2,
  h3,
  title,
  body,
  caption,
  support,
  small,
  size,
  transform,
  align,
  // styling
  regular,
  bold,
  semibold,
  medium,
  weight,
  light,
  center,
  right,
  spacing, // letter-spacing
  height, // line-height
  // colors
  color,
  primary,
  secondary,
  tertiary,
  style,
  children,
  ...props
}) {
  const { sizes, fonts, colors } = useTheme();

  const textStyles = [
    { ...fonts.regular, color: colors.text },
    h1 && sizes.h1,
    h2 && sizes.h2,
    h3 && sizes.h3,
    title && { fontSize: sizes.title },
    body && { fontSize: sizes.body },
    caption && { fontSize: sizes.caption },
    support && { fontSize: sizes.support },
    size && { fontSize: size },
    transform && { textTransform: transform },
    align && { textAlign: align },
    height && { lineHeight: height },
    spacing && { letterSpacing: spacing },
    weight && { fontWeight: weight },
    regular && styles.regular,
    bold && styles.bold,
    semibold && styles.semibold,
    medium && styles.medium,
    light && styles.light,
    center && styles.center,
    right && styles.right,
    color && !colors[color] && { color },
    // color shortcuts
    primary && { color: colors.primary },
    secondary && { color: colors.secondary },
    tertiary && { color: colors.tertiary },
    style, // rewrite predefined styles
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  // variations
  regular: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  semibold: {
    fontWeight: '500',
  },
  medium: {
    fontWeight: '500',
  },
  light: {
    fontWeight: '200',
  },
  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
});
