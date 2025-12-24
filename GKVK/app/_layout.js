import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* First screen of the app */}
      <Stack.Screen name="index" />

      {/* Auth screens */}
      <Stack.Screen name="screens/LoginScreen" />
      <Stack.Screen name="/RegistrationScreen" />

      {/* All tab screens */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
