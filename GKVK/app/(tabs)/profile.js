import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "../../styles/profileStyles";

export default function ProfileScreen() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            fetchUser();
        }, [])
    );

    const fetchUser = async () => {
        const storedUser = await AsyncStorage.getItem("userData");

        if (!storedUser) {
            setUser(null);
            return;
        }

        try {
            setUser(JSON.parse(storedUser));
        } catch (err) {
            console.log("Error parsing saved user:", err);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem("userData");
        await AsyncStorage.removeItem("token"); // remove generated token
        router.replace("/screens/LoginScreen");
    };

    const handleBack = () => {
        if (router.canGoBack()) router.back();
        else router.replace("/(tabs)/home");
    };

    return (
        <View style={styles.container}>
            {!user ? (
                <View style={styles.notLoggedContainer}>
                    <Ionicons name="person-circle-outline" size={130} color="#A3A3A3" />
                    <Text style={styles.notLoggedText}>You are not logged in</Text>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => router.push("/screens/LoginScreen")}
                    >
                        <Text style={styles.loginBtnText}>Login</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleBack}>
                            <Ionicons name="chevron-back" size={28} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.title}>My Profile</Text>
                        <View style={{ width: 28 }} />
                    </View>

                    <View style={{ alignItems: "center", marginTop: 30 }}>
                        <Ionicons name="person-circle-outline" size={120} color="#9BA1FF" />
                    </View>

                    <Text style={styles.name}>{user.fullName}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                    <Text style={styles.phone}>{user.mobile}</Text>

                    <View style={styles.line} />

                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => router.push("/screens/EditProfileScreen")}
                    >
                        <Ionicons name="person-outline" size={22} color="#333" />
                        <Text style={styles.optionText}>Edit Profile</Text>
                        <Ionicons name="chevron-forward" size={22} color="#333" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => router.push("/screens/ChangePasswordScreen")}
                    >
                        <Ionicons name="lock-closed-outline" size={22} color="#333" />
                        <Text style={styles.optionText}>Change Password</Text>
                        <Ionicons name="chevron-forward" size={22} color="#333" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => router.push("/screens/myorders")}
                    >
                        <Ionicons name="document-text-outline" size={22} color="#333" />
                        <Text style={styles.optionText}>My Orders</Text>
                        <Ionicons name="chevron-forward" size={22} color="#333" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} onPress={logout}>
                        <Ionicons name="log-out-outline" size={22} color="red" />
                        <Text style={[styles.optionText, { color: "red" }]}>Logout</Text>
                        <Ionicons name="chevron-forward" size={22} color="#333" />
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}
