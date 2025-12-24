import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const user = await AsyncStorage.getItem("userData");

            // If user exists → go to Home
            if (user) {
                router.replace("/(tabs)/home");
            }
            // If no user → go to Login
            else {
                router.replace("/screens/LoginScreen");
            }
        };

        checkUser();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#0047AB" />
        </View>
    );
}
