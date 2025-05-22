import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText'; 

export default function BetsScreen() {
  // Initialize the router (for navigation) used to naviate between screens
  const router = useRouter();

  return (
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        {/* Title of the Screen */}
        <ThemedText type="title">Bets Screen</ThemedText> 
        <ThemedText type="title">(Coming Soon)</ThemedText> 
      </ThemedView>
    </ScrollView>
  );
}

// Syling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
