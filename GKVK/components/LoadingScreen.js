import React from "react";
import { View, ActivityIndicator } from "react-native";
import { styles } from "../styles/loadingStyles"; // ← imported styles

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4A3AFF" />
    </View>
  );
}
