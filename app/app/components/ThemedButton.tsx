import React from 'react';
import { StyleSheet, Pressable, Text, GestureResponderEvent } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

export type ThemedButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  lightColor?: string;
  darkColor?: string;
  style?: object;
};

export function ThemedButton({
  onPress,
  title,
  lightColor,
  darkColor,
  style,
}: ThemedButtonProps) {
  // Get the background color based on the current theme
  const backgroundColor = useThemeColor(
    { light: lightColor || '#28a745', dark: darkColor || '#0000ff' }, // Updated to blue colors
    'background'
  );

  // Get the text color based on the theme
  const textColor = useThemeColor({ light: '#fff', dark: '#fff' }, 'text');

  return (
    <Pressable
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: 150,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ThemedButton;
