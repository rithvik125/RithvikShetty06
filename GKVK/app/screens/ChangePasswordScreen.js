import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { changePasswordStyles as styles } from "../../styles/changePasswordStyles"; // 🔥 external styles

export default function ChangePasswordScreen() {
    const router = useRouter();

    const [id, setId] = useState("");
    const [storedPassword, setStoredPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        (async () => {
            const storedUser = await AsyncStorage.getItem("userData");
            if (storedUser) {
                const u = JSON.parse(storedUser);
                setId(u.id);
                setStoredPassword(u.password);
            }
        })();
    }, []);

    const handleBackPress = () => {
        router.replace("/(tabs)/profile");
    };

    const handleUpdatePassword = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        // validation
        if (oldPassword !== storedPassword) {
            setErrorMessage("❌ Old password is incorrect.");
            return;
        }

        if (!newPassword) {
            setErrorMessage("⚠ New password is required.");
            return;
        } else if (newPassword.length < 8) {
            setErrorMessage("⚠ Password must be at least 8 characters.");
            return;
        } else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(newPassword)) {
            setErrorMessage("⚠ Password must contain at least one special character.");
            return;
        } else if (!/[0-9]/.test(newPassword)) {
            setErrorMessage("⚠ Password must contain at least one number.");
            return;
        } else if (newPassword === oldPassword) {
            setErrorMessage("⚠ New password cannot be the same as old password.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage("⚠ Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`https://691c2daa3aaeed735c8fd1bb.mockapi.io/GKVK/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: newPassword }),
            });

            const updatedUser = await response.json();
            await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));

            setSuccessMessage("✅ Password updated successfully!");

            setTimeout(() => router.replace("/(tabs)/profile"), 1000);
        } catch (error) {
            setErrorMessage("⚠ Something went wrong. Try again.");
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Ionicons name="chevron-back" size={26} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Change Password</Text>
                <View style={{ width: 30 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <Text style={styles.label}>Current Password</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Enter current password"
                            secureTextEntry={!showOld}
                            value={oldPassword}
                            onChangeText={setOldPassword}
                        />
                        <TouchableOpacity onPress={() => setShowOld(!showOld)}>
                            <Ionicons name={showOld ? "eye-off-outline" : "eye-outline"} size={22} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>New Password</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Enter new password"
                            secureTextEntry={!showNew}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                            <Ionicons name={showNew ? "eye-off-outline" : "eye-outline"} size={22} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Confirm New Password</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Confirm password"
                            secureTextEntry={!showConfirm}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                            <Ionicons name={showConfirm ? "eye-off-outline" : "eye-outline"} size={22} />
                        </TouchableOpacity>
                    </View>

                    {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                    {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

                    <TouchableOpacity style={styles.saveButton} onPress={handleUpdatePassword}>
                        <Text style={styles.saveText}>Update Password</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
