import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Platform-agnostic hook to retrieve the color scheme
 */
export function useColorScheme() {
  const colorScheme = useRNColorScheme();
  return colorScheme || 'light'; // Default to 'light' if the native hook returns null
}

export default useColorScheme;
