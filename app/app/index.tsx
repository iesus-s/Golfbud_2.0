import React, { useEffect } from "react";
import { useRouter } from "expo-router"; 
import { StyleSheet } from "react-native";
import { ThemedText } from './components/ThemedText';
import { ThemedView } from './components/ThemedView';

export default function LoadScreen() { 
  // Initialize the router
  const router = useRouter();

  // Reroute to the Home Screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => { 
      router.replace("/screens/home");  
    }, 2000);
    return () => clearTimeout(timer); 
  }, [router]);

  return ( 
    <ThemedView style={styles.container}>
      
      {/* Screen Title */}
      <ThemedText type="app">Golfbud</ThemedText>
    </ThemedView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",  
  },  
});
