import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '../hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'body' | 'app' | 'request' | 'nav' | 'profile';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color }, 
        type === 'app' ? styles.app : undefined,        // For App Title
        type === 'title' ? styles.title : undefined,    // For Page Titles
        type === 'body' ? styles.body : undefined,      // For Scorecard Body Titles
        type === 'request' ? styles.request : undefined,// For Sign and Create Account Titles
        type === 'nav' ? styles.nav : undefined,        // For Nav Items 
        type === 'profile' ? styles.profile : undefined,// For Profite Titles
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({ 
  app: {
    fontSize: 32,
    fontWeight: 'bold',  
    lineHeight: 32, 
    alignItems: 'center', 
  },
  nav: {
    fontSize: 16,
    fontWeight: 'bold',  
    lineHeight: 16, 
    alignItems: 'center',
  },
  request: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,  
    top: 10,
    alignItems: 'center',  
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,  
    top: 10,
    alignItems: 'center', 
    paddingTop: 80,
    paddingBottom: 40, 
    textAlign: 'center',
  },
  body: {
    fontSize: 16,  
    fontWeight: 'bold',
    lineHeight: 24, 
    marginTop: 10,   
  }, 
  profile: { 
    fontSize: 32,  
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default ThemedText;
