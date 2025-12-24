import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { editProfileStyles as styles } from "../../styles/editProfileStyles"; // 🔥 External styles file

export default function EditProfileScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingPin, setShippingPin] = useState("");
  const [password, setPassword] = useState("");
  const [stateName, setStateName] = useState("");
  const [district, setDistrict] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingDistrict, setShippingDistrict] = useState("");

  useEffect(() => {
    (async () => {
      const storedUser = await AsyncStorage.getItem("userData");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        setId(u.id);
        setFullName(u.fullName ?? "");
        setEmail(u.email ?? "");
        setMobile(u.mobile ?? "");
        setAddress(u.address ?? "");
        setPincode(u.pincode ?? "");
        setShippingAddress(u.shippingAddress ?? "");
        setShippingPin(u.shippingPin ?? "");
        setStateName(u.state ?? "");
        setDistrict(u.district ?? "");
        setShippingState(u.shippingState ?? "");
        setShippingDistrict(u.shippingDistrict ?? "");
        setPassword(u.password ?? "");
      }
    })();
  }, []);

  const handleSave = async () => {
    setLoading(true);

    const updatedUser = {
      fullName,
      email,
      mobile,
      address,
      pincode,
      state: stateName,
      district,
      shippingAddress,
      shippingPin,
      shippingState,
      shippingDistrict,
      password,
    };

    try {
      const response = await fetch(
        `https://691c2daa3aaeed735c8fd1bb.mockapi.io/GKVK/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );

      const updatedData = await response.json();
      await AsyncStorage.setItem("userData", JSON.stringify(updatedData)); // 🔥 store updated user

      setTimeout(() => {
        setLoading(false);
        router.replace("/(tabs)/profile");
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log("Update failed", error);
      alert("Something went wrong. Try again later.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0047AB" />
        <Text style={styles.loaderText}>Saving...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={26} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Edit Profile</Text>
              <View style={{ width: 26 }} />
            </View>

            <View style={styles.formCard}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

              <Text style={styles.label}>Customer Address</Text>
              <TextInput style={styles.input} value={address} onChangeText={setAddress} />

              <Text style={styles.label}>Customer Pin</Text>
              <TextInput style={styles.input} value={pincode} onChangeText={setPincode} keyboardType="number-pad" />

              <Text style={styles.label}>Customer State</Text>
              <TextInput style={styles.input} value={stateName} onChangeText={setStateName} />

              <Text style={styles.label}>Customer District</Text>
              <TextInput style={styles.input} value={district} onChangeText={setDistrict} />

              <Text style={styles.label}>Shipping Address</Text>
              <TextInput style={styles.input} value={shippingAddress} onChangeText={setShippingAddress} />

              <Text style={styles.label}>Shipping Pin</Text>
              <TextInput style={styles.input} value={shippingPin} onChangeText={setShippingPin} keyboardType="number-pad" />

              <Text style={styles.label}>Shipping State</Text>
              <TextInput style={styles.input} value={shippingState} onChangeText={setShippingState} />

              <Text style={styles.label}>Shipping District</Text>
              <TextInput style={styles.input} value={shippingDistrict} onChangeText={setShippingDistrict} />

              <Text style={styles.label}>Email</Text>
              <TextInput style={styles.input} value={email} onChangeText={setEmail} />

              <Text style={styles.label}>Phone Number</Text>
              <TextInput style={styles.input} value={mobile} onChangeText={setMobile} keyboardType="number-pad" />

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
