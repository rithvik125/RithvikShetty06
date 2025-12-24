import React, { useState, useCallback } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginRequiredModal from "../../components/LoginRequiredModal";
import { useFocusEffect } from "@react-navigation/native";

export default function TabLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [from, setFrom] = useState(null);

  // Refresh login status when tab becomes active
  useFocusEffect(
    useCallback(() => {
      const checkLogin = async () => {
        const user = await AsyncStorage.getItem("userData");
        setIsLoggedIn(!!user);
      };
      checkLogin();
    }, [])
  );

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#0047AB",
          tabBarInactiveTintColor: "#777",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#ddd",
            height: 60,
            paddingBottom: 5,
          },
        }}
      >
        {/* Profile tab */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={30} color={color} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                setFrom("profile");
                setShowModal(true);
              }
            },
          }}
        />

        {/* Home — always allowed */}
        <Tabs.Screen
          name="home"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={30} color={color} />
            ),
          }}
        />

        {/* Cart */}
        <Tabs.Screen
          name="cart"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <Ionicons name="cart-outline" size={30} color={color} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                setFrom("cart");
                setShowModal(true);
              }
            },
          }}
        />
      </Tabs>

      <LoginRequiredModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        from={from}
      />
    </>
  );
}
