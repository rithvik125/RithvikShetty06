import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import { BlurView } from "expo-blur";
import { styles } from "../styles/registrationStyles";
import { fetchPostalDetails } from "../api/postalApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerUser } from "../api/authApi";

export default function RegistrationScreen() {
  const router = useRouter();
  const scrollRef = useRef(null);

  // ---------- States ----------
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);

  const [mobileError, setMobileError] = useState("");
  const [otpError, setOtpError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingAddressError, setShippingAddressError] = useState("");
  const [shippingPin, setShippingPin] = useState("");
  const [shippingPinError, setShippingPinError] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingDistrict, setShippingDistrict] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------- Generate Captcha ----------
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  // ---------- OTP Handlers ----------
  const handleSendOtp = () => {
    if (!mobile.trim()) return setMobileError("Please enter your mobile number.");
    if (mobile.length !== 10) return setMobileError("Enter a valid 10-digit mobile number.");

    setMobileError("");
    setOtpSent(true);
  };

  const handleValidateOtp = () => {
    if (!otp.trim()) return setOtpError("Please enter the 4-digit OTP.");
    if (otp.length !== 4) return setOtpError("OTP must be 4 digits.");

    setOtpError("");
    setOtpValidated(true);
    generateCaptcha();

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 300);
  };

  // ---------- Fetch Pin Details ----------
  const fetchPinDetails = async (pin, type = "billing") => {
    if (pin.length !== 6) return;
    try {
      setLoading(true);
      const { State, District } = await fetchPostalDetails(pin);
      if (type === "billing") {
        setState(State);
        setDistrict(District);
      } else {
        setShippingState(State);
        setShippingDistrict(District);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  // ---------- Submit ----------
  const handleSubmit = async () => {
    let hasError = false;

    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      hasError = true;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must contain a special character.");
      hasError = true;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain a number.");
      hasError = true;
    } else if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!fullName.trim()) { setFullNameError("Full Name is required."); hasError = true; }
    if (!address.trim()) { setAddressError("Address is required."); hasError = true; }
    if (!pincode.trim()) { setPincodeError("PIN Code is required."); hasError = true; }
    if (!shippingAddress.trim()) { setShippingAddressError("Shipping Address is required."); hasError = true; }
    if (!shippingPin.trim()) { setShippingPinError("Shipping PIN Code is required."); hasError = true; }
    if (!email.trim()) { setEmailError("Email is required."); hasError = true; }

    if (captchaInput.toUpperCase() !== captcha) {
      setCaptchaError("Incorrect captcha.");
      hasError = true;
    } else {
      setCaptchaError("");
    }

    if (!acceptedTerms) {
      setTermsError("Accept Terms & Conditions");
      hasError = true;
    } else {
      setTermsError("");
    }

    generateCaptcha();
    setCaptchaInput("");

    if (hasError) return;

    const userData = {
      email,
      mobile,
      fullName,
      password,
      address,
      pincode,
      state,
      district,
      shippingAddress,
      shippingPin,
      shippingState,
      shippingDistrict,
    };

    try {
      const result = await registerUser(userData);
      if (result?.ok) {
        await AsyncStorage.setItem("userCredentials", JSON.stringify(userData));
        router.replace("/screens/LoginScreen");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch {
      alert("Network error. Try again later.");
    }
  };

  return (
    <ImageBackground source={require("../assets/images/bg.png")} style={styles.background} resizeMode="cover">
      <BlurView intensity={100} tint="light" style={styles.absoluteBlur} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.overlay}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.canGoBack() && router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={26} color="black" />
              </TouchableOpacity>
              <Text style={styles.title}>Registration</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Mobile */}
              <Text style={styles.label}>Mobile No (10 Digits)</Text>
              <TextInput
                style={[styles.input, mobileError && { borderColor: "#FF3B30" }]}
                placeholder="Enter mobile number"
                keyboardType="numeric"
                maxLength={10}
                editable={!otpValidated}
                value={mobile}
                onChangeText={(text) => {
                  setMobile(text.replace(/[^0-9]/g, "").slice(0, 10));
                  mobileError && setMobileError("");
                }}
              />
              {mobileError && <Text style={styles.errorText}>{mobileError}</Text>}

              <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
                <Text style={styles.buttonText}>{otpSent ? "Resend OTP" : "Send OTP"}</Text>
              </TouchableOpacity>

              {otpSent && (
                <>
                  <Text style={[styles.label, { marginTop: 20 }]}>Enter OTP</Text>
                  <TextInput
                    style={[styles.input, otpError && { borderColor: "#FF3B30" }]}
                    placeholder="Enter OTP"
                    keyboardType="numeric"
                    maxLength={4}
                    value={otp}
                    onChangeText={(text) => {
                      setOtp(text.replace(/[^0-9]/g, "").slice(0, 4));
                      otpError && setOtpError("");
                    }}
                  />
                  {otpError && <Text style={styles.errorText}>{otpError}</Text>}

                  {!otpValidated && (
                    <TouchableOpacity style={styles.button} onPress={handleValidateOtp}>
                      <Text style={styles.buttonText}>Validate OTP</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}

              {otpValidated && (
                <>
                  {/* Password */}
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={[styles.input, passwordError && { borderColor: "#FF3B30" }]}
                    secureTextEntry
                    placeholder="Enter password"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (confirmPassword && text !== confirmPassword) setPasswordError("Passwords do not match!");
                      else setPasswordError("");
                    }}
                  />
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    style={[styles.input, passwordError && { borderColor: "#FF3B30" }]}
                    secureTextEntry
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      if (password && text !== password) setPasswordError("Passwords do not match!");
                      else setPasswordError("");
                    }}
                  />
                  {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

                  {/* Full Name */}
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    style={[styles.input, fullNameError && { borderColor: "#FF3B30" }]}
                    placeholder="Enter full name"
                    value={fullName}
                    onChangeText={(text) => {
                      setFullName(text);
                      fullNameError && setFullNameError("");
                    }}
                  />
                  {fullNameError && <Text style={styles.errorText}>{fullNameError}</Text>}

                  {/* Address */}
                  <Text style={styles.label}>Address</Text>
                  <TextInput
                    style={[styles.input, addressError && { borderColor: "#FF3B30" }]}
                    placeholder="Address"
                    value={address}
                    onChangeText={(text) => {
                      setAddress(text);
                      addressError && setAddressError("");
                    }}
                  />
                  {addressError && <Text style={styles.errorText}>{addressError}</Text>}

                  {/* PIN */}
                  <Text style={styles.label}>PIN Code</Text>
                  <TextInput
                    style={[styles.input, pincodeError && { borderColor: "#FF3B30" }]}
                    placeholder="Enter PIN code"
                    keyboardType="numeric"
                    maxLength={6}
                    value={pincode}
                    onChangeText={(pin) => {
                      setPincode(pin.replace(/[^0-9]/g, "").slice(0, 6));
                      pincodeError && setPincodeError("");
                      if (pin.length === 6) fetchPinDetails(pin, "billing");
                    }}
                  />
                  {pincodeError && <Text style={styles.errorText}>{pincodeError}</Text>}

                  {loading && <ActivityIndicator size="small" color="#0047AB" />}

                  {/* Read-only values */}
                  <Text style={styles.label}>State</Text>
                  <TextInput style={styles.input} value={state} editable={false} />

                  <Text style={styles.label}>District</Text>
                  <TextInput style={styles.input} value={district} editable={false} />

                  {/* Shipping */}
                  <Text style={styles.label}>Shipping Address</Text>
                  <TextInput
                    style={[styles.input, shippingAddressError && { borderColor: "#FF3B30" }]}
                    placeholder="Shipping Address"
                    value={shippingAddress}
                    onChangeText={(text) => {
                      setShippingAddress(text);
                      shippingAddressError && setShippingAddressError("");
                    }}
                  />
                  {shippingAddressError && <Text style={styles.errorText}>{shippingAddressError}</Text>}

                  <Text style={styles.label}>Shipping PIN Code</Text>
                  <TextInput
                    style={[styles.input, shippingPinError && { borderColor: "#FF3B30" }]}
                    placeholder="Enter Shipping PIN"
                    keyboardType="numeric"
                    maxLength={6}
                    value={shippingPin}
                    onChangeText={(pin) => {
                      setShippingPin(pin.replace(/[^0-9]/g, "").slice(0, 6));
                      shippingPinError && setShippingPinError("");
                      if (pin.length === 6) fetchPinDetails(pin, "shipping");
                    }}
                  />
                  {shippingPinError && <Text style={styles.errorText}>{shippingPinError}</Text>}

                  <Text style={styles.label}>Shipping State</Text>
                  <TextInput style={styles.input} value={shippingState} editable={false} />

                  <Text style={styles.label}>Shipping District</Text>
                  <TextInput style={styles.input} value={shippingDistrict} editable={false} />

                  {/* Email */}
                  <Text style={styles.label}>Email ID</Text>
                  <TextInput
                    style={[styles.input, emailError && { borderColor: "#FF3B30" }]}
                    placeholder="Enter Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      emailError && setEmailError("");
                    }}
                  />
                  {emailError && <Text style={styles.errorText}>{emailError}</Text>}

                  {/* Captcha */}
                  <Text style={styles.label}>Enter Captcha</Text>
                  <View style={styles.captchaContainer}>
                    <TextInput
                      style={[styles.input, { flex: 1, marginBottom: 0 }]}
                      placeholder="Enter Captcha"
                      value={captchaInput}
                      onChangeText={setCaptchaInput}
                    />
                    <View style={styles.captchaBox}>
                      <Text style={styles.captchaText}>{captcha}</Text>
                      <TouchableOpacity onPress={generateCaptcha}>
                        <Ionicons name="refresh" size={22} color="#0047AB" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {captchaError && <Text style={styles.errorText}>{captchaError}</Text>}

                  {/* Terms */}
                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      value={acceptedTerms}
                      onValueChange={setAcceptedTerms}
                      color={acceptedTerms ? "#0047AB" : undefined}
                      style={styles.checkbox}
                    />
                    <Text style={styles.checkboxLabel}>
                      I agree to the{" "}
                      <Text style={{ color: "#0047AB", textDecorationLine: "underline" }} onPress={() => Linking.openURL("https://uexcess.com/terms")}>
                        Terms & Conditions
                      </Text>{" "}
                      and{" "}
                      <Text style={{ color: "#0047AB", textDecorationLine: "underline" }} onPress={() => Linking.openURL("https://uexcess.com/privacy")}>
                        Privacy Policy
                      </Text>
                    </Text>
                  </View>
                  {termsError && <Text style={styles.errorText}>{termsError}</Text>}

                  <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
