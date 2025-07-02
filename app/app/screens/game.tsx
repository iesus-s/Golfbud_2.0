import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { ThemedButton } from '../components/ThemedButton';

export default function GameScreen() {
    // Initialize the router (for navigation) used to naviate between screens
  const router = useRouter();

  return (
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        {/* Title of the Screen */}
        <ThemedText type="title">Game Screen</ThemedText>
        <ThemedView style={styles.buttonsContainer}>
          {/* Send User to Scorecard Screen (scorecard.tsx) */}
          <ThemedButton onPress={() => router.push("/screens/new_scorecard")} title="New Scorecard" />
          {/* Send User to Records Screen (records.tsx) */}
          <ThemedButton onPress={() => router.push("/screens/new_scorecard")} title="Records" />
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

// Syling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
  },
  buttonsContainer: { 
    marginTop: 400,
    marginBottom: 50,
  },
});