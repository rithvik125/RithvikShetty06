import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "../styles/loginRequiredModalStyles"; // ⬅ imported separated styles

export default function LoginRequiredModal({ visible, onClose, from }) {
  const router = useRouter();

  const subtitle =
    from === "profile"
      ? "Please login to see profile details"
      : from === "cart"
        ? "Please login to view your cart"
        : "Please login to add items to cart";

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.box}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Ionicons name="close" size={25} color="#444" />
          </TouchableOpacity>

          <Ionicons name="lock-closed" size={60} color="#0047AB" />

          <Text style={styles.title}>Login Required</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              onClose();
              router.push("/screens/LoginScreen");
            }}
          >
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
