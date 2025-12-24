import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/loginStyles";

// 👉 Token save for session handling
import { saveSession } from "../../services/session";

export default function LoginScreen() {
    const router = useRouter();

    const [mobileOrEmail, setMobileOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loginWithOtp, setLoginWithOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpError, setOtpError] = useState("");
    const [timer, setTimer] = useState(0);

    const handleLogin = async () => {
        const newErrors = {};

        if (!mobileOrEmail.trim())
            newErrors.mobileOrEmail = "Enter Mobile No. or Email ID";

        if (!password.trim())
            newErrors.password = "Enter your password";

        setErrors(newErrors);

        if (Object.keys(newErrors).length !== 0) return;

        try {
            const response = await fetch("https://691c2daa3aaeed735c8fd1bb.mockapi.io/GKVK");
            const users = await response.json();

            if (!Array.isArray(users)) {
                setErrors({ mobileOrEmail: "Server error. Try again." });
                return;
            }

            const user = users.find(
                (u) =>
                    u.email === mobileOrEmail.trim() ||
                    u.mobile === mobileOrEmail.trim()
            );

            if (!user) {
                setErrors({ mobileOrEmail: "User not found" });
                return;
            }

            if (user.password !== password.trim()) {
                setErrors({ password: "Invalid password" });
                return;
            }

            // 🔥 SAVE USER LOGIN USING ONE KEY → userData
            await AsyncStorage.setItem("userData", JSON.stringify(user));

            // 👉 SAVE USER DATA FOR PROFILE SCREEN
            await AsyncStorage.setItem("userId", user.id.toString());
            await AsyncStorage.setItem("userEmail", user.email);
            await AsyncStorage.setItem("userName", user.fullName);
            await AsyncStorage.setItem("userPhone", user.mobile);

            await saveSession("token_123");

            console.log("✔ LOGIN SUCCESS — Stored USER:", user.id);

            router.replace("/(tabs)/home");

        } catch (e) {
            console.log(e);
            setErrors({ mobileOrEmail: "Network error. Try again." });
        }
    };

    const startTimer = () => {
        setTimer(30);
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const sendLoginOtp = () => {
        if (!mobileOrEmail.trim()) {
            setErrors({ mobileOrEmail: "Enter Mobile Number" });
            return;
        }

        if (mobileOrEmail.trim().length !== 10) {
            setErrors({ mobileOrEmail: "Enter valid 10-digit Mobile Number" });
            return;
        }

        setOtpSent(true);
        setOtp("");
        setOtpError("");
        startTimer();
    };

    const validateLoginOtp = async () => {
        if (otp.length !== 4) {
            setOtpError("OTP must be 4 digits");
            return;
        }

        await saveSession("token_123");

        // 🔥 SAVE LOGIN WITH SAME KEY → userData
        await AsyncStorage.setItem("userData", JSON.stringify({ identifier: mobileOrEmail }));

        console.log("✔ OTP LOGIN SUCCESS — Stored:", mobileOrEmail);

        router.replace("/(tabs)/home");
    };

    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <BlurView intensity={70} tint="light" style={styles.absoluteBlur} />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.overlay}>
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <Text style={styles.welcomeText}>Hello, Welcome Back!</Text>
                        <Text style={styles.subtitle}>Customer Sign In</Text>

                        {/* Your UI remains unchanged below */}
                        {/* --------------------------------- */}
                        {/* Mobile / Email */}
                        <TextInput
                            style={[
                                styles.input,
                                errors.mobileOrEmail ? { borderColor: "#FF3B30" } : {},
                            ]}
                            placeholder="Mobile No./Email Id"
                            placeholderTextColor="#777"
                            value={mobileOrEmail}
                            onChangeText={(text) => {
                                setMobileOrEmail(text);
                                if (errors.mobileOrEmail)
                                    setErrors({ ...errors, mobileOrEmail: "" });
                            }}
                        />
                        {errors.mobileOrEmail ? (
                            <Text style={styles.errorText}>{errors.mobileOrEmail}</Text>
                        ) : null}

                        {!loginWithOtp && (
                            <>
                                <View style={styles.passwordWrapper}>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            { paddingRight: 45 },
                                            errors.password ? { borderColor: "#FF3B30" } : {},
                                        ]}
                                        placeholder="Password"
                                        placeholderTextColor="#777"
                                        secureTextEntry={!showPassword}
                                        value={password}
                                        onChangeText={(text) => {
                                            setPassword(text);
                                            if (errors.password)
                                                setErrors({ ...errors, password: "" });
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeIcon}
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        <Ionicons
                                            name={showPassword ? "eye" : "eye-off"}
                                            size={22}
                                            color="#555"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {errors.password ? (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                ) : null}
                            </>
                        )}

                        {/* OTP UI */}
                        {loginWithOtp && (
                            <>
                                <TextInput
                                    style={[
                                        styles.input,
                                        otpError ? { borderColor: "#FF3B30" } : {},
                                    ]}
                                    placeholder="Enter 4-digit OTP"
                                    keyboardType="numeric"
                                    maxLength={4}
                                    value={otp}
                                    onChangeText={(val) => {
                                        setOtp(val.replace(/[^0-9]/g, ""));
                                        setOtpError("");
                                    }}
                                />
                                {otpError ? (
                                    <Text style={styles.errorText}>{otpError}</Text>
                                ) : null}

                                {!otpSent ? (
                                    <TouchableOpacity style={styles.button} onPress={sendLoginOtp}>
                                        <Text style={styles.buttonText}>Send OTP</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <View style={{ width: "100%" }}>
                                        <TouchableOpacity
                                            style={[
                                                styles.button,
                                                { backgroundColor: timer === 0 ? "#0047AB" : "#999" },
                                            ]}
                                            onPress={timer === 0 ? sendLoginOtp : null}
                                        >
                                            <Text style={styles.buttonText}>
                                                {timer === 0 ? "Resend OTP" : `Resend OTP (${timer}s)`}
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.button, { marginTop: 10 }]}
                                            onPress={validateLoginOtp}
                                        >
                                            <Text style={styles.buttonText}>Verify OTP</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </>
                        )}

                        {/* Links */}
                        <View style={styles.linksRow}>
                            {!loginWithOtp ? (
                                <Text style={styles.forgotText}>
                                    Forgot password?{" "}
                                    <Text
                                        style={styles.loginOtpText}
                                        onPress={() => setLoginWithOtp(true)}
                                    >
                                        Login using OTP
                                    </Text>
                                </Text>
                            ) : (
                                <Text style={styles.forgotText}>
                                    <Text
                                        style={styles.loginOtpText}
                                        onPress={() => setLoginWithOtp(false)}
                                    >
                                        Login with Password
                                    </Text>
                                </Text>
                            )}
                        </View>

                        {!loginWithOtp && (
                            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </TouchableOpacity>
                        )}

                        {/* Guest Login */}
                        <View style={styles.bottomLinks}>
                            <Text style={styles.bottomText}>Continue without logging in? </Text>
                            <TouchableOpacity onPress={() => router.push("/(tabs)/home")}>
                                <Text style={styles.linkText}>Home</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Register */}
                        <View style={styles.bottomLinks}>
                            <Text style={styles.bottomText}>Don’t have an account? </Text>
                            <TouchableOpacity onPress={() => router.push("/RegistrationScreen")}>
                                <Text style={styles.linkText}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}
