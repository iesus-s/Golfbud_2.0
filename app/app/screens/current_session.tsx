import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText'; 
import { ThemedButton } from '../components/ThemedButton';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the Scorecard interface fetched from the API
interface Scorecard {
  _id: string; 
  date: string;
  course: string;
  creator: string;
  players: string[];
  holeSelection: number;
  scores: {
    player: string;
    [key: string]: number | string; // Allows dynamic hole keys (e.g., hole1, hole2, etc.)
  }[];
}

// API URL
const API_URL = 'http://192.168.5.34';

export default function SessionScreen() {
  const router = useRouter();

  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [creatorID, setCreatorID] = useState<string | null>(null);
  const [scorecardID, setScorecardID] = useState<string | null>(null);

  // Fetch user's authorization token
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const decoded = jwtDecode<{ username: string }>(token); 
          setCreatorID(decoded.username || "Guest"); 
          console.log("User ID:", decoded.username);
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };
    fetchUserData();
  }, []);

  // Fetch the scorecard data
  useEffect(() => {
    const fetchScorecard = async () => {
      if (creatorID) {
        try {
          const response = await fetch(`${API_URL}:3000/api/request/scorecards/user/${creatorID}`); 
          const data = await response.json();

          if (response.ok && data.Scorecards.length > 0) {
            // Find the latest scorecard by date
            const latestScorecard: Scorecard = data.Scorecards.sort(
              (a: Scorecard, b: Scorecard) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )[0];

            setScorecard(latestScorecard);
            setScorecardID(latestScorecard._id);
          } else {
            console.warn("No scorecard found for the given creator.");
          }
        } catch (error) {
          console.error("Error fetching scorecard data:", error);
        }
      }
    };

    fetchScorecard();
  }, [creatorID]);

  // Handle score input changes
  const handleInputChange = (player: string, hole: string, value: string) => {
    if (scorecard) {
      const updatedScores = scorecard.scores.map((scoreEntry) => {
        if (scoreEntry.player === player) {
          return {
            ...scoreEntry,
            [hole]: parseInt(value) || 0, // Update specific hole score
          };
        }
        return scoreEntry;
      });

      setScorecard({
        ...scorecard,
        scores: updatedScores,
      });
    }
  };

  // Update the scorecard data on the server
  useEffect(() => {
    const updateScorecard = async () => {
      if (scorecard && scorecardID) {
        try {
          const response = await fetch(`${API_URL}:3000/api/request/scorecards/user/update/${scorecardID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scorecard),
          });
          if (response.ok) {
            console.log("Scorecard updated successfully.");
          } else {
            console.error("Error updating scorecard.");
          }
        } catch (error) {
          console.error("Error updating scorecard:", error);
        }
      }
    };
    updateScorecard();
  }, [scorecard]);

  // Render the scorecard grid
  const renderGrid = () => {
    if (!scorecard) return null;

    const rows = scorecard.scores.length; // Number of players
    const columns = scorecard.holeSelection; // Number of holes

    const headerRow = (
      <ThemedView key="header" style={styles.number}>
        <ThemedView key="empty" style={styles.columnHeaderContainer} />
        {[...Array(columns)].map((_, index) => (
          <ThemedView key={index + 1} style={styles.columnHeaderContainer}>
            <ThemedText style={styles.columnHeader}>{`Hole ${index + 1}`}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    );

    const rowsData = scorecard.scores.map((scoreEntry, rowIndex) => (
      <ThemedView key={rowIndex} style={styles.row}>
        <ThemedText style={styles.rowLabel}>{scoreEntry.player}</ThemedText>
        {[...Array(columns)].map((_, colIndex) => {
          const holeKey = `hole${colIndex + 1}`;
          return (
            <TextInput
              key={`${rowIndex}-${colIndex}`}
              style={styles.input}
              value={scoreEntry[holeKey]?.toString() || '0'}
              onChangeText={(text) => handleInputChange(scoreEntry.player, holeKey, text)}
              keyboardType="numeric"
            />
          );
        })}
      </ThemedView>
    ));

    return [headerRow, ...rowsData];
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Session Screen</ThemedText>
        <ThemedText style={styles.sessionTitles}>Course Name: {scorecard?.course || "N/A"}</ThemedText>
        <ScrollView horizontal>
          <ThemedView style={styles.gridContainer}>
            {renderGrid()}
          </ThemedView>
        </ScrollView>
        <ThemedButton onPress={() => router.push("/screens/game")} style={styles.goBack} title="Go Back" />
      </ThemedView>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20, 
    paddingBottom: 70,
  },
  sessionTitles: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gridContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  number: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  columnHeaderContainer: {
    width: 60,
    alignItems: 'center',
    margin: 4,
  },
  columnHeader: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  rowLabel: {
    width: 100,
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    width: 60,
    height: 40,
    textAlign: 'center',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 4,
  },
  goBack: {
    marginTop: 20,
  },
});