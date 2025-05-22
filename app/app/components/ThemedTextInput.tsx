import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

export type ThemedTextInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
  placeholderColor?: string;
  style?: object;
};

export function ThemedTextInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  lightBackgroundColor,
  darkBackgroundColor,
  lightBorderColor,
  darkBorderColor,
  placeholderColor = '#888', // Default placeholder color
  style,
}: ThemedTextInputProps) {
  // Background color and border color based on the current theme
  const backgroundColor = useThemeColor(
    { light: lightBackgroundColor || '#fff', dark: darkBackgroundColor || '#333' },
    'background'
  );
  const borderColor = useThemeColor(
    { light: lightBorderColor || '#ccc', dark: darkBorderColor || '#555' },
    'background'
  );
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text'); // Text color for input

  return (
    <View style={[styles.container, { borderColor }, style]}>
      <TextInput
        style={[styles.input, { backgroundColor, color: textColor }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 40,
  },
});

export default ThemedTextInput;
