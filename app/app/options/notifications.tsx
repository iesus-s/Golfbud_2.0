import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText'; 
import { ThemedButton } from '../components/ThemedButton';

export default function ProfileSettings() {
  const router = useRouter();

  return (
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Notifications</ThemedText> 
        <ThemedButton onPress={() => router.push("/screens/options")} style={styles.goBack} title="Go Back" />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'flex-start',
    padding: 20,
  },
  goBack: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    marginTop: 50,
  },
});
